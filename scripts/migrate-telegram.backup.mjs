
import fs from "node:fs";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import nextEnv from "@next/env";
const { loadEnvConfig } = nextEnv;
import { stdin, stdout } from "node:process";
import readline from "node:readline/promises";

loadEnvConfig(process.cwd());

const publicDir = path.join(process.cwd(), "public");
const dataDir = path.join(process.cwd(), "data");
const manifestPath = path.join(dataDir, "telegram-migration.json");

const rules = [
  { prefix: "kelas1", year: 2023 },
  { prefix: "kelas2", year: 2024 },
  { prefix: "kelas3", year: 2025 },
];

const imagePattern = /\.(jpe?g|png|webp)$/i;
const doUpload = process.argv.includes("--upload");
const limitArg = process.argv.indexOf("--limit");
const limit = limitArg >= 0
  ? Number(process.argv[limitArg + 1])
  : Infinity;

if (!Number.isInteger(limit) && limit !== Infinity || limit < 1) {
  console.error("Nilai --limit tidak valid.");
  process.exit(1);
}

function getYear(filename) {
  const rule = rules.find(({ prefix }) =>
    new RegExp(`^${prefix}\\s*\\(`).test(filename)
  );
  return rule?.year ?? null;
}

function readPhotos() {
  return fs.readdirSync(publicDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && imagePattern.test(entry.name))
    .map((entry) => {
      const year = getYear(entry.name);
      if (!year) return null;

      const fullPath = path.join(publicDir, entry.name);
      const stat = fs.statSync(fullPath);

      return {
        filename: entry.name,
        year,
        size: stat.size,
        fullPath,
      };
    })
    .filter(Boolean)
    .sort((a, b) =>
      a.year - b.year ||
      a.filename.localeCompare(b.filename, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    );
}

function readManifest() {
  if (!fs.existsSync(manifestPath)) return {};

  const parsed = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  return parsed.photos ?? {};
}

function saveManifest(photos) {
  fs.mkdirSync(dataDir, { recursive: true });
  const tempPath = `${manifestPath}.tmp`;

  fs.writeFileSync(
    tempPath,
    JSON.stringify({ updatedAt: new Date().toISOString(), photos }, null, 2),
    "utf8"
  );
  fs.renameSync(tempPath, manifestPath);
}

async function askConfirmation() {
  const rl = readline.createInterface({ input: stdin, output: stdout });
  try {
    const answer = await rl.question(
      'Ketik UPLOAD untuk mengirim foto ke channel Telegram: '
    );
    return answer === "UPLOAD";
  } finally {
    rl.close();
  }
}

async function main() {
  if (!fs.existsSync(publicDir)) {
    throw new Error("Folder public tidak ditemukan.");
  }

  const photos = readPhotos();
  const manifest = readManifest();

  const pending = photos.filter((photo) => {
    const saved = manifest[photo.filename];
    return !saved || saved.size !== photo.size || saved.year !== photo.year;
  });

  console.log("\n=== MIGRASI FOTO TELEGRAM ===");
  console.log(`Total foto cocok: ${photos.length}`);
  console.log(`Sudah tercatat dan cocok: ${photos.length - pending.length}`);
  console.log(`Belum tercatat / berubah: ${pending.length}`);

  for (const year of [2023, 2024, 2025]) {
    console.log(`${year}: ${photos.filter((p) => p.year === year).length}`);
  }

  const oversized = pending.filter((p) => p.size > 10 * 1024 * 1024);
  console.log(`Foto di atas 10 MB: ${oversized.length}`);

  if (oversized.length) {
    for (const photo of oversized) {
      console.log(`- ${photo.filename} (${(photo.size / 1048576).toFixed(2)} MB)`);
    }
    console.log("Foto besar tidak akan dikirim sebagai foto.");
  }

  if (!doUpload) {
    console.log("\nMode pemeriksaan saja. Belum ada upload.");
    console.log("Untuk uji satu foto, gunakan: node scripts/migrate-telegram.mjs --upload --limit 1");
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const channelId = process.env.TELEGRAM_CHANNEL_ID;

  if (!token || !channelId) {
    throw new Error("TELEGRAM_BOT_TOKEN atau TELEGRAM_CHANNEL_ID belum tersedia.");
  }

  const candidates = pending
    .filter((p) => p.size <= 10 * 1024 * 1024)
    .slice(0, limit);

  if (!candidates.length) {
    console.log("Tidak ada foto yang perlu diunggah.");
    return;
  }

  console.log(`\nAkan mengunggah ${candidates.length} foto.`);
  console.log("Pastikan bot memiliki izin mengirim pesan ke channel yang benar.");

  if (!(await askConfirmation())) {
    console.log("Dibatalkan. Tidak ada foto yang diunggah.");
    return;
  }

  for (let i = 0; i < candidates.length; i++) {
    const photo = candidates[i];
    const buffer = fs.readFileSync(photo.fullPath);
    const form = new FormData();

    form.append("chat_id", channelId);
    form.append("caption", `Kenangan ${photo.year} · ${photo.filename}`);
    form.append(
      "photo",
      new Blob([buffer]),
      photo.filename
    );

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${token}/sendPhoto`,
        { method: "POST", body: form }
      );

      const result = await response.json();

      if (!response.ok || !result.ok) {
        console.error(
          `GAGAL ${photo.filename}: ${result.description ?? response.status}`
        );
        console.log("Proses dihentikan agar penyebabnya bisa diperiksa.");
        break;
      }

      manifest[photo.filename] = {
        year: photo.year,
        size: photo.size,
        messageId: result.result.message_id,
        chatId: String(result.result.chat.id),
        uploadedAt: new Date().toISOString(),
      };
      saveManifest(manifest);

      console.log(
        `[${i + 1}/${candidates.length}] Terkirim: ${photo.filename} (pesan ${result.result.message_id})`
      );

      await delay(1000);
    } catch (error) {
      console.error(`Kesalahan saat mengirim ${photo.filename}:`, error.message);
      console.log("Proses dihentikan. Jalankan ulang setelah masalah diperiksa.");
      break;
    }
  }

  console.log("\nSelesai. Periksa channel dan manifest sebelum melanjutkan.");
}

main().catch((error) => {
  console.error("Kesalahan:", error.message);
  process.exitCode = 1;
});
