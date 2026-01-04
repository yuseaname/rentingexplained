'use client';

import { useProgress } from '@/components/progress/ProgressProvider';
import Badge from '@/components/ui/Badge';

export default function BadgesDisplay() {
  const { progress } = useProgress();

  const allBadges = [
    {
      id: 'first-article',
      name: 'Getting Started',
      description: 'Read your first article',
      icon: '??',
      requirement: 'Read 1 article',
      earned: progress.articlesRead.length >= 1,
    },
    {
      id: 'five-articles',
      name: 'Knowledge Seeker',
      description: 'Read 5 articles',
      icon: '??',
      requirement: 'Read 5 articles',
      earned: progress.articlesRead.length >= 5,
    },
    {
      id: 'first-quiz',
      name: 'Quiz Master',
      description: 'Complete your first quiz',
      icon: '??',
      requirement: 'Complete 1 quiz',
      earned: progress.quizzesCompleted.length >= 1,
    },
    {
      id: 'week-streak',
      name: 'Weekly Warrior',
      description: '7-day reading streak',
      icon: '??',
      requirement: '7-day streak',
      earned: progress.streak >= 7,
    },
    {
      id: 'month-streak',
      name: 'Monthly Champion',
      description: '30-day reading streak',
      icon: '?',
      requirement: '30-day streak',
      earned: progress.streak >= 30,
    },
    ...progress.badges,
  ];

  const earnedBadges = allBadges.filter((badge) => badge.earned);
  const lockedBadges = allBadges.filter((badge) => !badge.earned);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Badges</h3>

      {earnedBadges.length > 0 && (
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Earned ({earnedBadges.length})</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {earnedBadges.map((badge) => (
              <div
                key={badge.id}
                className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-lg p-4 border-2 border-accent-200"
              >
                <div className="text-4xl mb-2 text-center">{badge.icon}</div>
                <h5 className="font-semibold text-gray-900 text-center mb-1">
                  {badge.name}
                </h5>
                <p className="text-sm text-gray-600 text-center">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {lockedBadges.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Locked ({lockedBadges.length})</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {lockedBadges.map((badge) => (
              <div
                key={badge.id}
                className="bg-gray-100 rounded-lg p-4 border-2 border-gray-200 opacity-60"
              >
                <div className="text-4xl mb-2 text-center filter grayscale">
                  {badge.icon}
                </div>
                <h5 className="font-semibold text-gray-700 text-center mb-1">
                  {badge.name}
                </h5>
                <p className="text-sm text-gray-500 text-center">
                  {badge.requirement}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
