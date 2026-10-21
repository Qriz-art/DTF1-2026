"use client";

import { useState } from "react";
import { dataGuru } from "@/data/siswa";

// Kartu guru dengan fallback inisial jika foto belum tersedia
function GuruCard({ guru }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative bg-white/5 rounded-[2rem] p-2 border border-white/10 transition-all duration-500 hover:border-primary/50 hover:-translate-y-2 shadow-2xl">
      <div className="relative h-48 md:h-72 overflow-hidden rounded-[1.8rem] bg-surface-dim">
        {imgError ? (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display-lg text-6xl md:text-8xl text-primary/30">
              {guru.nama.charAt(0)}
            </span>
          </div>
        ) : (
          <img
            src={guru.foto}
            alt={guru.nama}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
      </div>
      <div className="p-5 text-center">
        <h4 className="text-white font-display-lg text-lg md:text-xl group-hover:text-primary transition-colors">{guru.nama}</h4>
      </div>
    </div>
  );
}

export default function Guru() {
  return (
    <section id="guru" className="relative min-h-screen flex items-center pt-32 pb-20 bg-surface-container overflow-hidden border-t border-white/5">
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/2 translate-y-1/2 blur-[100px]"></div>

      <div className="container mx-auto px-6 lg:px-margin-desktop relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-7xl font-vibes text-primary mb-4 text-glow">Para Pendidik</h2>
          <p className="font-body-lg text-on-surface-variant tracking-widest uppercase text-xs opacity-70">
            Membimbing dengan hati, mengukir masa depan
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {dataGuru.map((g) => (
            <GuruCard key={g.nama} guru={g} />
          ))}
        </div>

        <p className="mt-12 text-center font-body-lg text-on-surface-variant tracking-widest uppercase text-xs md:text-sm opacity-70">
          Serta seluruh jajaran pendidik dan staf
        </p>
      </div>
    </section>
  );
}
