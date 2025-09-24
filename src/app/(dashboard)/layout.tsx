
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import Header from "@/components/layout/header/header";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      
    <section className="flex min-h-screen bg-secondary w-full">
      <div className="flex bg-blue-500 z-10">

        <AppSidebar />
      </div>
     
      <div className="flex-1 flex flex-col">
       <SidebarTrigger />
        <div className="h-20">
            
          <Header />
        </div>
       
        <section className="flex-1 p-4">{children}</section>
      </div>
    </section>
    </SidebarProvider>
  );
}