export default function WaliKelas() {
  return (
    <section id="pesan" className="relative min-h-screen flex items-center overflow-hidden bg-surface-dim border-t border-white/5">
      <div className="absolute left-0 bottom-0 w-1/3 h-full bg-primary/5 wood-texture opacity-10 rotate-12 -translate-x-1/2"></div>

      <div className="container mx-auto flex flex-col md:flex-row items-center px-6 md:px-margin-desktop z-10">
        <div className="w-full md:w-1/2 h-[350px] md:h-[550px] transition-all duration-1000 ease-out">
          <div className="w-full h-full relative group">
            <div className="absolute -top-4 -left-4 size-20 border-t-2 border-l-2 border-primary group-hover:-top-2 group-hover:-left-2 transition-all duration-500"></div>

            <div className="w-full h-full bg-surface-container overflow-hidden shadow-2xl border border-white/10 rounded-sm">
              <img src="/walikelas.png" className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700" alt="Ika Lutfiana, S.T.T" />
            </div>

            <div className="absolute -bottom-4 -right-4 size-20 border-b-2 border-r-2 border-primary group-hover:-bottom-2 group-hover:-right-2 transition-all duration-500"></div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-16 transition-all duration-1000">
          <span className="font-label-caps text-xs uppercase tracking-[0.3em] text-primary mb-4 font-bold block">Wali Kelas Kami</span>

          <h2 className="text-4xl md:text-6xl font-display-lg font-bold mb-6 text-white leading-tight">
            Ika Lutfiana, <span className="text-primary italic">S.T.T</span>
          </h2>

          <div className="relative">
            <span className="absolute -top-10 -left-6 text-8xl text-white/5 font-serif z-0">&quot;</span>

            <p className="relative z-10 mb-8 italic text-on-surface-variant text-base md:text-xl leading-relaxed opacity-90">
              &quot;Selamat atas kelulusan kalian! Selama kebersamaan kita di kelas, Ibu belajar banyak dari kalian—tentang semangat, tawa, dan cara kalian memandang dunia dengan unik. Jangan pernah merasa harus menjadi orang lain untuk bisa sukses.&quot;
            </p>
          </div>

          <div className="w-24 h-1 bg-primary/40 shadow-[0_0_15px_rgba(247,189,72,0.3)]"></div>
        </div>
      </div>
    </section>
  );
}
