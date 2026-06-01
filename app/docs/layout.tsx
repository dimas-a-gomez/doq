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
      <Suspense fallback={<div className="h-14 w-full border-b border-border bg-background" />}>
        <Header navItems={navItems} />
      </Suspense>
      <div className="container mx-auto px-4 md:px-8 flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 pt-6 lg:pt-8 pb-8">
        <SidebarLeft navItems={navItems} />
        <main className="relative">
          <div className="mx-auto w-full min-w-0">{children}</div>
        </main>
      </div>
    </div>
  );
}
