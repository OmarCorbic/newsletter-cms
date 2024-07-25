import { Template } from "@/app/lib/definitions";
import React, { useEffect } from "react";
import CodePreview from "./preview";
import { createPreset } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import Button from "../button";

function CreatePresetForm({
  hideModal,
  template,
  formState,
}: {
  hideModal: () => void;
  template: Template | null;
  formState: any;
}) {
  const createPresetBound = createPreset.bind(
    null,
    template?.id || "",
    formState
  );
  const [state, dispatch] = useFormState(createPresetBound, undefined);

  useEffect(() => {
    if (!state || !state.message) return;

    if (!state.success) {
      toast.error(state.message);
    } else if (state.success) {
      toast.success(state.message);
      hideModal();
    }
  }, [state]);

  return (
    <form
      className="flex flex-col p-5 gap-5 bg-slate-900 rounded-md border-2 border-slate-600 w-[600px] max-h-[600px] overflow-y-auto"
      action={dispatch}
    >
      <h2 className="text-xl font-bold text-center text-white">
        Create a preset
      </h2>
      <div className="flex justify-between items-end">
        <div className="text-white flex flex-col gap-2 w-1/2">
          <label htmlFor="presetName">Preset name</label>
          <input
            className="text-black rounded-lg py-1 px-3"
            type="text"
            name="presetName"
            id="presetName"
          />
          <p className="text-red-500">
            {state?.errors &&
            Object.hasOwn(state?.errors, "presetName") &&
            state?.errors["presetName"]?.at(0)
              ? state?.errors["presetName"].at(0)
              : null}
          </p>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <Button onClick={hideModal} type="button">
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </div>
      <div className="relative flex items-center justify-center bg-slate-950">
        <div className="absolute top-2 left-4 text-white font-bold">
          Preview
        </div>
        <div className="scale-75 h-[600px] text-white">
          <CodePreview templateHTML={template?.html} formState={formState} />
        </div>
      </div>
    </form>
  );
}

export default CreatePresetForm;
