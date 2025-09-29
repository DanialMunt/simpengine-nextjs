export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex items-center justify-center min-h-screen ">
      {children}
    </section>
  );
}