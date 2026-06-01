import Link from "next/link";
import { Header } from "@/components/Header";
import { ArrowRight } from "lucide-react";
import { getNavStructure } from "@/lib/mdx";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";

export default function Home() {
  const navItems = getNavStructure();
  return (
    <div className="flex flex-col flex-1">
      <Suspense fallback={<div className="h-14 w-full border-b border-border bg-background" />}>
        <Header navItems={navItems} />
      </Suspense>
      <main className="flex-1">
        <div className="px-4 py-20 md:py-32 max-w-screen-2xl mx-auto w-full">
          <div className="container mx-auto flex max-w-[64rem] flex-col items-center gap-4 text-center px-4">
            <Link
              href="/docs"
              className="rounded-full bg-black/5 dark:bg-white/5 px-4 py-1.5 text-sm font-medium text-accent hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              Follow along on GitHub
            </Link>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black dark:text-white">
              Build better docs with <span className="text-accent">{siteConfig.name}</span>
            </h1>
            <p className="max-w-[42rem] leading-normal text-gray-600 dark:text-gray-400 sm:text-xl sm:leading-8">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs"
                className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3 text-sm font-medium text-accent-fg shadow transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <section className="container mx-auto space-y-8 py-16 md:py-24 px-4 border-t border-border">
          <div className="mx-auto flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
              Features
            </h2>
          </div>
          <div className="mx-auto grid justify-center gap-8 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-12">
            <div className="flex flex-col items-start text-left">
              <div className="mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="none" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-accent shrink-0">
                  <path d="M8 6H16V8H8V6Z" fill="currentColor"/>
                  <path d="M16 10H8V12H16V10Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M20 2H4V22H20V2ZM6 16H18V4H6V16ZM6 18V20H18V18H6Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="mb-2 font-bold text-black dark:text-white text-xl">
                MDX Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Write your content in Markdown and embed React components
                seamlessly.
              </p>
            </div>
            <div className="flex flex-col items-start text-left">
              <div className="mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="none" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-accent shrink-0">
                  <path d="M2.58575 12L9.24997 18.6642L10.6642 17.25L5.41418 12L10.6642 6.75001L9.24997 5.33579L2.58575 12Z" fill="currentColor"/>
                  <path d="M18.5858 12L13.3358 6.75001L14.75 5.33579L21.4142 12L14.75 18.6642L13.3358 17.25L18.5858 12Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="mb-2 font-bold text-black dark:text-white text-xl">
                Syntax Highlighting
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Beautiful code blocks powered by rehype-pretty-code and
                Shiki.
              </p>
            </div>
            <div className="flex flex-col items-start text-left">
              <div className="mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="none" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-accent shrink-0">
                  <path fillRule="evenodd" clipRule="evenodd" d="M14.6246 1.14923V9.00001H20.4553L9.37464 22.8508V15H3.54401L14.6246 1.14923ZM7.70526 13H11.3746V17.1492L16.294 11H12.6246V6.85079L7.70526 13Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="mb-2 font-bold text-black dark:text-white text-xl">
                Fast & Accessible
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Built on Next.js App Router for maximum performance and SEO.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
