
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
const manifestPath = path.join(dataDir, "telegram-migration-new.json");

const rules = [
  { prefix: "kelas1", year: 2023 },
  { prefix: "kelas2", year: 2024 },
  { prefix: "kelas3", year: 2025 },
];

const imagePattern = /^(kelas1|kelas2|kelas3)\s*\(\d+\)\.jpe?g$/i;
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
  if (!imagePattern.test(filename)) return null;

  const rule = rules.find(({ prefix }) =>
    new RegExp(`^${prefix}\\s*\\(`, "i").test(filename)
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

async function verifyTelegram(token, channelId) {
  const base = `https://api.telegram.org/bot${token}`;

  const meResponse = await fetch(`${base}/getMe`, { cache: "no-store" });
  const me = await meResponse.json();

  if (!meResponse.ok || !me.ok) {
    throw new Error("Bot token tidak valid atau Telegram tidak dapat dihubungi.");
  }

  const chatResponse = await fetch(
    `${base}/getChat?chat_id=${encodeURIComponent(channelId)}`,
    { cache: "no-store" }
  );
  const chat = await chatResponse.json();

  if (!chatResponse.ok || !chat.ok) {
    throw new Error(
      `Bot @${me.result.username} tidak dapat mengakses channel. Periksa TELEGRAM_CHANNEL_ID dan pastikan bot menjadi admin channel.`
    );
  }

  console.log(`Bot: @${me.result.username}`);
  console.log(`Channel: ${chat.result.title}`);
}

async function sendPhoto(token, channelId, photo, buffer) {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const form = new FormData();

    form.append("chat_id", channelId);
    form.append("caption", `Kenangan ${photo.year} · ${photo.filename}`);
    form.append("photo", new Blob([buffer]), photo.filename);

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendPhoto`,
      { method: "POST", body: form }
    );

    const result = await response.json();

    if (response.ok && result.ok) return result;

    if (response.status === 429) {
      const retryAfter = result.parameters?.retry_after ?? 5;
      console.warn(
        `Limit Telegram saat mengirim ${photo.filename}. Menunggu ${retryAfter} detik...`
      );
      await delay((retryAfter + 1) * 1000);
      continue;
    }

    throw new Error(result.description ?? `HTTP ${response.status}`);
  }

  throw new Error("Gagal setelah beberapa percobaan karena limit Telegram.");
}

async function main() {
  if (!fs.existsSync(publicDir)) {
    throw new Error("Folder public tidak ditemukan.");
  }

  const photos = readPhotos();
  const manifest = readManifest();

  const pending = photos.filter((photo) => {
    const saved = manifest[photo.filename];
    return (
      !saved ||
      !saved.fileId ||
      saved.size !== photo.size ||
      saved.year !== photo.year
    );
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

  await verifyTelegram(token, channelId);

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

  if (fs.existsSync(manifestPath)) {
    const backupPath = path.join(dataDir, "telegram-migration-new.backup.json");
    fs.copyFileSync(manifestPath, backupPath);
    console.log(`Backup manifest: ${path.basename(backupPath)}`);
  }

  const failures = [];

  for (let i = 0; i < candidates.length; i++) {
    const photo = candidates[i];
    const buffer = fs.readFileSync(photo.fullPath);

    try {
      const result = await sendPhoto(token, channelId, photo, buffer);
      const telegramPhotos = result.result.photo;

      if (!Array.isArray(telegramPhotos) || telegramPhotos.length === 0) {
        throw new Error("file_id tidak ditemukan pada respons Telegram.");
      }

      manifest[photo.filename] = {
        year: photo.year,
        size: photo.size,
        messageId: result.result.message_id,
        chatId: String(result.result.chat.id),
        fileId: telegramPhotos[telegramPhotos.length - 1].file_id,
        fileUniqueId: telegramPhotos[telegramPhotos.length - 1].file_unique_id,
        uploadedAt: new Date().toISOString(),
      };
      saveManifest(manifest);

      console.log(
        `[${i + 1}/${candidates.length}] Terkirim: ${photo.filename} (pesan ${result.result.message_id})`
      );
    } catch (error) {
      failures.push({ filename: photo.filename, message: error.message });
      console.error(
        `[${i + 1}/${candidates.length}] GAGAL ${photo.filename}: ${error.message}`
      );
    }

    await delay(1000);
  }

  if (failures.length) {
    console.log(`\nSelesai dengan ${failures.length} foto gagal:`);
    for (const failure of failures) {
      console.log(`- ${failure.filename}: ${failure.message}`);
    }
    console.log("Jalankan ulang script untuk mencoba foto yang gagal.");
    process.exitCode = 1;
    return;
  }

  console.log("\nSelesai. Semua foto pada batch ini berhasil diunggah.");
}

main().catch((error) => {
  console.error("Kesalahan:", error.message);
  process.exitCode = 1;
});
