"use client";
import { Group } from "@/app/lib/definitions";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function CustomerGroups({ groups }: { groups: Group[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleButtonClick = (id: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("group", id);

    replace(`${pathname}?${params.toString()}`);
  };
  console.log(groups);
  return (
    <div className="flex flex-row gap-1 py-2">
      <Link
        className={clsx(
          "flex min-w-32 items-center justify-center rounded-md  py-2 px-3 text-sm font-medium hover:bg-blue-900 hover:text-white text-white ",
          {
            "bg-blue-500 text-white": searchParams.get("group") === null,
            "bg-slate-900": searchParams.get("group") !== null,
          }
        )}
        href="/dashboard/send-newsletter"
      >
        All
      </Link>
      {groups?.map((group) => {
        return (
          <button
            key={group.id}
            className={clsx(
              "flex w-32 items-center justify-center rounded-md  py-2 px-3 text-sm font-medium hover:bg-blue-900 hover:text-white text-white ",
              {
                "bg-blue-500 text-white":
                  searchParams.get("group") === group.id,
                "bg-slate-900": searchParams.get("group") !== group.id,
              }
            )}
            name={group.id}
            onClick={(e: any) => handleButtonClick(e.target.name)}
            type="button"
          >
            {group.name}
          </button>
        );
      })}
    </div>
  );
}

export default CustomerGroups;
