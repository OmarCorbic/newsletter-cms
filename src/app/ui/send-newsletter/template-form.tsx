"use client";

import { useEffect, useRef, useState } from "react";
import CodePreview from "./preview";
import { Customer, Input, Template } from "@/app/lib/definitions";
import { sendNewsletter } from "@/app/lib/actions";
import { clsx } from "clsx";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import { IoIosSave } from "react-icons/io";
import { TbTemplate } from "react-icons/tb";
import CreatePresetForm from "./create-preset-form";
import Modal from "../modal";
import Button from "../button";

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [createPreset, setCreatePreset] = useState(false);

  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const template = templates?.find((t) => t.id === selectedTemplateId) || null;

  const [formState, setFormState] = useState({});
  const actionPayload: ActionPayload = {
    templateId: selectedTemplateId,
    customers: [...customers.map((c) => c.email)],
  };
  const sendNewsletterBound = sendNewsletter.bind(null, actionPayload);
  // types not matching
  const initialState: any = {
    message: "",
    errors: {},
  };
  const [state, dispatch] = useFormState(sendNewsletterBound, initialState);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (template) {
      scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
      const fields = template?.inputs?.map((input: Input) => {
        return input.name;
      });

      const state: any = {};

      for (const field of fields) {
        state[field] = "";
      }

      setFormState(state);
    } else setFormState({});
  }, [selectedTemplateId]);

  useEffect(() => {
    if (!state || !state.message) return;

    if (!state.success) {
      toast.error(state.message);
    } else if (state.success) {
      toast.success(state.message);
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

  const hideModal = () => {
    setCreatePreset(false);
  };

  return (
    <>
      <div
        ref={scrollRef}
        className="w-1/3 bg-slate-950 rounded-lg  p-5 overflow-y-auto text-black"
      >
        {createPreset && (
          <Modal onClick={hideModal}>
            <CreatePresetForm
              hideModal={hideModal}
              template={template}
              formState={formState}
            />
          </Modal>
        )}
        <div className="flex gap-2">
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
          <Button onClick={() => setCreatePreset(true)}>
            <span className="text-2xl ">
              <IoIosSave />
            </span>
          </Button>
        </div>
        <form action={dispatch}>
          <div className="flex flex-col gap-4 py-4  text-white ">
            {template?.inputs?.map((input, i) => {
              if (input.type === "text-area") {
                return (
                  <div key={i}>
                    <label htmlFor={input.name}>{input.name}</label>
                    <textarea
                      id={input.name}
                      className="py-2 px-3 w-full  bg-gradient-to-br from-slate-600 to-slate-800 outline-white  rounded-md"
                      rows={5}
                      name={input.name}
                      placeholder={input.placeholder ?? ""}
                      onChange={handleFormChange}
                    ></textarea>
                    <p className="text-red-500">
                      {state?.errors &&
                      Object.hasOwn(state?.errors, input.name) &&
                      state?.errors[input.name].at(0)
                        ? state?.errors[input.name].at(0)
                        : null}
                    </p>
                  </div>
                );
              } else {
                return (
                  <div key={i}>
                    <label htmlFor={input.name}>{input.name}</label>
                    <input
                      id={input.name}
                      className="py-2 px-3 w-full  bg-gradient-to-br from-slate-600 to-slate-800 outline-white  rounded-md"
                      type={input.type}
                      name={input.name}
                      placeholder={input.placeholder ?? ""}
                      onChange={handleFormChange}
                    />
                    <p className="text-red-500">
                      {state?.errors &&
                      Object.hasOwn(state?.errors, input.name) &&
                      state?.errors[input.name].at(0)
                        ? state?.errors[input.name].at(0)
                        : null}
                    </p>
                  </div>
                );
              }
            })}
          </div>
          <Button
            disabled={!selectedTemplateId || pending}
            className={!selectedTemplateId ? "hidden" : "w-full"}
            type="submit"
          >
            Send
          </Button>
        </form>
      </div>
      <div className="flex-grow  bg-slate-950 rounded-lg overflow-hidden p-5 text-white">
        <CodePreview templateHTML={template?.html} formState={formState} />
      </div>
    </>
  );
}

export default TemplateForm;
