import Sidebar from "./Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#F7F1E8] text-[#231F1A]">
      <div className="flex min-h-screen">
        <Sidebar />
        <section className="flex-1 overflow-auto p-10">{children}</section>
      </div>
    </main>
  );
}
