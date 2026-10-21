"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const albums = [
  { href: "/origin", img: "/kelas-1-2023.jpeg", title: "2023-2024", sub: "Archive 01" },
  { href: "/memories", img: "/2023-kelas.jpeg", title: "2024-2025", sub: "Archive 02" },
  { href: "/legacy", img: "/dtf-1-2026.jpeg", title: "2025-2026", sub: "Archive 03" },
  { href: "/biodata", img: "/api/telegram/photo?name=kelas3%20(297).jpg", title: "BIODATA", sub: "Student Profile" },
];

// Tanggal kelulusan: 28 April 2026, 18:00 WIB
const GRADUATION = new Date(2026, 3, 28, 18, 0, 0).getTime();

function GraduationCounter() {
  const [time, setTime] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });

  useEffect(() => {
    const tick = () => {
      const distance = Date.now() - GRADUATION;
      setTime({
        days: String(Math.floor(distance / 86400000)).padStart(2, "0"),
        hours: String(Math.floor((distance % 86400000) / 3600000)).padStart(2, "0"),
        minutes: String(Math.floor((distance % 3600000) / 60000)).padStart(2, "0"),
        seconds: String(Math.floor((distance % 60000) / 1000)).padStart(2, "0"),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { val: time.days, label: "Hari" },
    { val: time.hours, label: "Jam" },
    { val: time.minutes, label: "Menit" },
    { val: time.seconds, label: "Detik", glow: true },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {cells.map((c) => (
        <div key={c.label} className="bg-background/50 p-4 rounded-2xl border border-primary/20">
          <div className={`text-4xl font-bold text-white leading-none ${c.glow ? "text-glow" : ""}`}>{c.val}</div>
          <div className="text-[10px] text-primary uppercase mt-1">{c.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function Album() {
  return (
    <section id="album" className="relative min-h-screen flex items-center pt-32 pb-20 bg-surface-dim overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-margin-desktop relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-[60%]">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-5xl md:text-7xl font-vibes text-primary mb-2 text-glow">Gallery</h2>
              <p className="text-on-surface-variant font-body-lg text-sm opacity-70 tracking-wide">Sentuh kartu untuk melihat detail memori</p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {albums.map((a) => (
                <Link key={a.href} href={a.href} className="group block bg-white/5 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 border border-white/10">
                  <div className="relative h-32 md:h-44 overflow-hidden">
                    <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500 opacity-80 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  </div>
                  <div className="p-3 md:p-4 bg-white/5 group-hover:bg-white/10 transition-colors">
                    <h3 className="text-sm md:text-lg font-bold text-white tracking-tight uppercase">{a.title}</h3>
                    <p className="text-[10px] md:text-xs text-primary/70 uppercase tracking-widest">{a.sub}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/3 flex flex-col items-center justify-center space-y-10">
            <div className="relative p-10 bg-white/5 backdrop-blur-md rounded-[3rem] border border-white/10 shadow-2xl text-center w-full max-w-sm">
              <span className="font-label-caps text-primary tracking-[0.3em] text-xs mb-6 block uppercase">Waktu Sejak Kelulusan</span>
              <GraduationCounter />
              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-on-surface-variant text-xs italic opacity-60">waktu terus berjalan</p>
              </div>
            </div>

            <div className="text-center px-6">
              <h3 className="font-display-lg text-2xl text-white italic leading-relaxed">
                &quot;Masa depan dimulai dari detik ini, namun kenangan akan selalu abadi.&quot;
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
