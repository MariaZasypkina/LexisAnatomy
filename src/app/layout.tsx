import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: "Lexi's Anatomy",
  description: "Teen-friendly biology and medicine facts",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl text-gray-900">Lexi's Anatomy</Link>
            <nav className="space-x-4">
              <Link href="/facts" className="text-gray-700 hover:text-gray-900">All Facts</Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900">About</Link>
              <Link href="/about-lexi" className="text-gray-700 hover:text-gray-900">About Lexi</Link>
              <Link href="/myth-or-truth" className="text-gray-700 hover:text-gray-900">Myth or Truth</Link>
              <Link href="/sources" className="text-gray-700 hover:text-gray-900">Sources</Link>
              <Link href="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="bg-white border-t mt-12">
          <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-600">
            <p>© {new Date().getFullYear()} Lexi's Anatomy. For educational purposes only.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
