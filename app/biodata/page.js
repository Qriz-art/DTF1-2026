"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { students } from "@/data/siswa";

export default function BiodataPage() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selected]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 font-jakarta">
      <nav className="sticky top-0 z-40 bg-[#020617]/90 backdrop-blur-xl border-b border-white/5 px-4 py-4 md:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="group flex items-center gap-3 no-underline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-[10px] md:text-xs font-black tracking-widest text-white uppercase group-hover:text-blue-400 transition-colors">
              Back to Album
            </span>
          </Link>
          <h1 className="text-lg md:text-xl font-black italic">
            DTF<span className="text-blue-500">1</span>
          </h1>
        </div>
      </nav>

      <header className="container mx-auto px-6 pt-12 md:pt-24 pb-12 text-center">
        <span className="text-blue-500 text-[8px] md:text-[10px] font-bold tracking-[0.5em] uppercase mb-4 block animate-pulse">
          Selamat datang
        </span>
        <h2 className="text-3xl sm:text-5xl md:text-8xl font-black tracking-tighter mb-6 uppercase leading-none">
          BIODATA <span className="font-serif italic font-light text-slate-500">STUDENTS</span>
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto text-xs md:text-sm leading-relaxed px-4">
          Mengenal lebih dekat talenta <span className="text-white font-semibold">DTF 1</span> Angkatan 2026 SMKN 2 Adiwerna.
        </p>
      </header>

      <main className="container mx-auto px-4 md:px-8 pb-32">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
          {students.map((s) => (
            <div
              key={s.nama}
              onClick={() => setSelected(s)}
              className="glass rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-500 glass-hover group"
            >
              <div className="h-48 md:h-72 overflow-hidden relative">
                <img
                  src={s.foto}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition duration-700"
                  alt={s.nama}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent opacity-60"></div>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-sm md:text-lg font-bold tracking-tight leading-tight">{s.nama}</h3>
                <p className="text-[8px] md:text-[10px] text-blue-500 font-bold tracking-widest uppercase mt-2">Detail &rarr;</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selected && (
        <div
          className="fixed inset-0 bg-[#020617]/95 z-[100] flex items-center justify-center p-4 backdrop-blur-2xl overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <div className="bg-slate-900 w-full max-w-4xl rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 flex flex-col md:flex-row my-auto">
            <div className="md:w-1/2 h-72 md:h-[600px] relative">
              <img src={selected.foto} className="w-full h-full object-cover" alt={selected.nama} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-lg flex items-center justify-center text-white text-2xl hover:bg-red-500 transition-all"
                aria-label="Tutup"
              >
                &times;
              </button>
            </div>
            <div className="md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
              <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-[9px] mb-2 block">{selected.kelas}</span>
              <h2 className="text-2xl md:text-4xl font-black tracking-tighter mb-6 uppercase leading-tight">{selected.nama}</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl shrink-0">🎨</div>
                  <div>
                    <h4 className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">Hobi &amp; Passion</h4>
                    <p className="text-slate-200 text-sm font-medium">{selected.hobi}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl shrink-0">💬</div>
                  <div>
                    <h4 className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">My Words</h4>
                    <p className="text-slate-300 text-sm italic font-serif leading-relaxed">&quot;{selected.quotes}&quot;</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <a
                  href={`https://instagram.com/${selected.ig}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-white text-black py-4 rounded-2xl font-bold hover:bg-blue-600 hover:text-white transition-all shadow-xl text-sm uppercase tracking-widest"
                >
                  Follow Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
