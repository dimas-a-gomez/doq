import React from "react";

export type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'danger' | 'purple';
export type BadgeSize = 'sm' | 'md';

export const badgeStyles: Record<BadgeVariant, string> = {
  default: 'bg-black/5 dark:bg-white/10 text-foreground/80 border border-black/10 dark:border-white/10',
  accent: 'bg-accent/10 text-accent border border-accent/20',
  success: 'bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20',
  warning: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border border-orange-500/20',
  danger: 'bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20',
  purple: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-[10px]',
  md: 'px-2 py-0.5 text-xs',
};

export function Badge({ children, variant = 'default', size = 'md' }: { children: React.ReactNode, variant?: BadgeVariant, size?: BadgeSize }) {
  return (
    <span className={`inline-flex items-center rounded-md font-bold uppercase tracking-wider align-middle ml-2 ${sizeStyles[size]} ${badgeStyles[variant]}`}>
      {children}
    </span>
  );
}

