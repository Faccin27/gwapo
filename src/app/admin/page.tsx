import AdminLayout from "@/components/AdminLayout";

export default function Admin() {
  return (
    <AdminLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p>Welcome to the admin dashboard.</p>
      </div>
    </AdminLayout>
  );
}
