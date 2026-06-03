import { Header } from "@/components/Header";
import { SidebarLeft } from "@/components/SidebarLeft";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col h-[100dvh] overflow-hidden">
      <Header />
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-10 flex-1 overflow-hidden md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
        <SidebarLeft />
        <main className="relative flex-1 h-full overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
