export interface Author {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  credentials: string[];
  socialLinks: {
    platform: string;
    url: string;
  }[];
  expertise: string[];
}

export const authors: Record<string, Author> = {
  'sarah-johnson': {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    title: 'Rental Finance Expert & CFP',
    bio: '10+ years helping renters navigate housing costs and financial decisions. Former property manager turned renter advocate with expertise in budgeting, negotiation, and tenant rights.',
    image: '/images/authors/sarah-johnson.jpg',
    credentials: [
      'Certified Financial Planner (CFP)',
      'Former Property Manager (8 years)',
      'Published in Forbes, Business Insider'
    ],
    socialLinks: [
      { platform: 'Twitter', url: 'https://twitter.com/sarahjohnson' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/sarahjohnson' }
    ],
    expertise: ['Rental Finance', 'Budgeting', 'Negotiation', 'Cost Optimization']
  },
  
  'michael-chen': {
    id: 'michael-chen',
    name: 'Michael Chen',
    title: 'Tenant Rights Attorney',
    bio: 'Legal expert specializing in landlord-tenant law with 12 years of experience representing renters. Licensed attorney in California, New York, and Texas.',
    image: '/images/authors/michael-chen.jpg',
    credentials: [
      'Licensed Attorney (CA, NY, TX)',
      'Tenant Rights Specialist',
      'Legal Aid Society Volunteer'
    ],
    socialLinks: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/michaelchen' },
      { platform: 'Website', url: 'https://michaelchenlaw.com' }
    ],
    expertise: ['Tenant Rights', 'Legal Protection', 'Eviction Defense', 'Security Deposits']
  },
  
  'emily-rodriguez': {
    id: 'emily-rodriguez',
    name: 'Emily Rodriguez',
    title: 'Real Estate & Rental Market Analyst',
    bio: 'Data analyst covering rental market trends across 50+ U.S. cities. Former Zillow researcher with expertise in pricing, hidden fees, and market dynamics.',
    image: '/images/authors/emily-rodriguez.jpg',
    credentials: [
      'MS in Data Science',
      'Former Zillow Research Analyst',
      'Published 100+ Market Reports'
    ],
    socialLinks: [
      { platform: 'Twitter', url: 'https://twitter.com/emilyrodriguez' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/emilyrodriguez' }
    ],
    expertise: ['Market Analysis', 'Rental Pricing', 'Hidden Fees', 'Market Trends']
  },
  
  'editorial-team': {
    id: 'editorial-team',
    name: 'RentingExplained.com Editorial Team',
    title: 'Rental Experts & Renter Advocates',
    bio: 'Collaborative team of rental finance experts, tenant rights attorneys, and former property managers dedicated to helping renters save money and understand their rights.',
    image: '/images/authors/editorial-team.jpg',
    credentials: [
      '15+ Years Combined Experience',
      'Legal & Financial Expertise',
      'Trusted by 50,000+ Renters'
    ],
    socialLinks: [
      { platform: 'Twitter', url: 'https://twitter.com/rentingexplained' },
      { platform: 'Website', url: 'https://rentingexplained.com/about' }
    ],
    expertise: ['Renting Advice', 'Tenant Rights', 'Money Saving', 'Rental Tools']
  }
};

export function getAuthorById(id: string): Author | undefined {
  return authors[id];
}

export function getAuthorByName(name: string): Author | undefined {
  const authorId = name.toLowerCase().replace(/\s+/g, '-');
  return authors[authorId];
}

export function getAllAuthors(): Author[] {
  return Object.values(authors);
}

// Map article authors to author IDs
export const articleAuthors: Record<string, string> = {
  'how-to-save-money-renting-2025': 'sarah-johnson',
  'tenant-rights-everyone-should-know': 'michael-chen',
  'hidden-rental-fees-explained': 'emily-rodriguez',
  'best-apps-and-tools-for-renters': 'sarah-johnson',
  'renting-vs-buying-2025': 'sarah-johnson',
  'first-apartment-checklist-guide-2025': 'editorial-team',
  'rental-application-checklist': 'editorial-team',
  'apartment-tour-checklist-questions-red-flags': 'editorial-team',
  'tenant-screening-credit-checks-for-renters': 'editorial-team',
};

export function getArticleAuthor(articleSlug: string): Author {
  const authorId = articleAuthors[articleSlug] || 'editorial-team';
  return authors[authorId];
}
