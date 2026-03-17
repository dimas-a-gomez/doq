import Link from "next/link";
import { Header } from "@/components/Header";
import { ArrowRight, Book, Code, Zap } from "lucide-react";
import { getNavStructure } from "@/lib/mdx";
import { Suspense } from "react";

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
              Official MountainB <span className="text-accent">Documentation</span>
            </h1>
            <p className="max-w-[42rem] leading-normal text-gray-600 dark:text-gray-400 sm:text-xl sm:leading-8">
              Official documentation for the MountainB Blogger template. Find essential sections and shortcodes to give your site a better style.
            </p>
            <div className="mt-4">
              <Link
                href="/docs"
                className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              >
                Get Started v1.2.1
                <ArrowRight className="ml-2 h-4 w-4" />
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
                    Modern Interface
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    A visual system focused on usability that provides smooth navigation on any device, maintaining a minimalist and professional aesthetic.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#1a1a1a] p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Code className="h-10 w-10 text-accent" />
                <div className="space-y-2">
                  <h3 className="font-bold text-black dark:text-white">
                    Shortcodes
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    A comprehensive library of custom components, such as syntax-highlighted code blocks and dynamic alerts, designed to enhance the reading experience.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#1a1a1a] p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Zap className="h-10 w-10 text-accent" />
                <div className="space-y-2">
                  <h3 className="font-bold text-black dark:text-white">
                    Efficient Structure
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Optimized code based on the Hamlet architecture to ensure strong SEO from the very beginning.
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
