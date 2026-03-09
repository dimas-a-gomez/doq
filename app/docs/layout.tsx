import { Header } from "@/components/Header";
import { SidebarLeft } from "@/components/SidebarLeft";
import { getNavStructure } from "@/lib/mdx";
import { Suspense } from "react";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = getNavStructure();

  return (
    <div className="relative flex min-h-screen flex-col bg-white dark:bg-[#0a0a0a]">
      <Suspense fallback={<div className="h-14 w-full border-b border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a]" />}>
        <Header navItems={navItems} />
      </Suspense>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <SidebarLeft navItems={navItems} />
        <main className="relative py-6 lg:gap-10 lg:py-8">
          <div className="mx-auto w-full min-w-0">{children}</div>
        </main>
      </div>
    </div>
  );
}
