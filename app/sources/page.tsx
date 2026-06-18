import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sources & Reading List | Lexi\'s Anatomy',
  description: 'Good science writing starts with trustworthy evidence for every Lexi\'s Anatomy fact.',
};

export default function SourcesPage() {
  return (
    <div className="la-page min-h-screen">
      <div className="la-hero py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="la-title mb-4 text-4xl font-bold md:text-5xl">Sources & Reading List</h1>
          <p className="la-subtitle text-lg">
            Good science writing starts with trustworthy evidence.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <hr className="la-divider mb-8" />
        <div className="la-heading-stack prose prose-lg max-w-none">
          <p className="mb-6 leading-relaxed text-[#3f5369]">
            Lexi&apos;s Anatomy uses reliable medical and science sources to support every factual claim. Preferred sources include major public-health institutions, children&apos;s hospitals, medical schools, peer-reviewed research, and strong educational summaries from trusted organizations.
          </p>

          <h2 className="la-title la-section-title mb-4 text-2xl font-bold">Why This Matters</h2>
          <p className="mb-6 leading-relaxed text-[#3f5369]">
            The goal of this page is not to overwhelm readers with jargon, but to show where the facts come from and why those sources can be trusted.
          </p>

          <h2 className="la-title la-section-title mb-4 text-2xl font-bold">Source Policy</h2>
          <p className="mb-6 leading-relaxed text-[#3f5369]">
            When possible, articles should point to organizations such as NIH, CDC, WHO, Mayo Clinic, Cleveland Clinic, PubMed, medical schools, and children&apos;s hospitals.
          </p>

          <div className="la-soft-note mt-8 p-6">
            <p className="text-[#364c63]">
              <strong>Educational Disclaimer:</strong> Lexi&apos;s Anatomy is for education only. It does not diagnose, treat, or replace a doctor, nurse, or other licensed medical professional.
            </p>
          </div>

          <h2 className="la-title la-section-title mb-4 mt-8 text-2xl font-bold">Reading List</h2>
          <p className="mb-6 leading-relaxed text-[#3f5369]">
            Want to keep exploring? Start with the sources behind the facts, then follow the science further.
          </p>
        </div>
      </div>
    </div>
  );
}
