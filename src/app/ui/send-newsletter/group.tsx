import { useEffect, useRef, useState } from "react";
import { Group } from "@/app/lib/definitions";
import clsx from "clsx";

import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";

import EditGroupForm from "./edit-group-form";
import DeleteGroupForm from "./delete-group-form";

type Props = {
  onClick: (id: string) => void;
  active: boolean;
  group: Group;
};

function SingleGroup({ onClick, active, group }: Props) {
  const [showOptions, setShowOptions] = useState(false);
  const [editName, setEditName] = useState(false);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const hideOptionsAndNameEdit = (e: any) => {
      const nonReactiveElements = [
        "edit-group-btn",
        "delete-group-btn",
        "group-name",
      ];

      if (nonReactiveElements.includes(e.target.id)) {
        return;
      }

      setShowOptions(false);
      setEditName(false);
    };
    document.addEventListener("click", hideOptionsAndNameEdit);

    return () => document.removeEventListener("click", hideOptionsAndNameEdit);
  });

  useEffect(() => {
    if (editName) {
      if (nameInputRef?.current) {
        nameInputRef.current?.focus();
        nameInputRef.current?.select();
      }
    }
  }, [editName]);

  return (
    <div
      className={clsx(
        "relative flex items-center justify-center rounded-md h-10 text-sm font-medium hover:bg-blue-900 hover:text-white  text-white group ",
        {
          "bg-blue-500 text-white": active,
          "bg-slate-900": !active,
        }
      )}
    >
      <span className="absolute text-xs left-2">
        <HiUserGroup />
      </span>
      {editName ? (
        <EditGroupForm group={group} inputRef={nameInputRef} />
      ) : (
        <button
          className="flex-grow h-full py-2 px-7 z-[1]"
          key={group.id}
          name={group.id}
          onClick={() => onClick(group.id)}
          type="button"
        >
          {group.name.length > 10
            ? group.name.slice(0, 10) + "..."
            : group.name}
        </button>
      )}
      <button
        onClick={() => {
          setShowOptions((prev) => !prev);
        }}
        className="w-5 absolute right-0 top-0 h-full rounded-r-md hidden items-center justify-center hover:bg-blue-500 group-hover:flex z-[1]"
      >
        <BsThreeDotsVertical />
      </button>
      {showOptions && (
        <div className="absolute flex-col flex rounded-md w-32 top-0 left-full overflow-hidden z-[2]">
          <button
            onClick={() => {
              setEditName(true);
              setShowOptions(false);
            }}
            className="w-full relative flex items-center justify-center  py-1 hover:bg-blue-950 bg-slate-950 "
          >
            <span>Edit</span>
            <span className="absolute right-0 pr-2">
              <MdOutlineEdit />
            </span>
          </button>
          <DeleteGroupForm group={group} />
        </div>
      )}
    </div>
  );
}

export default SingleGroup;
