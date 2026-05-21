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
    <div className="relative flex flex-col flex-1">
      <Suspense fallback={<div className="h-14 mx-4 md:mx-8 xl:mx-auto max-w-screen-2xl rounded-2xl border border-border bg-[var(--surface)] mt-4" />}>
        <Header navItems={navItems} />
      </Suspense>
      <div className="container mx-auto px-4 md:px-8 flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 mt-6 lg:mt-8 pb-8">
        <SidebarLeft navItems={navItems} />
        <main className="relative">
          <div className="mx-auto w-full min-w-0">{children}</div>
        </main>
      </div>
    </div>
  );
}
