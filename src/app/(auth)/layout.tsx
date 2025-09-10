

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="Sidebar">Sidebar</div>
      <div className="flex-1 flex flex-col">
        <div className="NavBar">NavBar</div>
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}