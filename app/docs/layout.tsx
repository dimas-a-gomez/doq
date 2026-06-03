import { Header } from "@/components/Header";
import { SidebarLeft } from "@/components/SidebarLeft";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col flex-1 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 md:px-8 flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] gap-6 lg:gap-10 pt-8 pb-8">
        <SidebarLeft />
        <main className="relative">{children}</main>
      </div>
    </div>
  );
}
