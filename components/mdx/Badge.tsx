import React from "react";

export function Badge({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'accent' }) {
  const styles = {
    default: 'bg-black/5 dark:bg-white/10 text-foreground/80 border border-black/10 dark:border-white/10',
    accent: 'bg-accent/10 text-accent border border-accent/20',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider align-middle ml-2 ${styles[variant]}`}>
      {children}
    </span>
  );
}
