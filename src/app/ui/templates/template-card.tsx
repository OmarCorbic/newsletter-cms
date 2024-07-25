"use client";
import { Template } from "@/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import DeleteTemplateForm from "./delete-template-form";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useState } from "react";
import Modal from "../modal";

export function TemplateCard({ template }: { template: Template }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const hideModal = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div>
      {showDeleteConfirm && (
        <Modal onClick={hideModal}>
          <DeleteTemplateForm
            hideModal={hideModal}
            templateName={template.name}
            templateId={template.id}
          />
        </Modal>
      )}
      <div className="flex items-center justify-between  gap-5">
        <p className="py-2 font-bold overflow-x-auto max-w-[200px]">
          {template.name}
        </p>
        <div className="flex gap-2 items-center">
          <Link
            className="text-xl"
            href={`/dashboard/templates/${template.id}/edit`}
          >
            <FaRegEdit />
          </Link>
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="flex text-2xl items-center justify-center"
          >
            <MdOutlineDeleteOutline />
          </button>
        </div>
      </div>
      <Image
        width={300}
        height={400}
        src={`/templates/${template.id}.png`}
        className="rounded-sm object-contain object-top w-[300px] h-[400px] border-2 border-blue-950 bg-slate-900 text-center"
        alt="Template Preview Image "
      />
    </div>
  );
}
