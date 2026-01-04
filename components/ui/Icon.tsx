import React from 'react';

export const iconNames = [
  'calculator',
  'receipt',
  'document-search',
  'search',
  'book-open',
  'bolt',
  'document-check',
  'document-text',
  'document',
  'envelope',
  'banknote',
  'percent',
  'user',
  'clock',
  'sparkles',
  'check-circle',
  'calendar',
  'trophy',
  'star',
  'check',
  'x',
  'alert-triangle',
  'alert-circle',
  'info-circle',
] as const;

export type IconName = (typeof iconNames)[number];

export const isIconName = (value: string): value is IconName =>
  iconNames.includes(value as IconName);

const icons: Record<IconName, React.ReactNode> = {
  calculator: (
    <>
      <rect x="5" y="2.5" width="14" height="19" rx="2" />
      <rect x="7.5" y="5.5" width="9" height="3" rx="0.75" />
      <circle cx="8.5" cy="12.5" r="1" />
      <circle cx="12" cy="12.5" r="1" />
      <circle cx="15.5" cy="12.5" r="1" />
      <circle cx="8.5" cy="16.5" r="1" />
      <circle cx="12" cy="16.5" r="1" />
      <circle cx="15.5" cy="16.5" r="1" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3h12a1 1 0 011 1v16l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5V4a1 1 0 011-1z" />
      <line x1="8" y1="7" x2="16" y2="7" />
      <line x1="8" y1="11" x2="16" y2="11" />
      <line x1="8" y1="15" x2="13" y2="15" />
    </>
  ),
  'document-search': (
    <>
      <path d="M7 3h7l5 5v12a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
      <polyline points="14 3 14 8 19 8" />
      <circle cx="11" cy="15" r="3" />
      <line x1="13.5" y1="17.5" x2="16" y2="20" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
    </>
  ),
  'book-open': (
    <>
      <rect x="3" y="5" width="8" height="14" rx="1.5" />
      <rect x="13" y="5" width="8" height="14" rx="1.5" />
      <line x1="12" y1="5" x2="12" y2="19" />
    </>
  ),
  bolt: (
    <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
  ),
  'document-check': (
    <>
      <path d="M7 3h7l5 5v12a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
      <polyline points="14 3 14 8 19 8" />
      <polyline points="9 15 11 17 15 13" />
    </>
  ),
  'document-text': (
    <>
      <path d="M7 3h7l5 5v12a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
      <polyline points="14 3 14 8 19 8" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="15" y2="16" />
    </>
  ),
  document: (
    <>
      <path d="M7 3h7l5 5v12a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
      <polyline points="14 3 14 8 19 8" />
    </>
  ),
  envelope: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3 7 12 13 21 7" />
    </>
  ),
  banknote: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <line x1="6" y1="9" x2="6" y2="15" />
      <line x1="18" y1="9" x2="18" y2="15" />
    </>
  ),
  percent: (
    <>
      <line x1="6" y1="18" x2="18" y2="6" />
      <circle cx="7.5" cy="7.5" r="2" />
      <circle cx="16.5" cy="16.5" r="2" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3" />
      <path d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="7" x2="12" y2="12" />
      <line x1="12" y1="12" x2="16" y2="14" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3l1.8 3.6L17 8l-3.2 1.6L12 13l-1.8-3.4L7 8l3.2-1.4L12 3z" />
      <line x1="4" y1="4" x2="4" y2="6" />
      <line x1="3" y1="5" x2="5" y2="5" />
      <line x1="20" y1="15" x2="20" y2="17" />
      <line x1="19" y1="16" x2="21" y2="16" />
    </>
  ),
  'check-circle': (
    <>
      <circle cx="12" cy="12" r="9" />
      <polyline points="8 12.5 11 15.5 16 9.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <line x1="8" y1="3" x2="8" y2="7" />
      <line x1="16" y1="3" x2="16" y2="7" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </>
  ),
  trophy: (
    <>
      <path d="M7 4h10v4a5 5 0 01-10 0V4z" />
      <path d="M7 8H5a3 3 0 003 3" />
      <path d="M17 8h2a3 3 0 01-3 3" />
      <line x1="12" y1="12" x2="12" y2="16" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="10" y1="16" x2="14" y2="16" />
    </>
  ),
  star: (
    <path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.6L12 16l-4.9 2.6.9-5.6-4-3.9 5.5-.8L12 3z" />
  ),
  check: (
    <polyline points="5 13 9 17 19 7" />
  ),
  x: (
    <>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="6" y1="18" x2="18" y2="6" />
    </>
  ),
  'alert-triangle': (
    <>
      <path d="M12 3l9 16H3l9-16z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <circle cx="12" cy="16" r="0.75" />
    </>
  ),
  'alert-circle': (
    <>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="8" x2="12" y2="12.5" />
      <circle cx="12" cy="16" r="0.75" />
    </>
  ),
  'info-circle': (
    <>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="11" x2="12" y2="16" />
      <circle cx="12" cy="8" r="0.75" />
    </>
  ),
};

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  title?: string;
}

export default function Icon({ name, size = 24, className = '', title }: IconProps) {
  const icon = icons[name] ?? icons.sparkles;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title ? <title>{title}</title> : null}
      {icon}
    </svg>
  );
}
