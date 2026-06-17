import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sources & Reading List | Lexi\'s Anatomy',
  description: 'Good science writing starts with trustworthy evidence for every Lexi\'s Anatomy fact.',
};

export default function SourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-pink-50 to-blue-50 py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Sources & Reading List</h1>
          <p className="text-lg text-gray-600">
            Good science writing starts with trustworthy evidence.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-6">
            Lexi's Anatomy uses reliable medical and science sources to support every factual claim. Preferred sources include major public-health institutions, children's hospitals, medical schools, peer-reviewed research, and strong educational summaries from trusted organizations.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why This Matters</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            The goal of this page is not to overwhelm readers with jargon, but to show where the facts come from and why those sources can be trusted.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Source Policy</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            When possible, articles should point to organizations such as NIH, CDC, WHO, Mayo Clinic, Cleveland Clinic, PubMed, medical schools, and children's hospitals.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg mt-8">
            <p className="text-gray-800">
              <strong>Educational Disclaimer:</strong> Lexi's Anatomy is for education only. It does not diagnose, treat, or replace a doctor, nurse, or other licensed medical professional.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Reading List</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Want to keep exploring? Start with the sources behind the facts, then follow the science further.
          </p>
        </div>
      </div>
    </div>
  );
}
