import Link from 'next/link';
import { Header } from '@/components/Header';

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Header />
      <main className="flex-1">
        <div className="px-4 py-20 md:py-32 max-w-screen-2xl mx-auto w-full">
          <div className="container mx-auto flex max-w-[64rem] flex-col items-center gap-4 text-center px-4">
            <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
              DOQMEN For your projects
            </h1>
            <p className="max-w-[42rem] leading-normal text-gray-600 dark:text-gray-400 sm:text-xl sm:leading-8">
              Use DOQMEN to document your web projects and any other project.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs"
                className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3 text-sm font-medium text-white transition-colors hover:opacity-90"
              >
                Getting Started v2.00
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
