export interface Article {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishDate: string;
  lastModified: string;
  category: string;
  tags: string[];
  readingTime: number;
  image: string;
  imageAlt: string;
  imageCredit?: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon: string;
}

export interface Quiz {
  id: string;
  articleSlug: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  earned: boolean;
  earnedDate?: string;
}

export interface UserProgress {
  articlesRead: string[];
  currentArticle?: string;
  scrollPosition?: number;
  quizzesCompleted: string[];
  badges: Badge[];
  streak: number;
  lastVisit: string;
  totalReadingTime: number;
  helpfulVotes: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  rank: number;
  comment?: string;
  avatar: string;
}

export interface AnalyticsEvent {
  type: 'scroll' | 'click' | 'quiz' | 'tool' | 'time';
  timestamp: number;
  data: Record<string, any>;
}
