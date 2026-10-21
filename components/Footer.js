import Link from "next/link";
import { Logo } from "./Navbar";

export default function Footer() {
  return (
    <footer className="relative bg-surface-dim pt-20 pb-10 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 wood-texture opacity-[0.03] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-margin-desktop relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Logo size="size-8" />
              <span className="font-display-lg text-xl text-white uppercase tracking-tighter">
                DTF <span className="text-primary">1</span>
              </span>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed opacity-70">
              Kami pergi membawa sejuta cerita, dan kami harap Anda tetap menyimpan sedikit ruang untuk kenangan tentang kami.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <h5 className="text-white font-bold text-xs uppercase tracking-widest">Halaman</h5>
              <ul className="space-y-2 text-on-surface-variant text-sm italic">
                <li><a href="#" className="hover:text-primary transition-colors">Beranda</a></li>
                <li><a href="#pesan" className="hover:text-primary transition-colors">Wali Kelas</a></li>
                <li><a href="#keinginan" className="hover:text-primary transition-colors">Keinginan</a></li>
                <li><a href="#album" className="hover:text-primary transition-colors">Galeri</a></li>
                <li><a href="#guru" className="hover:text-primary transition-colors">Guru Kami</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="text-white font-bold text-xs uppercase tracking-widest">Memori</h5>
              <ul className="space-y-2 text-on-surface-variant text-sm italic">
                <li><Link href="/origin" className="hover:text-primary transition-colors">Tahun 2023</Link></li>
                <li><Link href="/memories" className="hover:text-primary transition-colors">Tahun 2024</Link></li>
                <li><Link href="/legacy" className="hover:text-primary transition-colors">Tahun 2025/2026</Link></li>
                <li><Link href="/biodata" className="hover:text-primary transition-colors">Data Alumni</Link></li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="text-white font-bold text-xs uppercase tracking-widest">Alamat Sekolah</h5>
            <p className="text-on-surface-variant text-sm leading-relaxed opacity-70 italic">
              JL. ANGGREK UJUNGRUSI PO.BOX 2, Ujungrusi, Kec. Adiwerna, Kab. Tegal, Jawa Tengah.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/12.dtfsatu/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram DTF 1"
                className="size-9 rounded-full bg-white/5 flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] text-on-surface-variant uppercase tracking-[0.4em] opacity-50">
            © 2026 DTF 1 SMKN 2 ADIWERNA • CREATED WITH PASSION
          </p>
        </div>
      </div>
    </footer>
  );
}
