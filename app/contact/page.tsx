import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Submit a Question | Lexi\'s Anatomy',
  description: 'Ask Lexi about biology or medicine, suggest a myth, or send an idea for a future Lexi\'s Anatomy post.',
};

export default function ContactPage() {
  return (
    <div className="la-page min-h-screen">
      <div className="la-hero py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="la-title mb-4 text-4xl font-bold md:text-5xl">Submit a Question</h1>
          <p className="la-subtitle text-lg">
            Ask about a body mystery, suggest a myth, or send an idea for a future Lexi&apos;s Anatomy post.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <hr className="la-divider mb-8" />
        <div className="mb-8">
          <p className="mb-4 leading-relaxed text-[#3f5369]">
            The best science questions often start small: Why does this happen? Is that really true? What is going on inside the body? This page is a place for curious readers to send those questions in.
          </p>
        </div>

        <form className="la-card mb-8 p-8">
          <div className="mb-6">
            <label className="mb-2 block font-semibold text-[#26394d]">Use this form to:</label>
            <ul className="list-disc list-inside space-y-2 text-[#3f5369]">
              <li>Ask Lexi a question about biology or medicine.</li>
              <li>Suggest a &quot;Myth or Truth&quot; idea.</li>
              <li>Vote for a topic you would love to see next.</li>
            </ul>
          </div>

          <div className="mb-6">
            <label htmlFor="name" className="mb-2 block font-semibold text-[#26394d]">Your Name (optional)</label>
            <input
              type="text"
              id="name"
              className="la-input"
              placeholder="Your name"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="mb-2 block font-semibold text-[#26394d]">Your Email (optional)</label>
            <input
              type="email"
              id="email"
              className="la-input"
              placeholder="your@email.com"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="mb-2 block font-semibold text-[#26394d]">Your Message</label>
            <textarea
              id="message"
              rows={6}
              className="la-textarea"
              placeholder="Ask your question or share your idea..."
            />
          </div>

          <button
            type="submit"
            className="la-btn-primary w-full px-6 py-3"
          >
            Send Your Question
          </button>
        </form>

        <div className="la-soft-note border-l-4 border-[#5886a8] p-6">
          <p className="text-[#3f5369]">
            <strong>Note:</strong> Questions may inspire future educational posts, but replies are not personal medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}
