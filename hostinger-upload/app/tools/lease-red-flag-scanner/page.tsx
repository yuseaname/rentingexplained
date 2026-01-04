'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

interface RedFlag {
  category: string;
  issue: string;
  severity: 'high' | 'medium' | 'low';
  explanation: string;
}

export default function LeaseRedFlagScanner() {
  const [leaseText, setLeaseText] = useState('');
  const [scanned, setScanned] = useState(false);
  const [redFlags, setRedFlags] = useState<RedFlag[]>([]);

  const flagPatterns = [
    {
      keywords: ['waive', 'waiving', 'forfeit'],
      category: 'Rights Waiver',
      issue: 'Potential waiver of tenant rights',
      severity: 'high' as const,
      explanation: 'Language suggesting you waive legal rights should be reviewed by an attorney. Many rights cannot be legally waived.',
    },
    {
      keywords: ['enter without notice', 'enter at any time', 'access at any time'],
      category: 'Privacy Rights',
      issue: 'Unrestricted landlord entry',
      severity: 'high' as const,
      explanation: 'Landlords typically must provide 24-48 hours notice before entering except in emergencies.',
    },
    {
      keywords: ['non-refundable deposit', 'non refundable fee'],
      category: 'Security Deposit',
      issue: 'Non-refundable deposit clause',
      severity: 'medium' as const,
      explanation: 'Check if this is legal in your jurisdiction. True security deposits are typically refundable minus damages.',
    },
    {
      keywords: ['automatic renewal', 'auto-renew'],
      category: 'Lease Terms',
      issue: 'Automatic lease renewal',
      severity: 'medium' as const,
      explanation: 'Automatic renewals can lock you into another term. Make sure you understand the notice period required to cancel.',
    },
    {
      keywords: ['hold harmless', 'indemnify', 'indemnification'],
      category: 'Liability',
      issue: 'Broad liability/indemnification clause',
      severity: 'high' as const,
      explanation: 'These clauses may make you responsible for issues beyond your control. Have an attorney review.',
    },
    {
      keywords: ['no guests', 'visitors prohibited'],
      category: 'Occupancy',
      issue: 'Restrictive guest policy',
      severity: 'medium' as const,
      explanation: 'Overly restrictive guest policies may be unenforceable and unreasonable.',
    },
    {
      keywords: ['attorney fees', 'attorneys fees', 'legal fees'],
      category: 'Legal Costs',
      issue: 'Tenant pays all legal fees',
      severity: 'medium' as const,
      explanation: 'One-sided attorney fee clauses may make you pay landlord\'s legal costs even if they\'re in the wrong.',
    },
    {
      keywords: ['pest control', 'pest responsibility'],
      category: 'Maintenance',
      issue: 'Tenant responsible for pest control',
      severity: 'low' as const,
      explanation: 'In many jurisdictions, landlords are responsible for pest control. Verify local laws.',
    },
  ];

  const checklistItems = [
    { item: 'Rent amount and due date clearly stated', category: 'Basic Terms' },
    { item: 'Security deposit amount and return conditions', category: 'Financial' },
    { item: 'Lease duration and renewal terms', category: 'Basic Terms' },
    { item: 'Notice period for moving out', category: 'Basic Terms' },
    { item: 'Maintenance and repair responsibilities', category: 'Maintenance' },
    { item: 'Utilities included/excluded', category: 'Financial' },
    { item: 'Pet policy (if applicable)', category: 'Occupancy' },
    { item: 'Subletting and roommate policies', category: 'Occupancy' },
    { item: 'Entry notice requirements', category: 'Rights' },
    { item: 'Late fee amount and policy', category: 'Financial' },
  ];

  const scanLease = () => {
    const text = leaseText.toLowerCase();
    const foundFlags: RedFlag[] = [];

    flagPatterns.forEach((pattern) => {
      const found = pattern.keywords.some((keyword) => text.includes(keyword.toLowerCase()));
      if (found) {
        foundFlags.push({
          category: pattern.category,
          issue: pattern.issue,
          severity: pattern.severity,
          explanation: pattern.explanation,
        });
      }
    });

    setRedFlags(foundFlags);
    setScanned(true);
  };

  const reset = () => {
    setLeaseText('');
    setScanned(false);
    setRedFlags([]);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-900';
      case 'medium':
        return 'bg-orange-50 border-orange-200 text-orange-900';
      case 'low':
        return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-900';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return '??';
      case 'medium':
        return '??';
      case 'low':
        return '?';
      default:
        return '??';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-orange-600 to-red-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">?? Lease Red Flag Scanner</h1>
          <p className="text-xl text-orange-100 max-w-2xl">
            Identify potential issues in your lease agreement
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Paste Your Lease</h2>
            <p className="text-gray-600 mb-6">
              Copy and paste your lease agreement text below. Don't worry � nothing is stored or transmitted. All scanning happens in your browser.
            </p>
            <textarea
              value={leaseText}
              onChange={(e) => setLeaseText(e.target.value)}
              className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
              placeholder="Paste your lease agreement here..."
            />
            <div className="flex gap-4 mt-6">
              <Button onClick={scanLease} variant="primary" disabled={!leaseText.trim()}>
                Scan for Red Flags
              </Button>
              {scanned && (
                <Button onClick={reset} variant="secondary">
                  Clear & Start Over
                </Button>
              )}
            </div>
          </div>

          {scanned && (
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Scan Results</h2>

                {redFlags.length === 0 ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <div className="text-5xl mb-3">?</div>
                    <h3 className="text-xl font-semibold text-green-900 mb-2">No Major Red Flags Detected</h3>
                    <p className="text-green-700">
                      We didn't find obvious red flags in your lease, but this scan is not a substitute for legal advice. Always read your lease carefully and consult an attorney if unsure.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="text-orange-900">
                        <strong>Found {redFlags.length} potential issue{redFlags.length > 1 ? 's' : ''}.</strong> Review these carefully and consider consulting an attorney before signing.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {redFlags.map((flag, index) => (
                        <div key={index} className={`border-2 rounded-lg p-6 ${getSeverityColor(flag.severity)}`}>
                          <div className="flex items-start">
                            <span className="text-3xl mr-4">{getSeverityIcon(flag.severity)}</span>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-bold">{flag.issue}</h3>
                                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase">
                                  {flag.severity} priority
                                </span>
                              </div>
                              <p className="text-sm mb-2">
                                <strong>Category:</strong> {flag.category}
                              </p>
                              <p className="text-sm">
                                <strong>Why this matters:</strong> {flag.explanation}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Lease Review Checklist</h2>
                <p className="text-gray-600 mb-6">
                  Make sure these essential items are clearly addressed in your lease:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {checklistItems.map((item, index) => (
                    <div key={index} className="flex items-start p-3 border border-gray-200 rounded-lg">
                      <input
                        type="checkbox"
                        className="mt-1 mr-3 w-5 h-5 text-primary-600"
                        id={`checklist-${index}`}
                      />
                      <label htmlFor={`checklist-${index}`} className="flex-1 cursor-pointer">
                        <div className="font-medium text-gray-900">{item.item}</div>
                        <div className="text-xs text-gray-500">{item.category}</div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">?? Next Steps</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>� Don't rush to sign � take time to read every clause carefully</li>
                  <li>� Ask questions about anything you don't understand</li>
                  <li>� Get everything in writing, including verbal promises</li>
                  <li>� Consider having a tenant rights attorney review before signing</li>
                  <li>� Keep a copy of your signed lease in a safe place</li>
                  <li>� Document the condition of the unit with photos before moving in</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
