import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="w-full border-t border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a] py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Copyright 2026 - {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
