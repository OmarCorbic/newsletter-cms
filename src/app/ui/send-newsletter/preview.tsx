"use client";
import { useEffect, useRef } from "react";
import { HiOutlineArrowUpOnSquareStack } from "react-icons/hi2";
import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS: string[] = [
  "p",
  "b",
  "i",
  "u",
  "a",
  "img",
  "table",
  "tr",
  "td",
  "th",
  "thead",
  "tbody",
  "tfoot",
  "div",
  "span",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "br",
  "hr",
];

function Preview({
  templateHTML,
  formState,
}: {
  templateHTML?: string;
  formState?: any;
}) {
  const previewRef: any = useRef(null);

  useEffect(() => {
    if (previewRef.current && templateHTML && formState) {
      const regex = /{{(.*?)}}/g;
      const dirtyHTML = templateHTML.replace(regex, (_, key) => {
        return (
          DOMPurify.sanitize(formState[key], {
            USE_PROFILES: { html: false },
          }) || ""
        );
      });

      const sanitizedHTML = DOMPurify.sanitize(dirtyHTML, {
        ALLOWED_TAGS,
        ALLOWED_ATTR: ["style", "class", "href", "src", "alt"],
        RETURN_TRUSTED_TYPE: true,
      });

      previewRef.current.innerHTML = sanitizedHTML;
    } else if (templateHTML) {
      previewRef.current.innerHTML = templateHTML;
    }
  });
  return (
    <div ref={previewRef} className=" h-full overflow-y-auto">
      <div className="flex items-center justify-center h-full">
        <div className="flex items-center justify-center flex-col  p-20 w-1/2 gap-3">
          <div className="border-2 rounded-lg flex items-center justify-center p-8">
            <HiOutlineArrowUpOnSquareStack size={100} />
          </div>
          <p className=" text-center font-bold text-lg">
            Preview will be shown after you choose a template or a preset
          </p>
        </div>
      </div>
    </div>
  );
}

export default Preview;
