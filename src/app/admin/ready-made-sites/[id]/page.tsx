import AdminLayout from "@/components/admin/AdminLayout"
import ReadyMadeSiteDetail from "@/components/admin/ReadyMadeSiteDetail"

export default function ReadyMadeSiteDetailPage({ params }: { params: { id: string } }) {
  return (
    <AdminLayout>
      <ReadyMadeSiteDetail siteId={params.id} />
    </AdminLayout>
  )
}
