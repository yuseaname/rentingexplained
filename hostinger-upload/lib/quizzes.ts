import { Quiz } from '@/types';

export const quizzes: Quiz[] = [
  {
    id: 'money-saving-quiz',
    articleSlug: 'how-to-save-money-renting-2025',
    questions: [
      {
        id: 'q1',
        question: 'When is the best time to negotiate your rent?',
        options: [
          'After you sign the lease',
          'Before signing, during the application process',
          'After moving in',
          'Never, rent is non-negotiable',
        ],
        correctAnswer: 1,
        explanation: 'The best time to negotiate is before signing the lease, when you have the most leverage. Once you\'ve signed, you\'re locked into the agreed terms.',
      },
      {
        id: 'q2',
        question: 'What percentage of your gross income should ideally go toward rent?',
        options: [
          'No more than 20%',
          'No more than 30%',
          'No more than 40%',
          'No more than 50%',
        ],
        correctAnswer: 1,
        explanation: 'Financial experts generally recommend spending no more than 30% of your gross income on rent to maintain financial stability and save for other goals.',
      },
      {
        id: 'q3',
        question: 'Which strategy can help you save the most money on rent?',
        options: [
          'Signing a longer lease (12-24 months)',
          'Getting a roommate',
          'Moving to a less expensive neighborhood',
          'All of the above',
        ],
        correctAnswer: 3,
        explanation: 'All three strategies can significantly reduce your rental costs. Combining multiple approaches maximizes your savings potential.',
      },
    ],
  },
  {
    id: 'tenant-rights-quiz',
    articleSlug: 'tenant-rights-everyone-should-know',
    questions: [
      {
        id: 'q1',
        question: 'Can a landlord enter your rental unit without notice?',
        options: [
          'Yes, they own the property',
          'No, they must provide reasonable notice except in emergencies',
          'Yes, but only during business hours',
          'Only if it\'s in the lease',
        ],
        correctAnswer: 1,
        explanation: 'In most jurisdictions, landlords must provide 24-48 hours notice before entering, except in emergencies. This protects your right to privacy and quiet enjoyment.',
      },
      {
        id: 'q2',
        question: 'What is "quiet enjoyment" as a tenant right?',
        options: [
          'The right to not have noisy neighbors',
          'The right to use your rental unit without unreasonable interference',
          'The right to have quiet hours enforced',
          'The right to soundproof walls',
        ],
        correctAnswer: 1,
        explanation: '"Quiet enjoyment" means you have the right to use your rental property peacefully without unreasonable interference from your landlord or others.',
      },
      {
        id: 'q3',
        question: 'When must a landlord return your security deposit?',
        options: [
          'Within 7 days',
          'Within 30 days',
          'It varies by state/jurisdiction',
          'Whenever they want',
        ],
        correctAnswer: 2,
        explanation: 'Security deposit return timelines vary significantly by state and local laws, typically ranging from 14 to 60 days. Check your local regulations.',
      },
    ],
  },
];

export function getQuizByArticleSlug(slug: string): Quiz | undefined {
  return quizzes.find((quiz) => quiz.articleSlug === slug);
}
