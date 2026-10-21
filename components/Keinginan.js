"use client";

import { useEffect, useRef, useState } from "react";
import { dataCitaCita, dataHarapan } from "@/data/siswa";

function useFlipper(data, intervalMs, getText) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % data.length);
        setVisible(true);
      }, 300);
    }, intervalMs);
    return () => clearInterval(id);
  }, [data.length, intervalMs]);

  return { text: getText(data[index]), visible };
}

export default function Keinginan() {
  const [modalCita, setModalCita] = useState(false);
  const [modalHarapan, setModalHarapan] = useState(false);

  const cita = useFlipper(dataCitaCita, 2000, (d) => d.impian);
  const harapan = useFlipper(dataHarapan, 2800, (d) =>
    d.pesan.length > 50 ? d.pesan.substring(0, 50) + "..." : d.pesan
  );

  // Kunci scroll body saat modal terbuka
  useEffect(() => {
    document.body.style.overflow = modalCita || modalHarapan ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalCita, modalHarapan]);

  return (
    <>
      <section id="keinginan" className="relative pt-32 pb-16 md:pt-40 md:py-24 bg-[#004d49] min-h-screen overflow-hidden border-t border-white/5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full translate-x-1/3 translate-y-1/3 blur-[80px]"></div>

        <div className="container mx-auto px-6 relative z-10 flex-1 flex flex-col justify-center">
          <h1 className="font-vibes text-6xl md:text-8xl text-primary mb-12 md:mb-20 text-center text-glow">
            Keinginan Masa Depan
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-16 md:mb-24">
            <div className="keinginan-card bg-white/10 backdrop-blur-sm p-8 rounded-[2rem] border-t border-l border-white/20 shadow-2xl flex flex-col justify-center min-h-[180px]">
              <h3 className="w-fit mx-auto text-xs md:text-sm font-black text-primary uppercase tracking-[0.3em] mb-4 text-center rounded-full bg-primary/10 border border-primary/40 pl-4 pr-3 py-1.5">🏫 Sekolah</h3>
              <p className="text-white text-2xl md:text-3xl font-display-lg font-bold leading-tight text-center">SMK Negeri 2 Adiwerna</p>
              <p className="text-on-surface-variant text-sm md:text-base mt-2 font-medium tracking-wide text-center">Desain Teknik Furniture</p>
            </div>

            <div
              onClick={() => setModalCita(true)}
              className="keinginan-card bg-white/10 backdrop-blur-sm p-8 rounded-[2rem] border-t border-l border-white/20 cursor-pointer shadow-2xl group relative overflow-hidden flex flex-col justify-center min-h-[180px]"
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-center items-center gap-3 mb-4 relative z-10">
                <h3 className="text-xs md:text-sm font-black text-primary uppercase tracking-[0.3em] rounded-full bg-primary/10 border border-primary/40 pl-4 pr-3 py-1.5">🚀 Impian</h3>
              </div>
              <div className="relative z-10">
                <p
                  className="text-white text-xl md:text-2xl italic font-display-lg font-bold leading-tight text-center transition-opacity duration-300"
                  style={{ opacity: cita.visible ? 1 : 0 }}
                >
                  {cita.text}
                </p>
              </div>
            </div>

            <div
              onClick={() => setModalHarapan(true)}
              className="keinginan-card bg-white/10 backdrop-blur-sm p-8 rounded-[2rem] border-t border-l border-white/20 cursor-pointer shadow-2xl group relative overflow-hidden flex flex-col justify-center min-h-[180px]"
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-center items-center gap-3 mb-4 relative z-10">
                <h3 className="text-xs md:text-sm font-black text-primary uppercase tracking-[0.3em] rounded-full bg-primary/10 border border-primary/40 pl-4 pr-3 py-1.5">✨ Harapan</h3>
              </div>
              <div className="relative z-10">
                <p
                  className="text-on-surface-variant text-base md:text-lg italic font-bold leading-relaxed text-center transition-opacity duration-300"
                  style={{ opacity: harapan.visible ? 1 : 0 }}
                >
                  {harapan.text}
                </p>
              </div>
            </div>
          </div>

          <div className="text-center max-w-5xl mx-auto">
            <h2 className="font-display-lg italic text-3xl md:text-5xl text-white leading-[1.6]">
              Bukan perpisahan yang
              <span className="text-primary not-italic font-brush text-6xl md:text-8xl block md:inline-block my-4 md:my-0 mx-4 text-glow">menyakitkan</span>
              tapi kenangan yang
              <span className="text-white not-italic font-brush text-6xl md:text-8xl block md:inline-block my-4 md:my-0 mx-4 border-b-2 border-primary/30">tak terlupakan</span>
            </h2>
          </div>
        </div>
      </section>

      {/* Modal Impian */}
      {modalCita && (
        <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-white w-full max-w-4xl rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-6 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold">Impian DTF 1</h2>
              <button onClick={() => setModalCita(false)} className="text-3xl leading-none">&times;</button>
            </div>
            <div className="modal-scroll p-4 md:p-8 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50">
              {dataCitaCita.map((item) => (
                <div key={item.nama} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 md:flex-col md:text-center md:gap-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
                    {item.nama.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm md:text-base">{item.nama}</h4>
                    <p className="text-xs text-purple-600 italic font-medium">{item.impian}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-white border-t text-center">
              <button onClick={() => setModalCita(false)} className="w-full md:w-auto bg-purple-600 text-white px-10 py-3 rounded-full font-bold shadow-lg">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Harapan */}
      {modalHarapan && (
        <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-6 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold">Harapan &amp; Pesan</h2>
              <button onClick={() => setModalHarapan(false)} className="text-3xl leading-none">&times;</button>
            </div>
            <div className="modal-scroll p-4 md:p-8 overflow-y-auto space-y-4 bg-gray-50">
              {dataHarapan.map((item) => (
                <div key={item.nama} className="bg-white p-5 rounded-2xl border-l-4 border-orange-400 shadow-sm">
                  <p className="text-gray-700 text-sm md:text-base italic leading-relaxed">&quot;{item.pesan}&quot;</p>
                  <p className="mt-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">— {item.nama}</p>
                </div>
              ))}
            </div>
            <div className="p-4 bg-white border-t text-center">
              <button onClick={() => setModalHarapan(false)} className="w-full md:w-auto bg-orange-500 text-white px-10 py-3 rounded-full font-bold shadow-lg">
                Selesai Membaca
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
