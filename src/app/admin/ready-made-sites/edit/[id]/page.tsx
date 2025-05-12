import AdminLayout from "@/components/admin/AdminLayout"
import ReadyMadeSiteForm from "@/components/admin/ReadyMadeSiteForm"

export default function EditReadyMadeSitePage({ params }: { params: { id: string } }) {
  return (
    <AdminLayout>
      <ReadyMadeSiteForm siteId={params.id} isEditing={true} />
    </AdminLayout>
  )
}
