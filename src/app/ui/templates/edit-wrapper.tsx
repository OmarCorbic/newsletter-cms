"use client";
import { Template } from "@/app/lib/definitions";
import { useState } from "react";
import CodeEditor from "./code-editor";
import Preview from "../send-newsletter/preview";
import { LuCode2 } from "react-icons/lu";
import { VscSplitHorizontal } from "react-icons/vsc";
import { MdOutlinePreview } from "react-icons/md";
import clsx from "clsx";

function EditWrapper({ template }: { template: Template }) {
  const [showCode, setShowCode] = useState(false);
  const [showSplit, setShowSplit] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [code, setCode] = useState(template.html);

  const handleCodeChange = (value?: string) => {
    setCode(value ?? "");
  };

  const handleViewChange = (e: any) => {
    switch (e.target.name) {
      case "code":
        setShowPreview(false);
        setShowSplit(false);
        setShowCode(true);
        break;
      case "split":
        setShowPreview(false);
        setShowSplit(true);
        setShowCode(false);
        break;
      case "preview":
        setShowPreview(true);
        setShowSplit(false);
        setShowCode(false);
        break;
      default:
        setShowPreview(false);
        setShowSplit(true);
        setShowCode(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center py-3 justify-between">
        <p className="text-xl font-bold">{template.name}</p>
        <div className="text-2xl py-1 rounded-md flex items-center gap-2 ">
          <button
            name="code"
            onClick={handleViewChange}
            className={clsx(
              "px-4 py-2 bg-slate-900 rounded-md hover:bg-slate-600",
              { "bg-slate-600": showCode }
            )}
          >
            <span className="pointer-events-none">
              <LuCode2 />
            </span>
          </button>
          <button
            name="split"
            onClick={handleViewChange}
            className={clsx(
              "px-4 py-2 bg-slate-900 rounded-md hover:bg-slate-600",
              { "bg-slate-600": showSplit }
            )}
          >
            <span className="pointer-events-none">
              <VscSplitHorizontal />
            </span>
          </button>
          <button
            name="preview"
            onClick={handleViewChange}
            className={clsx(
              "px-4 py-2 bg-slate-900 rounded-md hover:bg-slate-600",
              { "bg-slate-600": showPreview }
            )}
          >
            <span className="pointer-events-none">
              <MdOutlinePreview />
            </span>
          </button>
        </div>
      </div>
      <div
        className={clsx("flex ", {
          "gap-3": showSplit,
        })}
      >
        <div
          className={clsx(
            "overflow-hidden min-h-[600px] flex-grow w-1/2 duration-200  ",
            {
              "max-w-full ": showCode || showSplit,
              "max-w-0 ": !showCode || !showSplit,
            }
          )}
        >
          <CodeEditor value={code} onChange={handleCodeChange} />
        </div>
        <div
          className={clsx(
            "overflow-hidden min-h-[600px] flex-grow w-1/2 duration-200  ",
            {
              "max-w-full ": showPreview || showSplit,
              "max-w-0 ": !showPreview || !showSplit,
            }
          )}
        >
          <Preview templateHTML={code} />
        </div>
      </div>
      <div className="flex items-center justify-end py-3">
        <form action="">
          <button
            className="bg-blue-800 w-32 h-11 font-bold px-5 rounded-md flex items-center justify-center"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditWrapper;
