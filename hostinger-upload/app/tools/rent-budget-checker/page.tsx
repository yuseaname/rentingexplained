'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';

function RentBudgetCheckerContent() {
  const searchParams = useSearchParams();
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [otherExpenses, setOtherExpenses] = useState('');
  const [savingsGoal, setSavingsGoal] = useState('');
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    // Load from URL params if available
    const income = searchParams?.get('income');
    const expenses = searchParams?.get('expenses');
    const savings = searchParams?.get('savings');

    if (income) setMonthlyIncome(income);
    if (expenses) setOtherExpenses(expenses);
    if (savings) setSavingsGoal(savings);

    if (income && expenses && savings) {
      calculate(parseFloat(income), parseFloat(expenses), parseFloat(savings));
    }
  }, [searchParams]);

  const calculate = (income: number, expenses: number, savings: number) => {
    const thirtyPercentRule = income * 0.3;
    const recommendedMax = income - expenses - savings;
    const comfortable = Math.min(thirtyPercentRule, recommendedMax);

    const breakdown = {
      income,
      thirtyPercentRule,
      otherExpenses: expenses,
      savingsGoal: savings,
      recommendedMax: Math.max(0, recommendedMax),
      comfortable: Math.max(0, comfortable),
      remaining: Math.max(0, income - comfortable - expenses - savings),
    };

    setResult(breakdown);
  };

  const handleCalculate = () => {
    const income = parseFloat(monthlyIncome);
    const expenses = parseFloat(otherExpenses || '0');
    const savings = parseFloat(savingsGoal || '0');

    if (!income || income <= 0) {
      alert('Please enter a valid monthly income');
      return;
    }

    calculate(income, expenses, savings);

    // Update URL for sharing
    const url = new URL(window.location.href);
    url.searchParams.set('income', income.toString());
    url.searchParams.set('expenses', expenses.toString());
    url.searchParams.set('savings', savings.toString());
    window.history.replaceState({}, '', url);
  };

  const handleReset = () => {
    setMonthlyIncome('');
    setOtherExpenses('');
    setSavingsGoal('');
    setResult(null);
    window.history.replaceState({}, '', window.location.pathname);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">?? Rent Budget Checker</h1>
          <p className="text-xl text-green-100 max-w-2xl">
            Calculate how much rent you can comfortably afford
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Enter Your Information</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Monthly Gross Income *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="4,000"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">Your total income before taxes</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Other Monthly Expenses
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={otherExpenses}
                    onChange={(e) => setOtherExpenses(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="1,500"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">Car payments, insurance, food, etc.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Monthly Savings Goal
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={savingsGoal}
                    onChange={(e) => setSavingsGoal(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="500"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">How much you want to save each month</p>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleCalculate} variant="primary" className="flex-1">
                  Calculate Budget
                </Button>
                {result && (
                  <Button onClick={handleReset} variant="secondary">
                    Reset
                  </Button>
                )}
              </div>
            </div>
          </div>

          {result && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border-2 border-green-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Rent Budget</h3>
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-green-600 mb-2">
                    ${result.comfortable.toLocaleString()}
                  </div>
                  <p className="text-lg text-gray-700">Recommended maximum monthly rent</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-700">Monthly Gross Income</span>
                    <span className="font-semibold text-gray-900">${result.income.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-700">30% Rule Maximum</span>
                    <span className="font-semibold text-gray-900">${result.thirtyPercentRule.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-700">Other Expenses</span>
                    <span className="font-semibold text-red-600">-${result.otherExpenses.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-700">Savings Goal</span>
                    <span className="font-semibold text-red-600">-${result.savingsGoal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-green-50 px-4 rounded-lg">
                    <span className="font-semibold text-gray-900">Recommended Rent Budget</span>
                    <span className="text-2xl font-bold text-green-600">${result.comfortable.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">Remaining for Discretionary</span>
                    <span className="font-semibold text-gray-900">${result.remaining.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">?? Expert Tips</h3>
                                <ul className="space-y-2 text-gray-700">
                                  <li>• The 30% rule is a guideline – adjust based on your city's cost of living</li>
                                  <li>• Remember to factor in utilities if they're not included</li>
                                  <li>• Budget for renters insurance (typically $15-30/month)</li>
                                  <li>• Consider potential rent increases when planning long-term</li>
                                  <li>• Living below your maximum budget provides a financial cushion</li>
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }

                export default function RentBudgetChecker() {
                  return (
                    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-center">Loading...</div></div>}>
                      <RentBudgetCheckerContent />
                    </Suspense>
                  );
                }
