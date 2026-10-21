import GalleryGrid from "@/components/GalleryGrid";
import { getGalleryPhotos } from "@/lib/gallery";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "THE FINAL LEGACY | 2026",
  description: "Album kenangan DTF 1 kelas XII (2025-2026).",
};

export default function LegacyPage() {
  const photos = getGalleryPhotos("kelas3");

  return (
    <div className="min-h-screen bg-[#050505] text-white font-jakarta relative">
      <nav className="absolute top-0 left-0 w-full z-[50] p-6 md:px-12 md:py-10 flex justify-between items-center mix-blend-difference">
        <Link href="/" className="group relative flex items-center no-underline">
          <div className="relative w-12 h-12 md:w-20 md:h-20 flex items-center justify-center">
            <div className="absolute inset-0 border border-white/10 rounded-full group-hover:scale-150 transition-all duration-1000"></div>
            <div className="relative w-8 h-8 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center transition-all duration-500 group-hover:bg-amber-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </div>
          <div className="ml-4 hidden sm:flex flex-col">
            <span className="text-[8px] font-black tracking-widest text-amber-500 uppercase">Return to</span>
            <span className="text-sm font-black text-white uppercase italic">GALLERY</span>
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-6 opacity-60">
          <div className="text-right">
            <p className="text-[7px] md:text-[8px] font-black tracking-widest text-white/50 uppercase">Archive Mode</p>
            <p className="text-[9px] md:text-[10px] font-bold text-amber-500 tracking-widest uppercase">XII DTF 1</p>
          </div>
          <div className="w-[1px] h-8 md:h-10 bg-white/20"></div>
          <span className="text-lg md:text-xl font-black italic">26</span>
        </div>
      </nav>

      <header className="relative min-h-[60vh] md:min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <div className="z-10">
          <p className="text-[10px] md:text-xs font-bold tracking-[0.5em] md:tracking-[0.8em] uppercase text-amber-500 mb-4 md:mb-8 animate-pulse">
            The Journey Ends Here
          </p>
          <h1 className="uppercase font-black tracking-tighter leading-[0.8] text-transparent bg-clip-text bg-gradient-to-b from-white to-amber-500 text-[clamp(3rem,15vw,12rem)]">
            LEGACY
          </h1>
          <h2 className="font-serif italic text-2xl md:text-6xl text-white mt-2 relative z-20">
            Two Thousand <span className="text-amber-500">Twenty Six</span>
          </h2>
        </div>
      </header>

      <GalleryGrid photos={photos} indexLabel="Memento" numbered />
    </div>
  );
}
