"use client";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F0F0F0] dark:bg-[#262626] transition-colors">
      <div className="flex h-14 items-center px-4 md:px-8 max-w-screen-2xl mx-auto w-full justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight">
          DOQMEN
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/docs" className="text-sm font-medium hover:text-accent transition-colors hidden md:block">
            Documentación
          </Link>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            {mounted ? (
              theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />
            ) : (
              <div className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
