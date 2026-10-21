
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  // Jangan tampilkan token dalam respons.
  if (
    process.env.NODE_ENV === "production" ||
    process.env.TELEGRAM_STATUS_TEST_ENABLED !== "true"
  ) {
    return NextResponse.json(
      { ok: false, message: "Tes status tidak diaktifkan." },
      { status: 404 }
    );
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const channelId = process.env.TELEGRAM_CHANNEL_ID;

  if (!token || !channelId) {
    return NextResponse.json(
      { ok: false, message: "Konfigurasi bot belum lengkap." },
      { status: 500 }
    );
  }

  try {
    const base = `https://api.telegram.org/bot${token}`;

    const [meResponse, chatResponse] = await Promise.all([
      fetch(`${base}/getMe`, { cache: "no-store" }),
      fetch(
        `${base}/getChat?chat_id=${encodeURIComponent(channelId)}`,
        { cache: "no-store" }
      ),
    ]);

    const me = await meResponse.json();
    const chat = await chatResponse.json();

    if (!meResponse.ok || !me.ok) {
      return NextResponse.json(
        { ok: false, message: "Telegram tidak menerima autentikasi bot." },
        { status: 502 }
      );
    }

    if (!chatResponse.ok || !chat.ok) {
      return NextResponse.json(
        {
          ok: false,
          bot: me.result.username,
          message:
            "Bot terautentikasi, tetapi channel tidak bisa diperiksa. Periksa ID channel dan akses bot.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      bot: me.result.username,
      channel: chat.result.title,
      message: "Bot dan channel berhasil diperiksa.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Tidak dapat menghubungi Telegram." },
      { status: 502 }
    );
  }
}
