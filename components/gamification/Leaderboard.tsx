'use client';

import { useState, useEffect } from 'react';
import { LeaderboardEntry } from '@/types';
import Badge from '@/components/ui/Badge';
import { useProgress } from '@/components/progress/ProgressProvider';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userComment, setUserComment] = useState('');
  const [isEditingComment, setIsEditingComment] = useState(false);
  const { progress } = useProgress();

  useEffect(() => {
    // Load leaderboard from localStorage
    const stored = localStorage.getItem('leaderboard');
    if (stored) {
      setLeaderboard(JSON.parse(stored));
    } else {
      // Initialize with sample data
      setLeaderboard([
        {
          id: 'user1',
          name: 'Alex R.',
          score: 1250,
          rank: 1,
          comment: 'Loving these guides! Saved $200 on my new apartment!',
          avatar: 'AR',
        },
        {
          id: 'user2',
          name: 'Jamie K.',
          score: 980,
          rank: 2,
          comment: 'The tenant rights info helped me get my deposit back.',
          avatar: 'JK',
        },
        {
          id: 'user3',
          name: 'Morgan T.',
          score: 875,
          rank: 3,
          comment: 'Best renting resource I\'ve found. Thank you!',
          avatar: 'MT',
        },
        {
          id: 'user4',
          name: 'Casey L.',
          score: 720,
          rank: 4,
          avatar: 'CL',
        },
        {
          id: 'user5',
          name: 'Jordan P.',
          score: 650,
          rank: 5,
          avatar: 'JP',
        },
      ]);
    }
  }, []);

  const calculateUserScore = () => {
    return (
      progress.articlesRead.length * 10 +
      progress.quizzesCompleted.length * 25 +
      progress.streak * 5 +
      progress.badges.length * 15
    );
  };

  const userScore = calculateUserScore();
  const userRank = leaderboard.filter((entry) => entry.score > userScore).length + 1;
  const isTopThree = userRank <= 3;

  const handleCommentSubmit = () => {
    if (!isTopThree) return;

    // In production, this would be validated server-side
    const filteredComment = userComment.slice(0, 200);
    
    // Update user's entry
    const updatedLeaderboard = [...leaderboard];
    const userIndex = updatedLeaderboard.findIndex((entry) => entry.id === 'current-user');
    
    if (userIndex >= 0) {
      updatedLeaderboard[userIndex].comment = filteredComment;
    } else {
      updatedLeaderboard.push({
        id: 'current-user',
        name: 'You',
        score: userScore,
        rank: userRank,
        comment: filteredComment,
        avatar: 'YOU',
      });
    }

    setLeaderboard(updatedLeaderboard.sort((a, b) => b.score - a.score));
    localStorage.setItem('leaderboard', JSON.stringify(updatedLeaderboard));
    setIsEditingComment(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Leaderboard</h3>

      <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600 mb-1">Your Rank</div>
            <div className="text-3xl font-bold text-primary-700">#{userRank}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Your Score</div>
            <div className="text-3xl font-bold text-primary-700">{userScore}</div>
          </div>
        </div>
        {isTopThree && (
          <div className="mt-4">
            <Badge variant="gold" className="mb-2">Top 3 - You can leave a comment</Badge>
            {!isEditingComment ? (
              <button
                onClick={() => setIsEditingComment(true)}
                className="text-sm text-primary-600 hover:text-primary-700 underline"
              >
                {userComment ? 'Edit your comment' : 'Leave a comment'}
              </button>
            ) : (
              <div className="mt-2">
                <textarea
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  maxLength={200}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Share your success story... (200 chars max)"
                  rows={3}
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">
                    {userComment.length}/200 characters
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() => setIsEditingComment(false)}
                      className="text-sm text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCommentSubmit}
                      className="text-sm bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {leaderboard.slice(0, 10).map((entry, index) => (
          <div
            key={entry.id}
            className={`flex items-start p-4 rounded-lg ${
              entry.rank <= 3
                ? 'bg-gradient-to-r from-accent-50 to-primary-50 border-2 border-accent-200'
                : 'bg-gray-50'
            }`}
          >
            <div className="flex-shrink-0 mr-4">
              {entry.rank === 1 && <Badge variant="gold">1st</Badge>}
              {entry.rank === 2 && <Badge variant="silver">2nd</Badge>}
              {entry.rank === 3 && <Badge variant="bronze">3rd</Badge>}
              {entry.rank > 3 && (
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-semibold text-gray-700">
                  {entry.rank}
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{entry.avatar}</span>
                  <span className="font-semibold text-gray-900">{entry.name}</span>
                </div>
                <span className="font-bold text-primary-600">{entry.score} pts</span>
              </div>
              {entry.comment && (
                <p className="text-sm text-gray-700 italic">"{entry.comment}"</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-2">How to climb the leaderboard:</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>Read articles: <span className="font-semibold">+10 points each</span></li>
          <li>Complete quizzes: <span className="font-semibold">+25 points each</span></li>
          <li>Daily streak: <span className="font-semibold">+5 points per day</span></li>
          <li>Earn badges: <span className="font-semibold">+15 points each</span></li>
        </ul>
      </div>
    </div>
  );
}
