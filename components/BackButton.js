import Link from "next/link";

// Tombol "Kembali" bergaya pill yang dipakai halaman-halaman arsip
export default function BackButton({ accent = "amber" }) {
  const color =
    accent === "emerald"
      ? "border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-400"
      : "border-white/10 bg-white/5 hover:border-amber-500/50 text-white";

  return (
    <div className="flex justify-center mb-8">
      <Link href="/" className={`group flex items-center gap-3 border px-5 py-2 rounded-full transition-all ${color}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Kembali</span>
      </Link>
    </div>
  );
}
