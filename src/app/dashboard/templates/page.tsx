import TemplatesWrapper from "@/app/ui/templates/templates";
import Link from "next/link";
import { Suspense } from "react";

async function Page() {
  return (
    <main>
      <div className="flex justify-between items-center">
        <h1 className="pb-10 font-extrabold text-3xl text-white">Templates</h1>
        <Link
          href="/dashboard/templates/create"
          className="bg-blue-800 h-11 font-bold px-5 rounded-md flex items-center justify-center"
        >
          Create a new
        </Link>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <TemplatesWrapper />
      </Suspense>
    </main>
  );
}

export default Page;
