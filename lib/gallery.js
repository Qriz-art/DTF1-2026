import fs from "fs";
import path from "path";

const publicDir = path.join(process.cwd(), "public");
const manifestPath = path.join(
  process.cwd(),
  "data",
  "telegram-migration-new.json"
);
const galleryPattern = /^(kelas1|kelas2|kelas3)\s*\(\d+\)\.(jpe?g|png|webp)$/i;

function getTelegramPhotos() {
  try {
    const parsed = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    return parsed.photos ?? {};
  } catch {
    return {};
  }
}

function getPublicPhotos() {
  if (!fs.existsSync(publicDir)) return [];

  return fs
    .readdirSync(publicDir)
    .filter((name) => galleryPattern.test(name));
}

// Daftar foto diambil dari manifest Telegram dan file lokal yang tersisa,
// diurutkan berdasarkan nomor di dalam tanda kurung: "kelas3 (12).jpg" -> 12.
export function getGalleryPhotos(prefix) {
  const telegramPhotos = getTelegramPhotos();
  const names = new Set([
    ...Object.keys(telegramPhotos),
    ...getPublicPhotos(),
  ]);

  const numOf = (name) => {
    const m = name.match(/\((\d+)\)/);
    return m ? parseInt(m[1], 10) : 0;
  };

  return [...names]
    .filter((name) => name.startsWith(prefix) && galleryPattern.test(name))
    .sort((a, b) => numOf(a) - numOf(b))
    .map((name) =>
      telegramPhotos[name]?.fileId
        ? `/api/telegram/photo?name=${encodeURIComponent(name)}`
        : "/" + name
    );
}
