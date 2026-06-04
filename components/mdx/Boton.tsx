import React from "react";
import Link from "next/link";

export function Boton({ href, children, variant = 'primary' }: { href: string, children: React.ReactNode, variant?: 'primary' | 'secondary' }) {
  const styles = {
    primary: 'bg-accent text-white hover:opacity-90',
    secondary: 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-foreground'
  };

  return (
    <Link href={href} className={`inline-flex items-center px-4 py-2 mt-4 mb-4 rounded-md font-medium text-sm transition-colors !no-underline ${styles[variant]}`}>
      {children}
    </Link>
  );
}
