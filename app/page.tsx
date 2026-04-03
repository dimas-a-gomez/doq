import Link from "next/link";
import { Header } from "@/components/Header";
import { ArrowRight, Book, Code, Zap } from "lucide-react";
import { getNavStructure } from "@/lib/mdx";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";

export default function Home() {
  const navItems = getNavStructure();
  return (
    <div className="flex flex-col bg-white dark:bg-[#0a0a0a] flex-1">
      <Suspense fallback={<div className="h-14 w-full border-b border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a]" />}>
        <Header navItems={navItems} />
      </Suspense>
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
              Build better docs with <span className="text-accent">{siteConfig.name}</span>
            </h1>
            <p className="max-w-[42rem] leading-normal text-gray-600 dark:text-gray-400 sm:text-xl sm:leading-8">
              {siteConfig.description}
            </p>
            <div className="mt-4">
              <Link
                href="/docs"
                className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3 text-sm font-medium text-accent-fg shadow transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="container mx-auto space-y-8 py-16 md:py-24 lg:py-32 px-4">
          <div className="mx-auto flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
              Features
            </h2>
          </div>
          <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-6 flex flex-col items-center text-center h-full shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black/5 dark:bg-white/5">
                <Book className="h-6 w-6 text-accent shrink-0" />
              </div>
              <h3 className="mb-2 font-bold text-black dark:text-white text-lg">
                MDX Support
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Write your content in Markdown and embed React components
                seamlessly.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-6 flex flex-col items-center text-center h-full shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black/5 dark:bg-white/5">
                <Code className="h-6 w-6 text-accent shrink-0" />
              </div>
              <h3 className="mb-2 font-bold text-black dark:text-white text-lg">
                Syntax Highlighting
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Beautiful code blocks powered by rehype-pretty-code and
                Shiki.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-6 flex flex-col items-center text-center h-full shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black/5 dark:bg-white/5">
                <Zap className="h-6 w-6 text-accent shrink-0" />
              </div>
              <h3 className="mb-2 font-bold text-black dark:text-white text-lg">
                Fast & Accessible
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Built on Next.js App Router for maximum performance and SEO.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
