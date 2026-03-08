"use client";

import Link from "next/link";
import { Search, Moon, Sun, Menu, Github } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center px-4 md:px-8">
        <div className="flex items-center gap-4">
          <button className="md:hidden text-gray-400 hover:text-white">
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">H</span>
            </div>
            <span className="font-display font-bold text-lg hidden sm:inline-block">
              Hudocs
            </span>
          </Link>
          <div className="hidden sm:flex items-center ml-4 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 font-mono">
            v1.0.0
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="w-full max-w-sm hidden md:flex items-center relative">
            <Search className="absolute left-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full h-9 pl-9 pr-4 rounded-md bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-gray-500"
            />
            <div className="absolute right-2 flex items-center gap-1">
              <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-gray-400">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-white/5"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-white/5"
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
  );
}
