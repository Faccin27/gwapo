import AdminLayout from "@/components/admin/AdminLayout"
import ProjectDetail from "@/components/admin/ProjectDetail"

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return (
    <AdminLayout>
      <ProjectDetail projectId={params.id} />
    </AdminLayout>
  )
}
