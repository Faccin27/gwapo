import AdminDashboard from "@/components/AdminDashboard";
import AdminLayout from "@/components/AdminLayout";

export default function Admin() {
  return (
    <AdminLayout>
      <div className="space-y-4">
        <AdminDashboard />
      </div>
    </AdminLayout>
  );
}
