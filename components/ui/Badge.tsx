interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'gold' | 'silver' | 'bronze' | 'primary' | 'secondary';
  className?: string;
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium';
  
  const variantStyles = {
    default: 'bg-gray-100 text-gray-700 ring-1 ring-gray-300',
    gold: 'bg-accent-100 text-accent-800 ring-1 ring-accent-400',
    silver: 'bg-gray-200 text-gray-700 ring-1 ring-gray-400',
    bronze: 'bg-orange-100 text-orange-700 ring-1 ring-orange-400',
    primary: 'bg-primary-100 text-primary-800 ring-1 ring-primary-400',
    secondary: 'bg-blue-100 text-blue-800 ring-1 ring-blue-400',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
