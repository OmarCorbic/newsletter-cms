"use client";
import clsx from "clsx";
import { useState } from "react";
import TemplateForm from "./template-form";
import PresetForm from "./preset-form";
import { Customer, Preset, Template } from "@/app/lib/definitions";

export default function ChooseTemplate({
  customers,
  templates,
  presets,
}: {
  customers: { id: string; email: string }[];
  templates: Template[];
  presets: Preset[];
}) {
  const [fromTemplate, setFromTemplate] = useState(true);

  return (
    <div className="py-6">
      <h2 className="text-xl font-bold text-white py-4">Template</h2>
      <div className="flex gap-2">
        <button
          onClick={() => setFromTemplate(true)}
          className={clsx(
            "flex w-32 items-center justify-center rounded-md  py-2 px-3 text-sm font-medium hover:bg-blue-900 hover:text-white text-white ",
            {
              "bg-blue-500 ": fromTemplate,
              "bg-slate-900 ": !fromTemplate,
            }
          )}
        >
          From template
        </button>
        <button
          onClick={() => setFromTemplate(false)}
          className={clsx(
            "flex w-32 items-center justify-center rounded-md py-2 px-3 text-sm font-medium hover:bg-blue-900 hover:text-white text-white ",
            {
              "bg-blue-500": !fromTemplate,
              "bg-slate-900": fromTemplate,
            }
          )}
        >
          From preset
        </button>
      </div>

      <div className="flex flex-row py-6 gap-3 h-[800px]">
        {fromTemplate ? (
          <TemplateForm templates={templates} customers={customers} />
        ) : (
          <PresetForm presets={presets} customers={customers} />
        )}
      </div>
    </div>
  );
}
