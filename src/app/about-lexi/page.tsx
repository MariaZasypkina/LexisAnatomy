import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Lexi | Lexi\'s Anatomy',
  description: 'Meet the student behind Lexi\'s Anatomy, a future doctor exploring biology and medicine.',
};

export default function AboutLexiPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-pink-50 to-blue-50 py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Lexi
          </h1>
          <p className="text-lg text-gray-600">
            Meet the student behind Lexi's Anatomy.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            Lexi is a student who wants to become a doctor and loves discovering strange, memorable facts about biology and medicine. Lexi's Anatomy began as a way to turn that curiosity into something shareable: a website where science feels welcoming, visual, and easier to understand.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            This project is also a way to practice something future doctors need every day — explaining complex ideas clearly, calmly, and honestly. That is why the site focuses on reliable sources, simple wording, and facts that connect back to patients, families, and real-world medicine.
          </p>

          <div className="bg-pink-50 p-6 rounded-lg my-8 border-l-4 border-pink-500">
            <p className="text-gray-800 italic text-lg">
              Curious about the human body? So is Lexi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
