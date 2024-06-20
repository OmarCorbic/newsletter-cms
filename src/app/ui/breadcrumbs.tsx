import { clsx } from "clsx";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block pb-10">
      <ol className="text-xl flex md:text-2xl">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              "flex items-center",
              breadcrumb.active ? "text-gray-900" : "text-gray-500"
            )}
          >
            <Link className=" font-bold  text-white" href={breadcrumb.href}>
              {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block font-extrabold   text-white">
                <IoIosArrowForward />
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
