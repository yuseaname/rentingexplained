'use client';

import { useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import Icon from '@/components/ui/Icon';

type Severity = 'high' | 'medium' | 'low';

type Rule = {
  id: string;
  title: string;
  category: string;
  severity: Severity;
  patterns: RegExp[];
  why: string;
  question: string;
};

type ScanMatch = {
  snippet: string;
};

type ScanResult = {
  rule: Rule;
  count: number;
  matches: ScanMatch[];
};

const rules: Rule[] = [
  {
    id: 'as-is',
    title: '“As-is” or waiver of habitability',
    category: 'Repairs & Condition',
    severity: 'high',
    patterns: [/as[- ]is/i, /tenant accepts.*(as is|with all defects)/i, /waive.*(habitability|repairs|rights)/i],
    why: 'As-is language can blur repair responsibilities. Local standards vary.',
    question: 'Which repairs are the landlord’s responsibility, and how are they handled?',
  },
  {
    id: 'entry-without-notice',
    title: 'Entry without notice',
    category: 'Entry & Privacy',
    severity: 'high',
    patterns: [/enter.*without notice/i, /entry.*without notice/i, /landlord may enter at any time/i],
    why: 'Unclear entry terms can reduce privacy and planning time.',
    question: 'What notice will you give before entry (except emergencies)?',
  },
  {
    id: 'legal-fees',
    title: 'One-sided legal fee clause',
    category: 'Disputes & Legal',
    severity: 'high',
    patterns: [/tenant.*(attorney'?s fees|legal fees)/i, /landlord.*(attorney'?s fees|legal fees).*tenant/i],
    why: 'One-sided fee clauses can be costly even when disputes are minor.',
    question: 'Are legal fees mutual if either party prevails?',
  },
  {
    id: 'indemnify',
    title: 'Broad indemnity or hold harmless language',
    category: 'Liability',
    severity: 'high',
    patterns: [/indemnify/i, /hold harmless/i],
    why: 'Broad liability language can shift risk outside your control.',
    question: 'Can you clarify what events I would be responsible for?',
  },
  {
    id: 'nonrefundable-deposit',
    title: 'Non-refundable deposit language',
    category: 'Fees & Deposits',
    severity: 'medium',
    patterns: [/non[- ]refundable deposit/i, /deposit.*non[- ]refundable/i],
    why: 'If it is non-refundable, it should be labeled as a fee.',
    question: 'Is this amount a fee or a refundable deposit? Please clarify in writing.',
  },
  {
    id: 'daily-late-fees',
    title: 'Daily late fees or compounding penalties',
    category: 'Fees & Deposits',
    severity: 'medium',
    patterns: [/daily late fee/i, /late fee.*per day/i, /per[- ]day late fee/i],
    why: 'Daily penalties add up quickly and can be hard to budget for.',
    question: 'Is there a maximum late fee or cap?',
  },
  {
    id: 'repair-shift',
    title: 'Tenant responsible for major repairs',
    category: 'Maintenance',
    severity: 'medium',
    patterns: [/tenant.*responsible for all repairs/i, /tenant.*repairs and maintenance/i, /landlord.*not responsible.*repairs/i],
    why: 'Major repairs are typically handled by the property owner.',
    question: 'Which repairs are tenant vs landlord responsibility?',
  },
  {
    id: 'auto-renew',
    title: 'Automatic renewal or auto-renew language',
    category: 'Renewal & Termination',
    severity: 'low',
    patterns: [/automatic renewal/i, /auto[- ]renew/i],
    why: 'Auto-renew clauses can lock you in if you miss deadlines.',
    question: 'What notice is required to opt out of renewal?',
  },
  {
    id: 'fee-change',
    title: 'Fees can change during the lease',
    category: 'Fees & Deposits',
    severity: 'low',
    patterns: [/fees may change/i, /charges may change/i, /fees.*subject to change/i],
    why: 'Unclear fee changes make monthly costs unpredictable.',
    question: 'Which fees can change and when?',
  },
  {
    id: 'cleaning-replacement',
    title: 'Mandatory cleaning or carpet replacement',
    category: 'Move-Out',
    severity: 'low',
    patterns: [/professional cleaning/i, /carpet cleaning/i, /replace.*carpet/i],
    why: 'Move-out charges should be clear and documented.',
    question: 'What cleaning is required for a full deposit return?',
  },
  {
    id: 'short-notice',
    title: 'Very short notice to vacate',
    category: 'Move-Out',
    severity: 'low',
    patterns: [/notice.*\b(7|10|14)\s*days\b/i],
    why: 'Short windows can be hard to plan around.',
    question: 'What notice period applies to non-renewal or move-out?',
  },
  {
    id: 'utility-fees',
    title: 'Utility admin or pass-through fees',
    category: 'Utilities',
    severity: 'low',
    patterns: [/utility.*(administrative|admin) fee/i, /billing.*administrative fee/i, /utility.*pass[- ]through/i],
    why: 'Small admin fees can add up over time.',
    question: 'Which utility fees are fixed vs variable?',
  },
];

const checklistItems = [
  { item: 'Rent amount, due date, and payment method are clearly stated', category: 'Basic Terms' },
  { item: 'Lease start date, end date, and renewal terms are listed', category: 'Basic Terms' },
  { item: 'Security deposit amount and any fees are disclosed', category: 'Financial' },
  { item: 'Utilities included and excluded are spelled out', category: 'Financial' },
  { item: 'Late fee amount and grace period are clear', category: 'Financial' },
  { item: 'Maintenance and repair responsibilities are assigned', category: 'Maintenance' },
  { item: 'Entry notice rules are described', category: 'Rights' },
  { item: 'Guest, roommate, and subletting rules are defined', category: 'Occupancy' },
  { item: 'Pet policy and related fees (if applicable) are listed', category: 'Occupancy' },
  { item: 'Move-out notice period and return-of-keys steps are stated', category: 'Move-Out' },
];

const questionPrompts = [
  'How do repair requests get submitted and tracked?',
  'What is the notice window for entry?',
  'Which fees can change during the lease term?',
  'What is the process to end, renew, or extend the lease?',
  'Who handles pest control and routine maintenance?',
  'Where should written notices be sent?',
];

const MAX_SNIPPETS = 3;

const normalizeWhitespace = (value: string) => value.replace(/\s+/g, ' ').trim();

const buildSnippet = (text: string, index: number, length: number) => {
  const start = Math.max(0, index - 70);
  const end = Math.min(text.length, index + length + 70);
  const prefix = start > 0 ? '…' : '';
  const suffix = end < text.length ? '…' : '';
  return `${prefix}${normalizeWhitespace(text.slice(start, end))}${suffix}`;
};

const toGlobalRegex = (pattern: RegExp) => {
  const flags = pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`;
  return new RegExp(pattern.source, flags);
};

const scanLease = (text: string): ScanResult[] => {
  const results: ScanResult[] = [];

  rules.forEach((rule) => {
    let count = 0;
    const matches: ScanMatch[] = [];

    rule.patterns.forEach((pattern) => {
      const regex = toGlobalRegex(pattern);
      for (const match of text.matchAll(regex)) {
        if (match.index === undefined) {
          continue;
        }
        count += 1;
        if (matches.length < MAX_SNIPPETS) {
          matches.push({ snippet: buildSnippet(text, match.index, match[0].length) });
        }
        if (matches.length >= MAX_SNIPPETS) {
          break;
        }
      }
    });

    if (count > 0) {
      results.push({ rule, count, matches });
    }
  });

  return results;
};

const getSeverityLabel = (severity: Severity) => {
  if (severity === 'high') {
    return { label: 'High priority', color: 'bg-red-100 text-red-700 border-red-200' };
  }
  if (severity === 'medium') {
    return { label: 'Medium priority', color: 'bg-orange-100 text-orange-700 border-orange-200' };
  }
  return { label: 'Low priority', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
};

export default function LeaseRedFlagScanner() {
  const [inputText, setInputText] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResult[] | null>(null);

  const wordCount = useMemo(() => {
    const trimmed = inputText.trim();
    if (!trimmed) {
      return 0;
    }
    return trimmed.split(/\s+/).length;
  }, [inputText]);

  const handleScan = () => {
    const trimmed = inputText.trim();
    if (!trimmed) {
      setScanResults(null);
      return;
    }
    setScanResults(scanLease(trimmed));
  };

  const handleClear = () => {
    setInputText('');
    setFileName(null);
    setParseError(null);
    setScanResults(null);
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    if (file.type !== 'application/pdf') {
      setParseError('Please upload a PDF file.');
      return;
    }

    setIsParsing(true);
    setParseError(null);
    setFileName(file.name);
    setScanResults(null);

    try {
      const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer, disableWorker: true } as any);
      const pdf = await loadingTask.promise;

      let extracted = '';
      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => (typeof item?.str === 'string' ? item.str : ''))
          .join(' ');
        extracted += `${pageText}\n`;
      }

      if (!extracted.trim()) {
        setParseError('Could not extract text from that PDF. Try copy/paste instead.');
        return;
      }

      setInputText(extracted);
    } catch (error) {
      setParseError('Unable to read that PDF. Try copy/paste instead.');
    } finally {
      setIsParsing(false);
    }
  };

  const summary = useMemo(() => {
    if (!scanResults) {
      return null;
    }
    const totals = { high: 0, medium: 0, low: 0 };
    scanResults.forEach((result) => {
      totals[result.rule.severity] += 1;
    });
    return totals;
  }, [scanResults]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-orange-600 to-red-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Lease Red Flag Scanner</h1>
<picture data-slot-id="00709d673314"><source type="image/webp" srcset="/images/rentingexplained-apptoolslease-red-flag-scannerpagetsx-hero-00709d673314.webp" sizes="(min-width: 960px) 960px, 100vw" /><img src="/images/rentingexplained-apptoolslease-red-flag-scannerpagetsx-hero-00709d673314.png" width="1792" height="1024" loading="eager" decoding="auto" fetchpriority="high" /></picture>
          <p className="text-xl text-orange-100 max-w-2xl">
            Paste your lease or upload a PDF to flag common clauses that deserve a second look.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How This Works</h2>
            <p className="text-gray-600 mb-4">
              This scanner uses simple pattern matching to highlight common lease clauses. It does not interpret
              enforceability, and it is not legal advice. Laws vary by state and city.
            </p>
            <p className="text-gray-600">
              Privacy note: your text stays in your browser. Nothing is uploaded or stored.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Add Your Lease Text</h2>
                <p className="text-gray-600">Paste text or upload a PDF to scan.</p>
              </div>
              <div className="text-sm text-gray-500">
                {wordCount} words • {inputText.length} characters
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label htmlFor="lease-text" className="block text-sm font-semibold text-gray-700 mb-2">
                  Paste lease text
                </label>
                <textarea
                  id="lease-text"
                  className="w-full min-h-[240px] rounded-lg border border-gray-300 p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Paste lease text here..."
                  value={inputText}
                  onChange={(event) => setInputText(event.target.value)}
                />
              </div>

              <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload a PDF</h3>
                  <p className="text-gray-600 mb-4">
                    We extract text locally in your browser. Large files may take a moment.
                  </p>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                  />
                  {fileName && (
                    <p className="text-sm text-gray-500 mt-3">
                      Selected file: <span className="font-medium text-gray-700">{fileName}</span>
                    </p>
                  )}
                  {isParsing && (
                    <p className="text-sm text-orange-700 mt-3">Extracting text from PDF...</p>
                  )}
                  {parseError && (
                    <p className="text-sm text-red-600 mt-3">{parseError}</p>
                  )}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleScan}
                    disabled={!inputText.trim() || isParsing}
                    className="px-5 py-2 rounded-md bg-orange-600 text-white font-semibold disabled:opacity-50"
                  >
                    Scan lease
                  </button>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-5 py-2 rounded-md border border-gray-300 text-gray-700 font-semibold"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Scan Results</h2>
            <p className="text-gray-600 mb-6">
              Results are general signals, not legal conclusions. Review each flagged item in full context.
            </p>

            {!scanResults && (
              <div className="text-gray-600 bg-gray-50 rounded-lg p-4">
                No scan yet. Paste text or upload a PDF, then click “Scan lease.”
              </div>
            )}

            {scanResults && scanResults.length === 0 && (
              <div className="text-gray-700 bg-green-50 rounded-lg p-4">
                No matches found. That does not mean the lease has no issues. Use the checklist below to review it
                manually.
              </div>
            )}

            {scanResults && scanResults.length > 0 && summary && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                    <p className="text-sm text-red-700 font-semibold">High priority</p>
                    <p className="text-2xl font-bold text-red-800">{summary.high}</p>
                  </div>
                  <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
                    <p className="text-sm text-orange-700 font-semibold">Medium priority</p>
                    <p className="text-2xl font-bold text-orange-800">{summary.medium}</p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                    <p className="text-sm text-yellow-700 font-semibold">Low priority</p>
                    <p className="text-2xl font-bold text-yellow-800">{summary.low}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {scanResults.map((result) => {
                    const badge = getSeverityLabel(result.rule.severity);
                    return (
                      <div key={result.rule.id} className="border border-gray-200 rounded-lg p-5">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{result.rule.title}</h3>
                            <p className="text-sm text-gray-500">{result.rule.category}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${badge.color}`}>
                            {badge.label}
                          </span>
                        </div>
                        <p className="text-gray-700 mt-3">{result.rule.why}</p>
                        <p className="text-sm text-gray-600 mt-2">
                          Suggested question: <span className="font-medium">{result.rule.question}</span>
                        </p>
                        <div className="mt-4 space-y-2">
                          {result.matches.map((match, index) => (
                            <div
                              key={`${result.rule.id}-match-${index}`}
                              className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700"
                            >
                              {match.snippet}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Manual Lease Checklist</h2>
            <p className="text-gray-600 mb-6">
              Make sure these essentials are clearly covered in your lease:
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

          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Questions to Ask (Not Advice)</h2>
            <ul className="space-y-3 text-gray-700">
              {questionPrompts.map((question) => (
                <li key={question} className="flex items-start gap-3">
                  <Icon name="info-circle" size={20} className="text-primary-600 mt-1" />
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Good Habits for Any Lease Review</h3>
            <ul className="space-y-2 text-gray-700">
              <li>Read every clause slowly. Take breaks if the lease is long.</li>
              <li>Get promises and changes in writing.</li>
              <li>Keep a dated folder with your lease, photos, and emails.</li>
              <li>Use local tenant resources if you need legal guidance.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
