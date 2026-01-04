'use client';

import { useState } from 'react';
import { Quiz, QuizQuestion } from '@/types';
import { useProgress } from '@/components/progress/ProgressProvider';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';

interface ArticleQuizProps {
  quiz: Quiz;
}

export default function ArticleQuiz({ quiz }: ArticleQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { completeQuiz, earnBadge } = useProgress();

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setShowResults(true);
    completeQuiz(quiz.id);

    const score = calculateScore();
    if (score === quiz.questions.length) {
      earnBadge({
        id: `${quiz.id}-perfect`,
        name: 'Perfect Score',
        description: `Aced the ${quiz.articleSlug} quiz!`,
        icon: 'star',
        requirement: 'Score 100% on a quiz',
        earned: true,
      });
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quiz.questions.length) * 100);

    return (
      <div className="bg-white rounded-xl shadow-md p-8 mt-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Quiz Results</h3>
        <div className="text-center mb-6">
          <div className="text-6xl font-bold text-primary-600 mb-2">
            {percentage}%
          </div>
          <p className="text-xl text-gray-700">
            You got {score} out of {quiz.questions.length} questions correct!
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {quiz.questions.map((question, index) => {
            const userAnswer = selectedAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;

            return (
              <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start mb-2">
                  <span className="mr-3">
                    <Icon
                      name={isCorrect ? 'check' : 'x'}
                      size={24}
                      className={isCorrect ? 'text-green-600' : 'text-red-600'}
                    />
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-2">
                      {question.question}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      Your answer: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                        {question.options[userAnswer]}
                      </span>
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-gray-600 mb-1">
                        Correct answer: <span className="text-green-600">
                          {question.options[question.correctAnswer]}
                        </span>
                      </p>
                    )}
                    <p className="text-sm text-gray-700 mt-2 p-3 bg-blue-50 rounded">
                      Explanation: {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button onClick={resetQuiz} variant="primary">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const hasAnswered = selectedAnswers[currentQuestion] !== undefined;

  return (
    <div className="bg-white rounded-xl shadow-md p-8 mt-12">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-bold text-gray-900">Test Your Knowledge</h3>
          <span className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-xl font-semibold text-gray-900 mb-4">
          {question.question}
        </h4>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedAnswers[currentQuestion] === index
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-primary-600 bg-primary-600'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswers[currentQuestion] === index && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-gray-900">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!hasAnswered}
          variant="primary"
        >
          {currentQuestion === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </Button>
      </div>
    </div>
  );
}
