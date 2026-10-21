import GalleryGrid from "@/components/GalleryGrid";
import BackButton from "@/components/BackButton";
import { getGalleryPhotos } from "@/lib/gallery";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Memories XI | Angkatan 2026",
  description: "Album kenangan DTF 1 kelas XI (2024-2025).",
};

// Grup keterangan foto (sama seperti versi lama)
const groups = [
  { start: 1, end: 10, text: "Awal Perjalanan" },
  { start: 11, end: 25, text: "Workshop Days" },
  { start: 26, end: 50, text: "Classroom Fun" },
  { start: 51, end: 999, text: "Momen Emas" },
];

function captionForIndex(i) {
  const n = i + 1;
  const group = groups.find((g) => n >= g.start && n <= g.end);
  return group ? group.text : `Frame #${n}`;
}

export default function MemoriesPage() {
  const photos = getGalleryPhotos("kelas2");

  return (
    <div className="min-h-screen bg-[#050505] text-[#f4f4f4] font-jakarta">
      <header className="pt-16 pb-10 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-amber-500/10 blur-[100px] -z-10"></div>

        <div className="container mx-auto text-center">
          <BackButton />
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-2">MEMORIES</h1>
          <h2 className="font-cormorant text-3xl md:text-5xl italic text-amber-500 uppercase tracking-widest mb-6">2024 - 2025</h2>
          <div className="h-[1px] w-16 bg-amber-500/50 mx-auto mb-4"></div>
          <p className="text-slate-500 tracking-[0.3em] uppercase text-[9px] md:text-xs font-bold">Class XI • Desain Teknik Furniture</p>
        </div>
      </header>

      <GalleryGrid photos={photos} captionData={photos.map((_, i) => captionForIndex(i))} indexLabel="Memory" />
    </div>
  );
}
