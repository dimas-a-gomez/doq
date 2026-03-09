"use client";

import Link from "next/link";
import { Search, Moon, Sun, Menu, Github, X, Languages } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { NavItem } from "@/lib/mdx";
import { NavGroup } from "./Navigation";

interface HeaderProps {
  navItems?: NavItem[];
}

export function Header({ navItems = [] }: HeaderProps) {
  const [isDark, setIsDark] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const searchParams = useSearchParams();
  const [currentLang, setCurrentLang] = useState("EN");
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: "ES", name: "Español" },
    { code: "EN", name: "English" },
    { code: "PT", name: "Português" },
  ];

  const availableLangs = languages.filter((l) => l.code !== currentLang);

  useEffect(() => {
    // Check cookie for current language
    const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
    if (match && match[1]) {
      const code = match[1].toUpperCase();
      if (["ES", "EN", "PT"].includes(code)) {
        setCurrentLang(code);
      }
    } else {
      // Check URL param as fallback
      const langParam = searchParams.get("lang");
      if (langParam && ["ES", "EN", "PT"].includes(langParam.toUpperCase())) {
        setCurrentLang(langParam.toUpperCase());
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

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

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      router.push(`/docs/${searchResults[0].slug}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleLangChange = (code: string) => {
    setCurrentLang(code);
    setIsLangMenuOpen(false);
    
    const targetLang = code.toLowerCase();
    
    // Set Google Translate cookie
    if (targetLang === 'en') {
      // Clear the cookie to revert to original
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=" + window.location.hostname + "; path=/;";
    } else {
      document.cookie = `googtrans=/en/${targetLang}; path=/`;
      document.cookie = `googtrans=/en/${targetLang}; domain=${window.location.hostname}; path=/`;
    }

    // Update URL with new language
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
    currentParams.set("lang", targetLang);
    
    // Force reload to apply translation
    window.location.href = `${pathname}?${currentParams.toString()}`;
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a]">
        <div className="container mx-auto flex h-14 max-w-screen-2xl items-center px-4 md:px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
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
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors rounded-md hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-1"
                  title="Change Language"
                >
                  <Languages className="h-5 w-5" />
                  <span className="text-xs font-medium uppercase">{currentLang}</span>
                </button>
                {isLangMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsLangMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 rounded-md shadow-lg overflow-hidden z-50">
                      {availableLangs.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLangChange(lang.code)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white dark:bg-[#0a0a0a] shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-black/10 dark:border-white/10">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="h-6 w-6 rounded-md bg-accent flex items-center justify-center">
                  <span className="text-white font-bold text-xs">D</span>
                </div>
                <span className="font-display font-bold text-lg text-black dark:text-white">
                  DOQMEN
                </span>
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-500 hover:text-black dark:hover:text-white rounded-md"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {navItems.length > 0 ? (
                <div className="w-full">
                  {navItems.map((item) => (
                    <NavGroup 
                      key={item.slug} 
                      item={item} 
                      pathname={pathname} 
                      onClick={() => setIsMobileMenuOpen(false)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500 py-4">
                  Navigation is not available here.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {isSearching ? (
                <div className="flex justify-center py-8">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                </div>
              ) : searchResults.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {searchResults.map((result) => (
                    <Link
                      key={result.slug}
                      href={`/docs/${result.slug}`}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="flex flex-col gap-1 rounded-lg p-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      <span className="font-medium text-black dark:text-white">
                        {result.title}
                      </span>
                      {result.description && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                          {result.description}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              ) : searchQuery.trim() ? (
                <p className="text-sm text-center text-gray-500 py-8">
                  No results found for "{searchQuery}"
                </p>
              ) : (
                <p className="text-sm text-center text-gray-500 py-8">
                  Type a search query to find documentation.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
