import React from 'react';
import clsx from 'clsx';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'cyan' | 'violet' | 'neutral';
  interactive?: boolean;
  cutCorners?: boolean;
}

export function GlassPanel({
  children,
  className,
  variant = 'cyan',
  interactive = false,
  cutCorners = false,
  ...props
}: GlassPanelProps) {
  const borderColors = {
    cyan: 'border-cyber-cyan/20 hover:border-cyber-cyan/50',
    violet: 'border-cyber-violet/20 hover:border-cyber-violet/50',
    neutral: 'border-slate-800/80 hover:border-slate-700',
  };

  const glowShadows = {
    cyan: 'hover:shadow-[0_0_25px_-5px_rgba(0,229,255,0.25)]',
    violet: 'hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.25)]',
    neutral: 'hover:shadow-lg',
  };

  return (
    <div
      className={clsx(
        'relative bg-cyber-surface/80 backdrop-blur-md border transition-all duration-300',
        borderColors[variant],
        interactive && 'cursor-pointer transform hover:-translate-y-1',
        interactive && glowShadows[variant],
        cutCorners ? 'cyber-corner' : 'rounded-xl',
        className
      )}
      {...props}
    >
      {/* Subtle top neon accent line */}
      <div
        className={clsx(
          'absolute top-0 left-0 right-0 h-[1px]',
          variant === 'cyan' && 'bg-gradient-to-r from-transparent via-cyber-cyan/40 to-transparent',
          variant === 'violet' && 'bg-gradient-to-r from-transparent via-cyber-violet/40 to-transparent',
          variant === 'neutral' && 'bg-gradient-to-r from-transparent via-slate-700/50 to-transparent'
        )}
      />
      {children}
    </div>
  );
}
