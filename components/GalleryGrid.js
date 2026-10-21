"use client";

import { useCallback, useEffect, useState } from "react";

// Galeri grid + lightbox yang dipakai ulang oleh halaman origin/memories/legacy
export default function GalleryGrid({ photos, captionData, indexLabel = "Memory", numbered = false }) {
  const [current, setCurrent] = useState(null); // null = lightbox tertutup

  const close = useCallback(() => setCurrent(null), []);
  const change = useCallback(
    (step) => {
      setCurrent((c) => (c === null ? c : (c + step + photos.length) % photos.length));
    },
    [photos.length]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") change(1);
      if (e.key === "ArrowLeft") change(-1);
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [change, close]);

  useEffect(() => {
    document.body.style.overflow = current !== null ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [current]);

  const caption = (i) => (captionData ? captionData[i] : `${indexLabel} #${i + 1}`);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 p-4 sm:p-8 container mx-auto max-w-7xl pb-24">
        {photos.map((src, i) => (
          <div key={src} className="photo-card shadow-lg" onClick={() => setCurrent(i)}>
            {numbered && (
              <div className="absolute top-1 left-2 z-20 text-white/10 font-black text-2xl md:text-5xl pointer-events-none">
                {String(i + 1).padStart(2, "0")}
              </div>
            )}
            <img src={src} alt={caption(i)} loading="lazy" />
          </div>
        ))}
      </div>

      {current !== null && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
          <button onClick={close} className="absolute top-6 right-6 text-white/50 hover:text-amber-500 transition-colors text-4xl" aria-label="Tutup">
            &times;
          </button>

          <div className="flex items-center justify-center gap-4 md:gap-12 w-full max-w-5xl">
            <button onClick={() => change(-1)} className="nav-btn hidden md:flex shrink-0" aria-label="Sebelumnya">❮</button>

            <div className="flex-1 flex flex-col items-center">
              <img
                src={photos[current]}
                alt={caption(current)}
                className="max-h-[60vh] md:max-h-[75vh] w-auto rounded-lg shadow-2xl border border-white/10 object-contain"
              />
              <div className="mt-8 text-center px-4">
                <p className="font-cormorant text-2xl md:text-4xl italic text-amber-500 mb-1">{caption(current)}</p>
                <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase">
                  {indexLabel} {current + 1} / {photos.length}
                </p>
              </div>
            </div>

            <button onClick={() => change(1)} className="nav-btn hidden md:flex shrink-0" aria-label="Berikutnya">❯</button>
          </div>

          <div className="flex gap-10 mt-10 md:hidden">
            <button onClick={() => change(-1)} className="nav-btn scale-125" aria-label="Sebelumnya">❮</button>
            <button onClick={() => change(1)} className="nav-btn scale-125" aria-label="Berikutnya">❯</button>
          </div>
        </div>
      )}
    </>
  );
}
