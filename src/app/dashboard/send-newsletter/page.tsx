import {
  fetchFilteredCustomers,
  fetchPresets,
  fetchTemplates,
  fetchUserGroups,
} from "@/app/lib/data";
import DashboardWrapper from "@/app/ui/send-newsletter/dashboard-wrapper";

async function Page({
  searchParams,
}: {
  searchParams: { search: string; group: string };
}) {
  const search = searchParams.search || "";
  const group = searchParams.group || "";

  const [templates, customers, groups, presets] = await Promise.all([
    await fetchTemplates(),
    await fetchFilteredCustomers(search, group),
    await fetchUserGroups(),
    await fetchPresets(),
  ]);

  return (
    <main>
      <h1 className="pb-10 font-extrabold text-3xl text-white">
        Send Newsletter
      </h1>
      <DashboardWrapper
        templates={templates}
        presets={presets}
        groups={groups}
        customers={customers}
      />
    </main>
  );
}

export default Page;
