"use client";
import { Group } from "@/app/lib/definitions";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { RiArrowRightDoubleLine } from "react-icons/ri";
import { LuUndo2 } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { ImUserPlus } from "react-icons/im";

import Link from "next/link";
import SingleGroup from "./group";
import CreateGroupForm from "./create-group-form";

function CustomerGroups({ groups }: { groups: Group[] }) {
  const [showRemainingGroups, setShowRemainingGroups] = useState(false);
  const [newGroup, setNewGroup] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleGroupClick = (id: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("group", id);

    replace(`${pathname}?${params.toString()}`);
  };

  // useEffect(() => {
  //   const hideGroups = () => {
  //     setShowRemainingGroups(false);
  //   };
  //   document.addEventListener("click", hideGroups);

  //   return () => document.removeEventListener("click", hideGroups);
  // });

  return (
    <div className="flex-col">
      <div className="py-2 flex items-center gap-5">
        <span className="text-lg">Your groups</span>{" "}
        <div className="flex items-center justify-start flex-grow gap-2">
          {newGroup && <CreateGroupForm />}
          <button
            onClick={() => setNewGroup((prev) => !prev)}
            type="button"
            className="bg-blue-800 w-8 h-8 mr-auto rounded-full flex items-center justify-center"
          >
            {newGroup ? <LuUndo2 /> : <IoMdAdd />}
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-1 py-2 flex-wrap">
        <div className="flex gap-1 relative flex-wrap">
          <Link
            className={clsx(
              "relative flex items-center justify-center rounded-md h-10 text-sm font-medium hover:bg-blue-900 hover:text-white w-32 text-white group ",
              {
                "bg-blue-500 text-white": searchParams.get("group") === null,
                "bg-slate-900": searchParams.get("group") !== null,
              }
            )}
            href="/dashboard/send-newsletter"
          >
            All
          </Link>
          {groups?.length > 3 ? (
            <>
              <SingleGroup
                group={groups[0]}
                onClick={handleGroupClick}
                active={searchParams.get("group") === groups[0].id}
              />
              <SingleGroup
                group={groups[1]}
                onClick={handleGroupClick}
                active={searchParams.get("group") === groups[1].id}
              />
              <SingleGroup
                group={groups[2]}
                onClick={handleGroupClick}
                active={searchParams.get("group") === groups[2].id}
              />
              <button
                onClick={() => setShowRemainingGroups((prev) => !prev)}
                className="bg-slate-900 px-3 text-2xl rounded-md flex items-center justify-center"
              >
                <RiArrowRightDoubleLine />
              </button>
              <div
                className={clsx(
                  "absolute flex-col gap-2 rounded-md top-full right-0 py-1 px-2 bg-blue-950",
                  {
                    hidden: !showRemainingGroups,
                    flex: showRemainingGroups,
                  }
                )}
              >
                {groups?.slice(3).map((group) => {
                  return (
                    <SingleGroup
                      key={group.id}
                      group={group}
                      onClick={handleGroupClick}
                      active={searchParams.get("group") === group.id}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <>
              {groups?.map((group) => {
                return (
                  <SingleGroup
                    key={group.id}
                    group={group}
                    onClick={handleGroupClick}
                    active={searchParams.get("group") === group.id}
                  />
                );
              })}
            </>
          )}
        </div>

        <button className="bg-blue-800 gap-2 px-5 rounded-md flex items-center justify-center">
          <span>Add customer</span>
          <ImUserPlus />
        </button>
      </div>
    </div>
  );
}

export default CustomerGroups;
