import React, { useEffect } from "react";

import { useFormState, useFormStatus } from "react-dom";
import { addCustomer } from "@/app/lib/actions";
import toast from "react-hot-toast";
import Button from "../button";

function AddCustomerForm({ hideModal }: { hideModal: () => void }) {
  const { pending } = useFormStatus();
  const [state, dispatch] = useFormState(addCustomer, undefined);

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
      <div className="font-bold text-xl text-center">Add a new customer</div>
      <div className="flex flex-col px-20 gap-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            className="rounded-md py-1 px-2 text-black"
            type="text"
            name="name"
          />
          <p className="text-red-500">
            {state?.errors &&
            Object.hasOwn(state?.errors, "name") &&
            state?.errors["name"]?.at(0)
              ? state?.errors["name"].at(0)
              : null}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            className="rounded-md py-1 px-2 text-black"
            type="text"
            name="email"
          />
          <p className="text-red-500">
            {state?.errors &&
            Object.hasOwn(state?.errors, "email") &&
            state?.errors["email"]?.at(0)
              ? state?.errors["email"].at(0)
              : null}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="company">Company</label>
          <input
            className="rounded-md py-1 px-2 text-black"
            type="text"
            name="company"
          />
          <p className="text-red-500">
            {state?.errors &&
            Object.hasOwn(state?.errors, "company") &&
            state?.errors["company"]?.at(0)
              ? state?.errors["company"].at(0)
              : null}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 justify-end">
        <Button type="button" onClick={hideModal}>
          Cancel
        </Button>
        <Button disabled={pending} type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}

export default AddCustomerForm;
