"use client";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { deleteTemplate } from "@/app/lib/actions";
import Button from "../button";

function DeleteTemplateForm({
  templateName,
  templateId,
  hideModal,
}: {
  templateName: string;
  templateId: string;
  hideModal: () => void;
}) {
  const deleteTemplateBound = deleteTemplate.bind(null, templateId);
  const [state, dispatch] = useFormState(deleteTemplateBound, undefined);

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
      className="flex flex-col p-5 gap-5 bg-slate-900 items-center rounded-md border-2 border-slate-600 max-w-[400px] text-center overflow-y-auto"
      action={dispatch}
    >
      <p>
        Are you sure you want to delete '<b>{templateName}</b>' template
      </p>
      <div className="flex items-center gap-2">
        <Button type="submit">Delete</Button>
        <Button onClick={hideModal} type="button">
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default DeleteTemplateForm;
