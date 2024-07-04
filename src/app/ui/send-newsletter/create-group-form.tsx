import { createGroup } from "@/app/lib/actions";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";

function CreateGroupForm() {
  const [state, dispatch] = useFormState(createGroup, undefined);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (!state || !state.message) return;

    if (!state.success) {
      toast.error(state.message);
    } else if (state.success) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form className="flex gap-1" action={dispatch}>
      <input
        id="group-name"
        type="text"
        className="text-black text-center  rounded-md py-1 px-3"
        name="groupName"
      />
      <button
        disabled={pending}
        type="submit"
        className="bg-blue-800 flex-grow mr-auto px-2 rounded-md flex items-center justify-center"
      >
        Add
      </button>
    </form>
  );
}

export default CreateGroupForm;
