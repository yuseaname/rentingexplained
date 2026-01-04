'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProgress, Badge } from '@/types';

interface ProgressContextType {
  progress: UserProgress;
  markArticleRead: (slug: string) => void;
  saveProgress: (slug: string, scrollPosition: number) => void;
  completeQuiz: (quizId: string) => void;
  earnBadge: (badge: Badge) => void;
  incrementStreak: () => void;
  addReadingTime: (minutes: number) => void;
  getContinueReading: () => { slug: string; position: number } | null;
}

const defaultProgress: UserProgress = {
  articlesRead: [],
  quizzesCompleted: [],
  badges: [],
  streak: 0,
  lastVisit: new Date().toISOString(),
  totalReadingTime: 0,
  helpfulVotes: 0,
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);

  useEffect(() => {
    // Load progress from localStorage
    const stored = localStorage.getItem('user_progress');
    if (stored) {
      setProgress(JSON.parse(stored));
    }

    // Check and update streak
    const lastVisit = new Date(progress.lastVisit);
    const today = new Date();
    const daysDiff = Math.floor((today.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 1) {
      // Consecutive day - increment streak
      incrementStreak();
    } else if (daysDiff > 1) {
      // Streak broken - reset
      setProgress(prev => ({ ...prev, streak: 1, lastVisit: today.toISOString() }));
    }
  }, []);

  useEffect(() => {
    // Save progress to localStorage
    localStorage.setItem('user_progress', JSON.stringify(progress));
  }, [progress]);

  const markArticleRead = (slug: string) => {
    setProgress(prev => ({
      ...prev,
      articlesRead: [...new Set([...prev.articlesRead, slug])],
    }));
  };

  const saveProgress = (slug: string, scrollPosition: number) => {
    setProgress(prev => ({
      ...prev,
      currentArticle: slug,
      scrollPosition,
    }));
  };

  const completeQuiz = (quizId: string) => {
    setProgress(prev => ({
      ...prev,
      quizzesCompleted: [...new Set([...prev.quizzesCompleted, quizId])],
    }));
  };

  const earnBadge = (badge: Badge) => {
    setProgress(prev => ({
      ...prev,
      badges: [...prev.badges, { ...badge, earned: true, earnedDate: new Date().toISOString() }],
    }));
  };

  const incrementStreak = () => {
    setProgress(prev => ({
      ...prev,
      streak: prev.streak + 1,
      lastVisit: new Date().toISOString(),
    }));
  };

  const addReadingTime = (minutes: number) => {
    setProgress(prev => ({
      ...prev,
      totalReadingTime: prev.totalReadingTime + minutes,
    }));
  };

  const getContinueReading = () => {
    if (progress.currentArticle && progress.scrollPosition) {
      return {
        slug: progress.currentArticle,
        position: progress.scrollPosition,
      };
    }
    return null;
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markArticleRead,
        saveProgress,
        completeQuiz,
        earnBadge,
        incrementStreak,
        addReadingTime,
        getContinueReading,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
}
