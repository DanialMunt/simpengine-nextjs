import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import Header from "@/components/layout/header/header";
import SimpTargetModal from "@/modules/simp-target/components/SimpTargetModal";
import { Toaster } from "@/components/ui/sonner";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <section className="flex min-h-screen bg-background w-full">
        <div className="flex z-10">
          <AppSidebar />
        </div>

        <div className="flex-1 flex flex-col">
          <SidebarTrigger />
          <div className="h-16 ">
            <Header />
          </div>

          <section className="flex-1 p-4">{children}</section>
        </div>
        <SimpTargetModal />

      </section>
    </SidebarProvider>
  );
}
