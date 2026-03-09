"use client";

import Link from "next/link";
import { Search, Moon, Sun, Menu, Github, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function Header() {
  const [isDark, setIsDark] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Check local storage or system preference on mount
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "light" || (!savedTheme && !prefersDark)) {
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // For now, just navigate to the docs page. In a real app, you'd have a search results page
      // or filter the sidebar.
      router.push(`/docs`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a]">
        <div className="container mx-auto flex h-14 max-w-screen-2xl items-center px-4 md:px-8">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white">
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/" className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-accent flex items-center justify-center">
                <span className="text-white font-bold text-xs">D</span>
              </div>
              <span className="font-display font-bold text-lg hidden sm:inline-block text-black dark:text-white">
                DOQMEN
              </span>
            </Link>
            <div className="hidden sm:flex items-center ml-4 px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-gray-500 dark:text-gray-400 font-mono">
              v1.0.0
            </div>
          </div>

          <div className="flex flex-1 items-center justify-end gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors rounded-md hover:bg-black/5 dark:hover:bg-white/5"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </button>

            <nav className="flex items-center gap-2">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors rounded-md hover:bg-black/5 dark:hover:bg-white/5"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors rounded-md hover:bg-black/5 dark:hover:bg-white/5"
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle theme</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-32 px-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsSearchOpen(false)}
          />
          <div className="relative w-full max-w-2xl overflow-hidden rounded-xl bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 shadow-2xl">
            <form
              onSubmit={handleSearch}
              className="flex items-center border-b border-black/10 dark:border-white/10 px-4"
            >
              <Search className="h-5 w-5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documentation..."
                className="flex-1 h-14 bg-transparent px-4 text-black dark:text-white placeholder:text-gray-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-gray-400 hover:text-black dark:hover:text-white rounded-md"
              >
                <X className="h-5 w-5" />
              </button>
            </form>
            <div className="p-4">
              <p className="text-sm text-center text-gray-500">
                Type a search query and press Enter to search.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
