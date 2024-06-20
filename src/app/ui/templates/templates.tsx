import { fetchTemplates } from "@/app/lib/data";
import { TemplateCard } from "./template-card";

export async function TemplatesWrapper() {
  const templates = await fetchTemplates();

  return (
    <div>
      {templates?.length < 1 ? (
        <div>No templates yet.</div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-5 ">
          {templates.map((template) => {
            return <TemplateCard key={template.id} template={template} />;
          })}
        </div>
      )}
    </div>
  );
}

export default TemplatesWrapper;
