export interface SEOMetadata {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
}

export function generateCanonical(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lexisanatomy.com';
  return `${baseUrl}${path}`;
}

export function generateOpenGraphImage(title: string): string {
  // Placeholder: In production, generate custom OG images per post
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lexisanatomy.com';
  return `${baseUrl}/og-default.jpg`;
}

export function getPageSEO(page: string): SEOMetadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lexisanatomy.com';
  
  const defaults: Record<string, SEOMetadata> = {
    home: {
      title: "Lexi's Anatomy | Teen-Friendly Biology & Medicine Facts",
      description: 'A curious, teen-friendly biology and medicine blog where surprising facts turn into clear explanations.',
      canonical: baseUrl,
    },
    facts: {
      title: "All Facts | Lexi's Anatomy",
      description: 'Explore every investigation published on Lexi\'s Anatomy, from anatomy and microbiology to medical myths and brain facts.',
      canonical: `${baseUrl}/facts`,
    },
    about: {
      title: "About Lexi's Anatomy",
      description: 'A science blog built around one simple idea: surprising facts are easier to remember when they unfold like small investigations.',
      canonical: `${baseUrl}/about`,
    },
    aboutLexi: {
      title: 'About Lexi | Lexi\'s Anatomy',
      description: 'Meet the student behind Lexi\'s Anatomy, a future doctor exploring biology and medicine.',
      canonical: `${baseUrl}/about-lexi`,
    },
    mythOrTruth: {
      title: 'Myth or Truth | Lexi\'s Anatomy',
      description: 'Some medical "facts" sound believable until you look closer. Explore myth-vs-fact moments.',
      canonical: `${baseUrl}/myth-or-truth`,
    },
    contact: {
      title: 'Submit a Question | Lexi\'s Anatomy',
      description: 'Ask Lexi about biology or medicine, suggest a myth, or vote for a future topic.',
      canonical: `${baseUrl}/contact`,
    },
    sources: {
      title: 'Sources & Reading List | Lexi\'s Anatomy',
      description: 'Good science writing starts with trustworthy evidence. Explore our sources and reading list.',
      canonical: `${baseUrl}/sources`,
    },
  };
  
  return defaults[page] || defaults.home;
}
