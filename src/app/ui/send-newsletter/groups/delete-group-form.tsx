import { deleteGroup } from "@/app/lib/actions";
import { Group } from "@/app/lib/definitions";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";

function DeleteGroupForm({ group }: { group: Group }) {
  const deleteGroupBound = deleteGroup.bind(null, group.id);
  const [state, dispatch] = useFormState(deleteGroupBound, undefined);

  useEffect(() => {
    if (!state || !state.message) return;

    if (!state.success) {
      toast.error(state.message);
    } else if (state.success) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form action={dispatch}>
      <button
        type="submit"
        id="delete-group-btn"
        className="w-full relative flex items-center justify-center  py-1 hover:bg-blue-950 bg-slate-950 "
      >
        <span className="pointer-events-none">Delete</span>
        <span className="absolute right-0 pr-2 pointer-events-none">
          <MdDeleteOutline />
        </span>
      </button>
    </form>
  );
}

export default DeleteGroupForm;
