import Breadcrumbs from "@/app/ui/breadcrumbs";
import CreateForm from "@/app/ui/templates/create-form";

function Page() {
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Templates", href: "/dashboard/templates", active: true },
          { label: "Create", href: `/dashboard/templates/create` },
        ]}
      />
      <CreateForm />
    </div>
  );
}

export default Page;
