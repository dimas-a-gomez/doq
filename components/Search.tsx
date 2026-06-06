"use client";

import { useState, useEffect } from "react";
import { Search as SearchIcon, Command } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDocsConfig } from "@/config/docs";

export function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  
  if (!pathname.startsWith("/docs")) {
    return null;
  }

  const docs = getDocsConfig();
  
  const allItems = docs.flatMap(group => 
    group.items.map(item => ({ ...item, groupTitle: group.title }))
  );

  const filteredItems = query
    ? allItems.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    : allItems;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 p-2 md:px-3 md:py-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors border max-md:border-none border-black/10 dark:border-white/10 text-foreground/60 w-full md:w-64 max-w-sm mr-2"
      >
        <SearchIcon className="h-4 w-4" />
        <span className="text-sm font-medium hidden md:inline-block">Buscar configuración...</span>
        <span className="text-xs font-mono bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded-sm ml-auto hidden md:flex items-center gap-0.5"><Command className="w-3 h-3" />K</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[20vh] bg-black/50 backdrop-blur-sm px-4">
          <div 
            className="fixed inset-0"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="w-full max-w-lg bg-[#F0F0F0] dark:bg-[#262626] rounded-xl shadow-2xl relative overflow-hidden flex flex-col border border-black/10 dark:border-white/10">
            <div className="flex items-center border-b border-black/10 dark:border-white/10 px-4">
              <SearchIcon className="h-5 w-5 text-foreground/50 mr-2 shrink-0" />
              <input
                autoFocus
                placeholder="Buscar en la documentación..."
                className="w-full bg-transparent py-4 outline-none text-foreground"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button 
                className="text-xs bg-black/5 dark:bg-white/10 px-2 py-1 rounded-md text-foreground/60 hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                ESC
              </button>
            </div>
            
            <div className="max-h-[300px] sm:max-h-[400px] overflow-y-auto p-2">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-foreground/50 text-sm">
                  No se encontraron resultados.
                </div>
              ) : (
                <ul className="space-y-1">
                  {filteredItems.map((item) => (
                    <li key={item.href}>
                      <Link 
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex flex-col p-3 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        <span className="text-sm font-medium">{item.title}</span>
                        <span className="text-xs text-foreground/50">{item.groupTitle}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
