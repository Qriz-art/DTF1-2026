import GalleryGrid from "@/components/GalleryGrid";
import BackButton from "@/components/BackButton";
import { getGalleryPhotos } from "@/lib/gallery";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Origin | Angkatan 2024",
  description: "Album kenangan DTF 1 tahun pertama (2023-2024).",
};

export default function OriginPage() {
  const photos = getGalleryPhotos("kelas1");

  return (
    <div className="min-h-screen bg-[#020806] text-emerald-50 font-jakarta">
      <header className="pt-16 pb-10 px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-emerald-500/10 blur-[100px] -z-10"></div>

        <div className="container mx-auto text-center">
          <BackButton accent="emerald" />
          <h1 className="text-5xl md:text-9xl font-syne font-black uppercase tracking-tighter leading-none mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-emerald-900/40">
            ORIGIN
          </h1>
          <p className="text-emerald-500 text-lg md:text-4xl font-syne uppercase tracking-[0.2em] italic mb-4">YEAR ONE</p>
          <div className="h-[1px] w-12 bg-emerald-500/30 mx-auto mt-4 mb-3"></div>
          <p className="text-emerald-500/40 tracking-[0.4em] uppercase text-[8px] font-bold">The Beginning of Kenangan</p>
        </div>
      </header>

      <GalleryGrid photos={photos} indexLabel="Origin" />
    </div>
  );
}
