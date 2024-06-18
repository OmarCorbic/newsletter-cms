"use client";

import { useEffect, useState } from "react";
import Preview from "./preview";
import { Customer, Input, Template } from "@/app/lib/definitions";
import { sendNewsletter } from "@/app/lib/actions";
import { clsx } from "clsx";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

type ActionPayload = {
  templateId: string;
  customers: string[];
};

function TemplateForm({
  templates,
  customers,
}: {
  templates: Template[];
  customers: Customer[];
}) {
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const template = templates?.find((t) => t.id === selectedTemplateId) || null;
  const [formState, setFormState] = useState({});
  const actionPayload: ActionPayload = {
    templateId: selectedTemplateId,
    customers: [...customers.filter((c) => c.checked).map((c) => c.email)],
  };
  const sendNewsletterBound = sendNewsletter.bind(null, actionPayload);
  // types not matching
  const initialState: any = {
    message: "",
    errors: {},
  };

  const [state, dispatch] = useFormState(sendNewsletterBound, initialState);

  useEffect(() => {
    if (template) {
      const fields = template?.inputs?.map((input: Input) => {
        return input.name;
      });

      const state: any = {};

      for (const field of fields) {
        state[field] = "";
      }

      setFormState(state);
    } else setFormState({});
  }, [template]);

  useEffect(() => {
    if (state?.message && state?.errors) {
      toast.error(state?.message);
    }
  }, [state]);

  const handleFormChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormState((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: any) => {
    const id = e.target.value;
    setSelectedTemplateId(id);
    e.target.form?.reset();
  };

  return (
    <>
      <div className="w-1/3 bg-slate-950 rounded-lg  p-5 overflow-y-auto">
        <select
          className="w-full py-2 px-3 rounded-sm font-medium text-lg cursor-pointer"
          defaultValue=""
          name="selectedTemplateId"
          onChange={handleSelectChange}
        >
          <option value="" disabled>
            Select a template
          </option>
          {templates?.map((template) => {
            return (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            );
          })}
        </select>
        <form action={dispatch}>
          <div className="flex flex-col gap-4 py-4  text-white ">
            {template?.inputs?.map((input, i) => {
              if (input.type === "text-area") {
                return (
                  <>
                    <label htmlFor={input.name}>{input.name}</label>
                    <textarea
                      id={input.name}
                      className="py-2 px-3  bg-gradient-to-br from-slate-600 to-slate-800 outline-white  rounded-md"
                      rows={5}
                      name={input.name}
                      placeholder={input.placeholder ?? ""}
                      onChange={handleFormChange}
                    ></textarea>
                  </>
                );
              } else {
                return (
                  <>
                    <label htmlFor={input.name}>{input.name}</label>
                    <input
                      id={input.name}
                      className="py-2 px-3  bg-gradient-to-br from-slate-600 to-slate-800 outline-white  rounded-md"
                      type={input.type}
                      name={input.name}
                      placeholder={input.placeholder ?? ""}
                      onChange={handleFormChange}
                    />
                  </>
                );
              }
            })}
          </div>
          <button
            disabled={!selectedTemplateId}
            className={clsx("text-white", { hidden: !selectedTemplateId })}
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
      <div className="flex-grow  bg-slate-950 rounded-lg overflow-hidden p-5 text-white">
        <Preview templateHTML={template?.html} formState={formState} />
      </div>
    </>
  );
}

export default TemplateForm;
