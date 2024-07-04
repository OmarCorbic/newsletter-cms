import { Ref, useEffect } from "react";
import { Group } from "@/app/lib/definitions";
import toast from "react-hot-toast";
import { useFormState } from "react-dom";
import { FaCheck } from "react-icons/fa";
import { editGroup } from "@/app/lib/actions";

function EditGroupForm({
  group,
  inputRef,
}: {
  group: Group;
  inputRef: Ref<HTMLInputElement>;
}) {
  const editGroupBound = editGroup.bind(null, group.id);
  const [state, dispatch] = useFormState(editGroupBound, undefined);
  useEffect(() => {
    if (!state || !state.message) return;

    if (!state.success) {
      toast.error(state.message);
    } else if (state.success) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form
      className="flex-grow h-full w-60 flex items-center justify-center px-5 py-2 z-[1]"
      action={dispatch}
    >
      <input
        ref={inputRef}
        type="text"
        name="groupName"
        id="group-name"
        className="w-full py-1 outline-none h-full text-center bg-transparent"
        defaultValue={group.name}
      />
      <button
        type="submit"
        id="edit-group-btn"
        className="w-8 h-full bg-blue-800 hover:bg-blue-500  rounded-l-md flex items-center justify-center absolute right-5"
      >
        <span className="pointer-events-none">
          <FaCheck />
        </span>
      </button>
    </form>
  );
}

export default EditGroupForm;
