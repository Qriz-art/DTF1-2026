export default function Hero() {
  return (
    <section className="relative h-screen w-full flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-dim/60 via-transparent to-surface-dim z-10"></div>
        <picture>
          <source media="(min-width: 1024px)" srcSet="/foto-pc.jpeg" />
          <source media="(min-width: 640px)" srcSet="/foto-pc.jpeg" />
          <img className="w-full h-full object-cover opacity-60" src="/foto-hp.jpeg" alt="Workshop Furniture" />
        </picture>
      </div>

      <main className="relative z-20 flex-1 flex flex-col justify-center items-center text-center px-6 lg:px-margin-desktop">
        <div className="max-w-4xl">
          <h1 className="relative font-display-lg text-4xl md:text-7xl lg:text-8xl text-white leading-tight mb-8 lg:mb-20 lg:-top-24">
            DESAIN TEKNIK <span className="text-primary italic text-glow">FURNITUR</span>
          </h1>

          <div className="space-y-6">
            <span className="font-light tracking-widest text-2xl md:text-6xl uppercase text-white block">Angkatan 2026</span>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto text-base md:text-xl leading-relaxed italic opacity-90">
              &quot;Mungkin besok kita sudah sibuk dengan urusan masing-masing, tapi jangan lupa kalau kita pernah berjuang bareng di sini.&quot;
            </p>
          </div>
        </div>
      </main>
    </section>
  );
}
