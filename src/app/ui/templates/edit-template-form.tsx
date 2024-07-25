"use client";
import { Template } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import CodeEditor from "./code-editor";
import CodePreview from "../send-newsletter/preview";
import { LuCode2 } from "react-icons/lu";
import { VscSplitHorizontal } from "react-icons/vsc";
import { MdOutlinePreview, MdOutlineEdit } from "react-icons/md";
import { LuUndo2 } from "react-icons/lu";

import clsx from "clsx";
import { editTemplate } from "@/app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import Button from "../button";

const codeView = { code: true, split: false, preview: false };
const splitView = { code: false, split: true, preview: false };
const previewView = { code: false, split: false, preview: true };

function EditForm({ template }: { template: Template }) {
  const [view, setView] = useState({ ...splitView });
  const [editName, setEditName] = useState(false);
  const [code, setCode] = useState(template.html);

  const editTemplateBound = editTemplate.bind(null, {
    html: code,
    templateId: template.id,
  });

  const [state, dispatch] = useFormState(editTemplateBound, undefined);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (!state || !state.message) return;

    if (!state.success) {
      toast.error(state.message);
    } else if (state.success) {
      toast.success(state.message);
    }
  }, [state]);

  const handleCodeChange = (value?: string) => {
    setCode(value ?? "");
  };

  const handleViewChange = (e: any) => {
    switch (e.target.name) {
      case "code":
        setView({ ...codeView });
        break;
      case "split":
        setView({ ...splitView });
        break;
      case "preview":
        setView({ ...previewView });
        break;
      default:
        setView({ ...splitView });
    }
  };

  return (
    <div className="flex flex-col">
      <form action={dispatch}>
        <div className="grid grid-cols-3 grid-rows-1   py-3">
          <div className="flex items-center justify-start relative gap-3 ">
            {editName ? (
              <>
                <label className="absolute bottom-full" htmlFor="template-name">
                  Name
                </label>
                <input
                  id="template-name"
                  type="text"
                  className="text-black rounded-lg py-1 px-3"
                  name="templateName"
                  defaultValue={template.name}
                />
              </>
            ) : (
              <p className="text-xl font-bold">{template.name}</p>
            )}
            <button
              type="button"
              onClick={() => setEditName((prev) => !prev)}
              className="px-4 py-2 bg-slate-900 rounded-md hover:bg-slate-600 "
            >
              <span className="pointer-events-none text-xl">
                {editName ? <LuUndo2 /> : <MdOutlineEdit />}
              </span>
            </button>
          </div>

          <div className="text-2xl rounded-md flex items-center justify-center gap-2 ">
            <button
              type="button"
              name="code"
              onClick={handleViewChange}
              className={clsx("px-4 py-2  rounded-md hover:bg-slate-600", {
                "bg-slate-600": view.code,
                "bg-slate-900": !view.code,
              })}
            >
              <span className="pointer-events-none">
                <LuCode2 />
              </span>
            </button>
            <button
              type="button"
              name="split"
              onClick={handleViewChange}
              className={clsx("px-4 py-2  rounded-md hover:bg-slate-600", {
                "bg-slate-600": view.split,
                "bg-slate-900": !view.split,
              })}
            >
              <span className="pointer-events-none">
                <VscSplitHorizontal />
              </span>
            </button>
            <button
              type="button"
              name="preview"
              onClick={handleViewChange}
              className={clsx("px-4 py-2  rounded-md hover:bg-slate-600", {
                "bg-slate-600": view.preview,
                "bg-slate-900": !view.preview,
              })}
            >
              <span className="pointer-events-none">
                <MdOutlinePreview />
              </span>
            </button>
          </div>
          <div className="flex items-center justify-end">
            <Button disabled={pending} type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
      <div
        className={clsx("flex ", {
          "gap-3": view.split,
        })}
      >
        <div
          className={clsx(
            "overflow-hidden min-h-[600px] flex-grow w-1/2 duration-200  ",
            {
              "max-w-full ": view.code || view.split,
              "max-w-0 ": !view.code || !view.split,
            }
          )}
        >
          <CodeEditor value={code} onChange={handleCodeChange} />
        </div>
        <div
          className={clsx(
            "overflow-hidden max-h-screen flex-grow w-1/2 duration-200  ",
            {
              "max-w-full ": view.preview || view.split,
              "max-w-0 ": !view.preview || !view.split,
            }
          )}
        >
          <CodePreview
            message="Preview will be shown after you start writing code"
            templateHTML={code}
          />
        </div>
      </div>
    </div>
  );
}

export default EditForm;
