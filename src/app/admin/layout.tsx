import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white text-black selection:bg-black selection:text-white">
      <AdminSidebar />
      <main className="flex-1 min-h-screen overflow-auto relative">
        {children}
      </main>
    </div>
  );
}
