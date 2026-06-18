import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="text-lg font-bold text-pink-600 hover:text-pink-700">
          Lexi&apos;s Anatomy
        </Link>

        <nav className="flex items-center gap-4 text-sm font-medium text-slate-700">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <Link href="/facts" className="hover:text-slate-900">All Facts</Link>
          <Link href="/myth-or-truth" className="hover:text-slate-900">Myth or Truth</Link>
          <Link href="/about" className="hover:text-slate-900">About</Link>
          <Link href="/contact" className="hover:text-slate-900">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
