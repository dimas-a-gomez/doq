import { Header } from "./Header";
import { SidebarLeft } from "./SidebarLeft";
import { getNavStructure } from "@/lib/mdx";

export function Layout({ children }: { children: React.ReactNode }) {
  const navItems = getNavStructure();

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <SidebarLeft navItems={navItems} />
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_250px]">
          <div className="mx-auto w-full min-w-0">{children}</div>
        </main>
      </div>
    </div>
  );
}
