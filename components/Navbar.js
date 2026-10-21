"use client";

import { useEffect, useRef, useState } from "react";

const links = [
  { href: "#", label: "HOME" },
  { href: "#pesan", label: "WALI KELAS" },
  { href: "#keinginan", label: "KEINGINAN" },
  { href: "#album", label: "ALBUM" },
  { href: "#guru", label: "GURU" },
];

function Logo({ size = "size-10" }) {
  return (
    <div className={`${size} text-primary`}>
      <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd" />
        <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd" />
      </svg>
    </div>
  );
}

export { Logo };

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#");
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const itemRefs = useRef({});
  const lockRef = useRef(0);

  // Posisi garis emas mengikuti menu yang aktif
  useEffect(() => {
    const update = () => {
      const el = itemRefs.current[active];
      if (!el) return;
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [active]);

  // Sorot menu mengikuti section yang sedang dilihat
  useEffect(() => {
    const onScroll = () => {
      if (Date.now() < lockRef.current) return;
      const y = window.scrollY + 140;
      let current = "#";
      for (const l of links) {
        if (l.href === "#") continue;
        const el = document.querySelector(l.href);
        if (el && el.offsetTop <= y) current = l.href;
      }
      setActive(current);
    };
    if (window.location.hash) setActive(window.location.hash);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href) => {
    setActive(href);
    lockRef.current = Date.now() + 900;
    setOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 lg:px-margin-desktop py-6 flex justify-between items-center border-b border-white/10 glass-card">
        <div className="flex items-center gap-4">
          <Logo />
          <span className="font-display-lg text-2xl tracking-tighter text-white uppercase">
            DTF <span className="text-primary">1</span>
          </span>
        </div>

        <div className="hidden lg:flex gap-10 items-center relative">
          {links.map((l) => (
            <a
              key={l.href}
              ref={(el) => {
                itemRefs.current[l.href] = el;
              }}
              className={`font-label-caps text-sm py-1 transition-colors ${
                active === l.href ? "text-primary" : "text-on-surface-variant hover:text-primary"
              }`}
              href={l.href}
              onClick={() => handleClick(l.href)}
            >
              {l.label}
            </a>
          ))}
          <span
            className="absolute bottom-0 h-[2px] bg-primary transition-all duration-300 ease-out"
            style={{ left: indicator.left, width: indicator.width }}
          />
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-white" aria-label="Menu">
          <span className="material-symbols-outlined text-3xl">{open ? "close" : "menu"}</span>
        </button>
      </nav>

      {open && (
        <div className="fixed top-[88px] left-0 w-full bg-surface-dim/95 z-[110] flex flex-col p-6 gap-4 lg:hidden glass-card border-b border-white/10">
          {links.map((l) => (
            <a
              key={l.href}
              className={`font-bold ${active === l.href ? "text-primary" : "text-on-surface-variant"}`}
              href={l.href}
              onClick={() => handleClick(l.href)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
