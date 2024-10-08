"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FaPenNib } from "react-icons/fa";
import { publication } from "@/data";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GoHome } from "react-icons/go";
import { CiMail, CiSquarePlus, CiViewList } from "react-icons/ci";

export default function SidebarDemo({children}:{children:React.ReactNode}) {
  const links = [
    {
      label: "Home",
      href: "/admin",
      icon: (
        <GoHome className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Add Blog",
      href: "/admin/addBlog",
      icon: (
        <CiSquarePlus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Blog List",
      href: "/admin/blogList",
      icon: (
        <CiViewList className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Subscribers",
      href: "/admin/subscribers",
      icon: (
        <CiMail className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-visible sm:overflow-hidden",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <Avatar className="h-7 w-7">
                <AvatarImage src="" width={50} height={50} />
                <AvatarFallback>{publication.name.at(0)}</AvatarFallback>
            </Avatar>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="/admin"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="flex-shrink-0" >
        <FaPenNib size={20}/>
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        {publication.name}
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="/admin"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className=" flex-shrink-0" >
        <FaPenNib size={20}/>
      </div>
    </Link>
  );
};