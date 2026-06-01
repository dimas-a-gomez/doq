"use client";

import Link from "next/link";
import { Search, Moon, Sun, Menu, Github, X, Languages } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { NavItem } from "@/lib/mdx";
import { NavGroup } from "./Navigation";
import { siteConfig } from "@/config/site";
import { Logo } from "./Logo";

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
      <header className="sticky top-0 z-50 w-full border-b border-border bg-[var(--surface)]">
        <div className="flex h-14 items-center px-4 md:px-8 max-w-screen-2xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </button>
            <Link href="/" className="flex items-center gap-2">
              <Logo className="h-6 w-6 text-accent" />
              <span className="font-display font-bold text-lg hidden sm:inline-block text-black dark:text-white">
                {siteConfig.name}
              </span>
            </Link>
            <div className="hidden sm:flex items-center ml-4 px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-gray-500 dark:text-gray-400 font-mono">
              v1.2.2
            </div>
          </div>

          <div className="flex flex-1 items-center justify-end gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors rounded-md hover:bg-black/5 dark:hover:bg-white/5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="none" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path fillRule="evenodd" clipRule="evenodd" d="M11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L21 22.4142L22.4142 21L18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2ZM4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11Z" fill="currentColor"/>
              </svg>
              <span className="sr-only">Search</span>
            </button>

            <nav className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors rounded-md hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-1"
                  title="Change Language"
                >
                  <svg width="20" height="22" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                    <path d="M17.4639 11.6504C18.5439 11.6504 19.4142 11.8416 20.0742 12.2256C20.7461 12.6095 21.2135 13.2218 21.4775 14.0615L19.2822 14.8359C19.1382 14.2959 18.9097 13.9237 18.5977 13.7197C18.2858 13.5159 17.902 13.4141 17.4463 13.4141C17.0624 13.4141 16.7441 13.5037 16.4922 13.6836C16.2403 13.8515 16.1143 14.0859 16.1143 14.3857C16.1143 14.7217 16.2579 14.9923 16.5459 15.1963C16.8459 15.4002 17.3918 15.5804 18.1836 15.7363C19.3234 15.9643 20.1697 16.3479 20.7217 16.8877C21.2736 17.4156 21.5497 18.1239 21.5498 19.0117C21.5498 20.0437 21.2019 20.8478 20.5059 21.4238C19.8099 21.9878 18.8378 22.2695 17.5898 22.2695C16.426 22.2695 15.478 22.0362 14.7461 21.5684C14.0141 21.1004 13.5458 20.4221 13.3418 19.5342L15.6104 18.9219C15.7063 19.4738 15.934 19.8759 16.2939 20.1279C16.6539 20.3799 17.0924 20.5059 17.6084 20.5059C18.0522 20.5058 18.4126 20.392 18.6885 20.1641C18.9763 19.9241 19.1201 19.6534 19.1201 19.3535C19.12 18.9458 18.9641 18.6339 18.6523 18.418C18.3404 18.202 17.746 18.0163 16.8701 17.8604C15.8141 17.6804 15.01 17.3137 14.458 16.7617C13.9181 16.1977 13.6484 15.5139 13.6484 14.71C13.6484 14.0981 13.81 13.5643 14.1338 13.1084C14.4577 12.6405 14.9019 12.2803 15.4658 12.0283C16.0418 11.7763 16.7079 11.6504 17.4639 11.6504ZM9.5 7H16V9H13V13C13 13.7417 12.7971 14.4358 12.4453 15.0312L14.4141 17L13 18.4141L11.0312 16.4453C10.4358 16.7971 9.74175 17 9 17H3V15H9C9.17857 15 9.35088 14.9736 9.51562 14.9297L5.58594 11L7 9.58594L10.9297 13.5156C10.9736 13.3509 11 13.1786 11 13V9H2V7H7.5V5H9.5V7Z" fill="currentColor"/>
                  </svg>
                  <span className="text-xs font-medium uppercase">{currentLang}</span>
                </button>
                {isLangMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsLangMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-32 bg-[var(--surface)] border border-border rounded-md shadow-lg overflow-hidden z-50">
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="none" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M11 19.75V22H13V19.75H11Z" fill="currentColor"/>
                    <path d="M11 2V4.25H13V2H11Z" fill="currentColor"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12ZM12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8Z" fill="currentColor"/>
                    <path d="M2 11H4.25V13H2V11Z" fill="currentColor"/>
                    <path d="M19.75 11H22V13H19.75V11Z" fill="currentColor"/>
                    <path d="M5.63602 4.2218L7.22701 5.81279L5.81279 7.227L4.2218 5.63601L5.63602 4.2218Z" fill="currentColor"/>
                    <path d="M18.1872 16.773L19.7782 18.364L18.364 19.7782L16.773 18.1872L18.1872 16.773Z" fill="currentColor"/>
                    <path d="M5.81279 16.773L4.2218 18.364L5.63601 19.7782L7.227 18.1872L5.81279 16.773Z" fill="currentColor"/>
                    <path d="M18.364 4.2218L16.773 5.81279L18.1872 7.227L19.7782 5.63601L18.364 4.2218Z" fill="currentColor"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="none" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C14.5007 19 16.6951 17.6887 17.9331 15.7163C17.122 16.1218 16.2066 16.35 15.2375 16.35C11.9031 16.35 9.2 13.6469 9.2 10.3125C9.2 8.02376 10.4735 6.03246 12.3506 5.00861C12.2345 5.00289 12.1176 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C13.9337 3 15.7276 3.61095 17.1955 4.65026L16.3442 6.4283C15.9937 6.32866 15.6227 6.275 15.2375 6.275C13.0077 6.275 11.2 8.08265 11.2 10.3125C11.2 12.5423 13.0077 14.35 15.2375 14.35C17.0038 14.35 18.5076 13.2152 19.0547 11.632L20.9999 11.9536C21 11.969 21 11.9845 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" fill="currentColor"/>
                  </svg>
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
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[var(--surface)] shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-black/10 dark:border-white/10">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <Logo className="h-6 w-6 text-accent" />
                <span className="font-display font-bold text-lg text-black dark:text-white">
                  {siteConfig.name}
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
          <div className="relative w-full max-w-2xl overflow-hidden rounded-xl bg-[var(--surface)] border border-border shadow-2xl">
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
                  No results found for &quot;{searchQuery}&quot;
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
