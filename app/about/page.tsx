import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Lexi's Anatomy",
  description: 'A science blog built around one simple idea: surprising facts are easier to remember when they unfold like small investigations.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-pink-50 to-blue-50 py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Lexi's Anatomy</h1>
          <p className="text-lg text-gray-600">
            A science blog built around one simple idea: surprising facts are easier to remember when they unfold like small investigations.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What is Lexi's Anatomy?</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Lexi's Anatomy is an English-language biology and medicine website created for curious readers, especially teens who want science to feel clear, smart, and exciting. The project is designed to work in two ways at once: as a polished public-facing blog and as a personal portfolio for a future medical student.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">How It Works</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Instead of sounding like a textbook, every post on Lexi's Anatomy starts with a question, follows the science step by step, and ends by explaining why the answer matters in real life and real medicine. The goal is not just to share facts, but to make readers pause, wonder, and understand something new.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">The Name</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            The name <span className="font-semibold">Lexi's Anatomy</span> lightly echoes a favorite medical TV title, but the site itself is focused on real biology, real medicine, and clear educational storytelling.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Reliable Sources</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Every factual claim on Lexi's Anatomy is based on reliable information from trusted sources including major health institutions, medical schools, peer-reviewed research, and children's hospitals.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg mt-8 mb-6">
            <p className="text-gray-800">
              <strong>Educational Disclaimer:</strong> Lexi's Anatomy is for education only. It does not diagnose, treat, or replace a doctor, nurse, or other licensed medical professional.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a href="/about-lexi" className="inline-block px-8 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-semibold">
            Learn About Lexi
          </a>
        </div>
      </div>
    </div>
  );
}
