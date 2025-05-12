import AdminLayout from "@/components/admin/AdminLayout"
import ProjectForm from "@/components/admin/ProjectForm"

export default function EditProjectPage({ params }: { params: { id: string } }) {
  return (
    <AdminLayout>
      <ProjectForm projectId={params.id} isEditing={true} />
    </AdminLayout>
  )
}
