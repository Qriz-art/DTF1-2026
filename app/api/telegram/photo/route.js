import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const filePathCache = new Map();
const FILE_PATH_TTL = 50 * 60 * 1000;
const imageTypes = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

function readManifest() {
  try {
    const manifestPath = path.join(
      process.cwd(),
      "data",
      "telegram-migration-new.json"
    );
    const parsed = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    return parsed.photos ?? {};
  } catch {
    return {};
  }
}

function localPhoto(name) {
  const filePath = path.join(process.cwd(), "public", name);

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    return null;
  }

  const contentType = imageTypes[path.extname(name).toLowerCase()];
  if (!contentType) return null;

  return new Response(fs.readFileSync(filePath), {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

async function getTelegramFilePath(token, fileId) {
  const cached = filePathCache.get(fileId);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.filePath;
  }

  const response = await fetch(
    `https://api.telegram.org/bot${token}/getFile?file_id=${encodeURIComponent(fileId)}`,
    { cache: "no-store" }
  );

  if (!response.ok) return null;

  const result = await response.json();
  const filePath = result?.result?.file_path;

  if (!result.ok || !filePath) return null;

  filePathCache.set(fileId, {
    filePath,
    expiresAt: Date.now() + FILE_PATH_TTL,
  });

  return filePath;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name || name !== path.basename(name)) {
    return NextResponse.json(
      { error: "Nama foto tidak valid." },
      { status: 400 }
    );
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const photo = readManifest()[name];

  if (token && photo?.fileId) {
    try {
      const filePath = await getTelegramFilePath(token, photo.fileId);

      if (filePath) {
        const imageResponse = await fetch(
          `https://api.telegram.org/file/bot${token}/${filePath}`,
          { cache: "no-store" }
        );

        if (imageResponse.ok) {
          const telegramType =
            imageResponse.headers.get("content-type") || "";
          const fileType =
            imageTypes[path.extname(filePath).toLowerCase()];
          const contentType = telegramType.startsWith("image/")
            ? telegramType
            : fileType;

          if (contentType) {
            return new Response(await imageResponse.arrayBuffer(), {
              headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=86400",
                "X-Content-Type-Options": "nosniff",
              },
            });
          }
        }
      }
    } catch (error) {
      console.error("Telegram photo API:", error.message);
    }
  }

  const local = localPhoto(name);
  if (local) return local;

  return NextResponse.json(
    { error: "Foto tidak ditemukan." },
    { status: 404 }
  );
}
