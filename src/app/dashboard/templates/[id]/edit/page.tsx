import { fetchTemplateById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import EditWrapper from "@/app/ui/templates/edit-wrapper";

async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const template = await fetchTemplateById(id);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Templates", href: "/dashboard/templates", active: true },
          { label: "Edit", href: `/dashboard/templates/${id}/edit` },
        ]}
      />
      <EditWrapper template={template} />
    </main>
  );
}

export default Page;
