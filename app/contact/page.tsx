import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Submit a Question | Lexi\'s Anatomy',
  description: 'Ask Lexi about biology or medicine, suggest a myth, or send an idea for a future Lexi\'s Anatomy post.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-pink-50 to-blue-50 py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Submit a Question</h1>
          <p className="text-lg text-gray-600">
            Ask about a body mystery, suggest a myth, or send an idea for a future Lexi's Anatomy post.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            The best science questions often start small: Why does this happen? Is that really true? What is going on inside the body? This page is a place for curious readers to send those questions in.
          </p>
        </div>

        <form className="bg-gray-50 p-8 rounded-lg mb-8">
          <div className="mb-6">
            <label className="block text-gray-900 font-semibold mb-2">Use this form to:</label>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Ask Lexi a question about biology or medicine.</li>
              <li>Suggest a "Myth or Truth" idea.</li>
              <li>Vote for a topic you would love to see next.</li>
            </ul>
          </div>

          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-900 font-semibold mb-2">Your Name (optional)</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Your name"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-900 font-semibold mb-2">Your Email (optional)</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="your@email.com"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-900 font-semibold mb-2">Your Message</label>
            <textarea
              id="message"
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Ask your question or share your idea..."
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-semibold"
          >
            Send Your Question
          </button>
        </form>

        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
          <p className="text-gray-700">
            <strong>Note:</strong> Questions may inspire future educational posts, but replies are not personal medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}
