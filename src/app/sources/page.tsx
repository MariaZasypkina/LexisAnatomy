import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sources & Reading List | Lexi\'s Anatomy',
  description: 'Good science writing starts with trustworthy evidence. Explore our sources and reading list.',
};

export default function SourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-pink-50 to-blue-50 py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Sources & Reading List
          </h1>
          <p className="text-lg text-gray-600">
            Good science writing starts with trustworthy evidence.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Source Policy</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Lexi's Anatomy uses reliable medical and science sources to support every factual claim. Preferred sources include major public-health institutions, children's hospitals, medical schools, peer-reviewed research, and strong educational summaries from trusted organizations.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            The goal of this page is not to overwhelm readers with jargon, but to show where the facts come from and why those sources can be trusted. When possible, articles point to organizations such as:
          </p>

          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li>NIH (National Institutes of Health)</li>
            <li>CDC (Centers for Disease Control and Prevention)</li>
            <li>WHO (World Health Organization)</li>
            <li>Mayo Clinic</li>
            <li>Cleveland Clinic</li>
            <li>PubMed</li>
            <li>Medical schools</li>
            <li>Children's hospitals</li>
          </ul>

          <div className="bg-blue-50 p-6 rounded-lg my-8 border-l-4 border-blue-500">
            <p className="text-gray-800">
              <strong>Educational Disclaimer:</strong> Lexi's Anatomy is for education only. It does not diagnose, treat, or replace a doctor, nurse, or other licensed medical professional.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Want to Keep Exploring?</h2>
          <p className="text-gray-700 leading-relaxed">
            Start with the sources behind the facts, then follow the science further. Each post on Lexi's Anatomy includes links to the specific sources used for that investigation.
          </p>
        </div>
      </div>
    </div>
  );
}
