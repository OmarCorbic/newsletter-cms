"use client";
import { Template } from "@/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";

export async function TemplateCard({ template }: { template: Template }) {
  return (
    <div>
      <div className="flex items-center justify-between  gap-5">
        <p className="py-2 font-bold overflow-x-auto max-w-[200px]">
          {template.name}
        </p>
        <Link href={`/dashboard/templates/${template.id}/edit`}>
          <FaRegEdit size={25} />
        </Link>
      </div>
      <Image
        width={200}
        height={300}
        src={`/templates/${template.id}.png`}
        className="rounded-sm object-cover w-[200px] h-[300px] border-2 border-blue-950 bg-slate-900 text-center"
        alt="Template Preview Image "
      />
    </div>
  );
}
