import Link from "next/link";
import { Header } from "@/components/Header";
import { ArrowRight, Book, Code, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-16 md:pb-12 md:pt-24 lg:py-32">
          <div className="container mx-auto flex max-w-[64rem] flex-col items-center gap-4 text-center px-4">
            <Link
              href="/docs"
              className="rounded-2xl bg-black/5 dark:bg-white/5 px-4 py-1.5 text-sm font-medium text-accent border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              Follow along on GitHub
            </Link>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black dark:text-white">
              Documentación de <span className="text-accent">MountainB</span>
            </h1>
            <p className="max-w-[42rem] leading-normal text-gray-600 dark:text-gray-400 sm:text-xl sm:leading-8">
              Esta documentación te proporcionará todo lo necesario para instalar, configurar y personalizar tu blog desde cero con MountainB.
            </p>
            <div className="space-x-4 mt-4">
              <Link
                href="/docs"
                className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              >
                Empezar v1.2.0
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-black/10 dark:border-white/10 bg-transparent px-8 py-3 text-sm font-medium text-black dark:text-white shadow-sm transition-colors hover:bg-black/5 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
              >
                GitHub
              </Link>
            </div>
          </div>
        </section>

        <section className="container mx-auto space-y-6 bg-gray-50 dark:bg-[#111] py-16 md:py-24 lg:py-32 border-t border-black/10 dark:border-white/10 px-4">
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#1a1a1a] p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Book className="h-10 w-10 text-accent" />
                <div className="space-y-2">
                  <h3 className="font-bold text-black dark:text-white">
                    MDX Support
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Write your content in Markdown and embed React components
                    seamlessly.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#1a1a1a] p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Code className="h-10 w-10 text-accent" />
                <div className="space-y-2">
                  <h3 className="font-bold text-black dark:text-white">
                    Syntax Highlighting
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Beautiful code blocks powered by rehype-pretty-code and
                    Shiki.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#1a1a1a] p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Zap className="h-10 w-10 text-accent" />
                <div className="space-y-2">
                  <h3 className="font-bold text-black dark:text-white">
                    Fast & Accessible
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Built on Next.js App Router for maximum performance and SEO.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
