'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

interface FeeItem {
  name: string;
  amount: number;
  category: string;
}

export default function HiddenFeesEstimator() {
  const [baseRent, setBaseRent] = useState('');
  const [fees, setFees] = useState<FeeItem[]>([]);
  const [customFeeName, setCustomFeeName] = useState('');
  const [customFeeAmount, setCustomFeeAmount] = useState('');

  const commonFees = [
    { name: 'Application Fee', amount: 50, category: 'move-in' },
    { name: 'Administrative Fee', amount: 150, category: 'move-in' },
    { name: 'Security Deposit', amount: 0, category: 'move-in', isVariable: true },
    { name: 'Pet Deposit', amount: 300, category: 'move-in' },
    { name: 'Pet Rent (monthly)', amount: 50, category: 'recurring' },
    { name: 'Parking (monthly)', amount: 75, category: 'recurring' },
    { name: 'Trash/Utilities (monthly)', amount: 40, category: 'recurring' },
    { name: 'Amenity Fee (monthly)', amount: 25, category: 'recurring' },
    { name: 'Move-Out Cleaning Fee', amount: 200, category: 'move-out' },
  ];

  const addFee = (fee: { name: string; amount: number; category: string }) => {
    setFees([...fees, fee]);
  };

  const addCustomFee = () => {
    if (!customFeeName || !customFeeAmount) return;

    addFee({
      name: customFeeName,
      amount: parseFloat(customFeeAmount),
      category: 'custom',
    });

    setCustomFeeName('');
    setCustomFeeAmount('');
  };

  const removeFee = (index: number) => {
    setFees(fees.filter((_, i) => i !== index));
  };

  const calculateTotals = () => {
    const rent = parseFloat(baseRent) || 0;
    const moveInFees = fees.filter((f) => f.category === 'move-in').reduce((sum, f) => sum + f.amount, 0);
    const recurringFees = fees.filter((f) => f.category === 'recurring').reduce((sum, f) => sum + f.amount, 0);
    const moveOutFees = fees.filter((f) => f.category === 'move-out').reduce((sum, f) => sum + f.amount, 0);

    const firstMonthTotal = rent + moveInFees + recurringFees;
    const monthlyTotal = rent + recurringFees;
    const yearlyTotal = monthlyTotal * 12 + moveOutFees;

    return {
      rent,
      moveInFees,
      recurringFees,
      moveOutFees,
      firstMonthTotal,
      monthlyTotal,
      yearlyTotal,
      hiddenCostPercentage: rent > 0 ? ((recurringFees / rent) * 100).toFixed(1) : '0',
    };
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-blue-600 to-cyan-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hidden Fees Estimator</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Discover the true cost of renting with all fees included
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Base Information</h2>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Monthly Base Rent *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={baseRent}
                    onChange={(e) => setBaseRent(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="1,500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Fees</h2>
              <p className="text-sm text-gray-600 mb-4">Click to add fees to your estimate:</p>
              <div className="grid grid-cols-1 gap-2">
                {commonFees.map((fee, index) => (
                  <button
                    key={index}
                    onClick={() => addFee(fee)}
                    className="text-left p-3 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{fee.name}</span>
                      <span className="text-primary-600 font-semibold">
                        {fee.isVariable ? 'Variable' : `$${fee.amount}`}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Custom Fee</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Fee Name
                  </label>
                  <input
                    type="text"
                    value={customFeeName}
                    onChange={(e) => setCustomFeeName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Storage Unit"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">$</span>
                    <input
                      type="number"
                      value={customFeeAmount}
                      onChange={(e) => setCustomFeeAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="100"
                    />
                  </div>
                </div>
                <Button onClick={addCustomFee} variant="primary" className="w-full">
                  Add Fee
                </Button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-8 mb-8 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Fees</h2>

              {fees.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No fees added yet. Select fees from the list or add custom fees.</p>
              ) : (
                <div className="space-y-3 mb-6">
                  {fees.map((fee, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-900">{fee.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-900">${fee.amount.toLocaleString()}</span>
                        <button
                          onClick={() => removeFee(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {baseRent && (
                <div className="border-t border-gray-200 pt-6 space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Base Rent</span>
                        <span className="font-semibold">${totals.rent.toLocaleString()}/mo</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Move-In Fees</span>
                        <span className="font-semibold">${totals.moveInFees.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Monthly Add-Ons</span>
                        <span className="font-semibold">+${totals.recurringFees.toLocaleString()}/mo</span>
                      </div>
                      <div className="flex justify-between border-t border-blue-200 pt-3">
                        <span className="font-bold text-gray-900">True Monthly Cost</span>
                        <span className="text-2xl font-bold text-blue-600">${totals.monthlyTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-1">First Month Total</div>
                      <div className="text-xl font-bold text-gray-900">${totals.firstMonthTotal.toLocaleString()}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-1">Est. Yearly Cost</div>
                      <div className="text-xl font-bold text-gray-900">${totals.yearlyTotal.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-sm font-semibold text-orange-900 mb-1">Hidden Cost Impact</p>
                    <p className="text-2xl font-bold text-orange-700">+{totals.hiddenCostPercentage}%</p>
                    <p className="text-xs text-orange-700 mt-1">above advertised rent</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Money-Saving Tips</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>Negotiate administrative and application fees when possible.</li>
                <li>Ask if utilities are included or if you can choose your own provider.</li>
                <li>Skip amenities you will not use to lower monthly fees.</li>
                <li>Compare renters insurance quotes to save $10-20/month.</li>
                <li>Read your lease closely. Some fees may be optional.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
