import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://dtf1-2026.vercel.app"),
  title: "DTF 1 | SMKN 2 Adiwerna Class of 2026",
  description:
    "Selamat datang di Jurusan DTF 1 Angkatan 2026. Jelajahi galeri foto, momen tak terlupakan, dan pesan kesan album kenangan digital kami di sini.",
  keywords:
    "DTF 1, DTF1 2026, Album Kenangan 2026, Angkatan 2026, dtf1, dtf-1, smkn 2 adiwerna, smik, dtf asik, AKHMAD DWI AFANDI, ANISATUZZUHRIYAH, ANNISA HANUM SALSABILA, ARNESYA RAMADANI, BIMO ZAKARIA, BUNGA ASFARAINI ALFARAH, DE NADYN RISKY AULLYA, DICKY DWI KURNIAWAN, FARDHINA SYAHDAN, IMTISALUL HANIFAH, INTAN SUCI RAHMADHANI, LUQMAN MAULANA IBRAHIM, MUHAMAD RIZKI ABI NAUVAL, MUHAMMAD ALIF SYAEFUDIN, MUHAMMAD ARIF PANDU PRATAMA, MUHAMMAD IKHSAN SYA'BANI, MUHAMMAD ILHAM RIFA'I, MUHAMMAD RAIHAN PUTRA, NADHIF ARVA SAPUTRA, NADHIF MAULANA AL-FAJRI, NAILA ARTHALITA, NAZWA ARYANTI KUSDIANA, NIA OCTAVIANI RAHAYU, NUR ABDUL MUFIT, NURIN NASYWA AULIYA, PUTRI REVALINA, RAHMA AZZAHRA, RIZKI ASHARI, SITI RAHMA SAKINAH, SUGIONO SANTOSO, VARENT RAMADHANI RATU HANIS, WANDA PUTRI JAYANI, WILLY ADI SAPUTRA, WULAN AYU NOVIANI, ZASKIA TRI MURTIYA NINGRUM",
  verification: {
    google: "wE9pVkTL9WLEBdnxjX0BF3QMVLe1GSpUj-spwAGJgoE",
  },
  openGraph: {
    type: "website",
    url: "https://dtf1-2026.vercel.app",
    title: "SMKN 2 ADIWERNA - DTF 1 ANGKATAN 2026",
    description:
      "Mengabadikan setiap cerita dan tawa. Lihat album kenangan kami di dtf1-2026.vercel.app",
    images: [
      {
        url: "/kami-pamit.png",
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
  },
  icons: {
    icon: "https://images.seeklogo.com/logo-png/51/1/smik-smk-negeri-2-adiwerna-logo-png_seeklogo-518681.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Poppins:wght@300;400;600;700;900&family=Great+Vibes&family=Alex+Brush&family=Plus+Jakarta+Sans:wght@300;400;600;800&family=Syne:wght@700;800&family=Cormorant+Garamond:ital,wght@1,600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background font-body-lg antialiased selection:bg-primary selection:text-background">
        {children}
      </body>
    </html>
  );
}
