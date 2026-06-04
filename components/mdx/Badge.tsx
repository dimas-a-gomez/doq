import React from "react";

export function Badge({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'accent' }) {
  const styles = {
    default: 'bg-black/5 dark:bg-white/10 text-foreground/80 border border-black/10 dark:border-white/10',
    accent: 'bg-[#183933] text-[#5DE4c7] border border-[#5DE4c7]/20', // Close to the referenced image
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider align-middle ml-2 ${styles[variant]}`}>
      {children}
    </span>
  );
}
