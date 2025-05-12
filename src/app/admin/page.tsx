import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminLayout from "@/components/admin/AdminLayout";

export default function Admin() {
  return (
    <AdminLayout>
      <div className="space-y-4">
        <AdminDashboard />
      </div>
    </AdminLayout>
  );
}
