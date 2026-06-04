import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function EnlacePagina({ href, title, description }: { href: string, title: string, description?: string }) {
  return (
    <Link href={href} className="group flex flex-col p-4 my-4 rounded-xl border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition-colors !no-underline">
      <div className="flex items-center justify-between font-bold text-foreground mb-1">
        <span>{title}</span>
        <ArrowRight className="h-4 w-4 text-foreground/40 group-hover:text-foreground transition-colors" />
      </div>
      {description && <div className="text-sm text-foreground/60">{description}</div>}
    </Link>
  );
}
