"use client";
import Link from "next/link";
import { RiListSettingsLine } from "react-icons/ri";
import NavLinks from "./nav-links";
import { IoLogOutOutline } from "react-icons/io5";
import { useState } from "react";
import clsx from "clsx";
import { signOut } from "@/app/lib/actions";

function SideNav() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <div className=" rounded-lg bg-slate-950 text-white flex items-center justify-center w-full h-32">
        LOGO
      </div>
      <NavLinks />
      <div className="relative flex mt-auto items-center  justify-between px-3  bg-slate-950  py-2">
        <div
          className={clsx(
            `absolute bg-blue-950 duration-200 bottom-full origin-top transform w-full  justify-center overflow-hidden flex  left-0 flex-col`,
            { "h-full ": showSettings, "h-0 ": !showSettings }
          )}
        >
          <form action={signOut}>
            <button
              type="submit"
              className="flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-blue-900 hover:text-white text-white md:flex-none md:justify-start md:p-2 md:px-3"
            >
              <IoLogOutOutline size={25} />
              Sign out
            </button>
          </form>
        </div>
        <Link
          className="h-11 bg-slate-700 w-11 rounded-full "
          href="/dashboard/profile"
        ></Link>
        <button
          onClick={() => setShowSettings((prev) => !prev)}
          type="button"
          className="text-white"
        >
          <RiListSettingsLine size={25} />
        </button>
      </div>
    </>
  );
}

export default SideNav;
