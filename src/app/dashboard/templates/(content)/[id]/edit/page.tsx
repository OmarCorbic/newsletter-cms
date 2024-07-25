import { fetchTemplateById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import EditForm from "@/app/ui/templates/edit-template-form";

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
      <EditForm template={template} />
    </main>
  );
}

export default Page;
