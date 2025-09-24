import SideBar from "@/components/ui/sidebar/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      
    <section className="flex min-h-screen w-full">
      <div className="flex bg-blue-500 z-10">

        <AppSidebar />
      </div>
     
      <div className="flex-1 flex flex-col">
        <div className=" bg-red-500 h-[100px]">NavBar</div>
        <section className="flex-1 p-4">{children}</section>
      </div>
    </section>
    </SidebarProvider>
  );
}