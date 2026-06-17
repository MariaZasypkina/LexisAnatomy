import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lexi's Anatomy | Teen-Friendly Biology & Medicine Facts",
  description: "A curious, teen-friendly biology and medicine blog where surprising facts turn into clear explanations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3">
            <Link href="/" className="text-lg font-bold text-slate-900">
              Lexi&apos;s Anatomy
            </Link>
            <nav className="flex items-center gap-4 text-sm font-medium text-slate-700">
              <Link href="/facts" className="hover:text-slate-900">
                All Facts
              </Link>
              <Link href="/about" className="hover:text-slate-900">
                About
              </Link>
              <Link href="/about-lexi" className="hover:text-slate-900">
                About Lexi
              </Link>
              <Link href="/myth-or-truth" className="hover:text-slate-900">
                Myth or Truth
              </Link>
              <Link href="/contact" className="hover:text-slate-900">
                Contact
              </Link>
              <Link href="/sources" className="hover:text-slate-900">
                Sources
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
