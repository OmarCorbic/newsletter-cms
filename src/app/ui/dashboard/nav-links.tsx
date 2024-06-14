"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbTemplate, TbHome, TbMailCheck, TbMailForward } from "react-icons/tb";

export default function NavLinks() {
  const links = [
    { href: "/dashboard", name: "Home", icon: TbHome },
    {
      href: "/dashboard/send-newsletter",
      name: "Send newsletter",
      icon: TbMailForward,
    },
    { href: "/dashboard/presets", name: "Presets", icon: TbMailCheck },
    { href: "/dashboard/templates", name: "Templates", icon: TbTemplate },
  ];

  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-blue-900 hover:text-white text-white md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-blue-500 text-white": pathname === link.href,
                "bg-slate-900  text-white": pathname !== link.href,
              }
            )}
          >
            <LinkIcon size={25} />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
