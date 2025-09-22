import SideBar from "@/components/ui/sidebar/sidebar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex min-h-screen ">
      <div className="w-[200px] h-screen bg-purple-500">
        <SideBar />
      </div>
      <div className="flex-1 flex flex-col">
        <div className=" bg-red-500 h-[100px]">NavBar</div>
        <section className="flex-1 p-4">{children}</section>
      </div>
    </section>
  );
}