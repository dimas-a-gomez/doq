import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface DocsFooterProps {
  previous: { title: string; href: string } | null;
  next: { title: string; href: string } | null;
  frontmatter: Record<string, any>;
}

export function DocsFooter({ previous, next, frontmatter }: DocsFooterProps) {
  return (
    <div className="mt-12 pt-8">
      <hr className="mb-8 border-black/10 dark:border-white/10" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {previous ? (
          <Link
            href={previous.href}
            className="flex flex-col items-start gap-1 p-4 rounded-xl border !border-black/10 dark:!border-white/10 hover:!border-black/20 dark:hover:!border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground w-full">
              <ArrowLeft className="w-4 h-4" />
              <span>Página anterior</span>
            </div>
            <span className="font-medium">{previous.title}</span>
          </Link>
        ) : (
          <div /> // Empty div to keep the grid layout aligned to right if only next exists
        )}
        
        {next && (
          <Link
            href={next.href}
            className="flex flex-col items-end gap-1 p-4 rounded-xl border !border-black/10 dark:!border-white/10 hover:!border-black/20 dark:hover:!border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition-colors sm:col-start-2 text-right"
          >
            <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground w-full">
              <span>Página siguiente</span>
              <ArrowRight className="w-4 h-4" />
            </div>
            <span className="font-medium">{next.title}</span>
          </Link>
        )}
      </div>

      <hr className="mb-6 border-black/10 dark:border-white/10" />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm text-muted-foreground pt-2">
        <div>
          {frontmatter.date ? `Editado: ${frontmatter.date}` : null}
        </div>
        <div>
          {frontmatter.author ? `Created by ${frontmatter.author}` : null}
        </div>
      </div>
    </div>
  );
}
