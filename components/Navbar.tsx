'use client'

import { publication } from '@/data';
import React, { useState } from 'react'
import { Button } from './ui/button';  
import Link from 'next/link';
import { IconMenu2, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from 'framer-motion';
import { ClientSidebarLink } from './ui/clientSidebarLink';
import { CiStickyNote } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { FiMessageSquare } from "react-icons/fi";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className='py-5 px-5 md:px-12 lg:px-28 flex justify-between items-center sm:bg-white bg-gray-50 mb-4'>
        <div className=" flex items-center gap-3 text-2xl font-semibold">
            <Link href={'/'} className="">
                {publication.name}
            </Link>
        </div>
        <div className="sm:block hidden">
          <Link href={"/"}>
            <Button variant={'link'} className='rounded-full gap-2'>Home</Button>
          </Link>
          <Link href={"/blogs"}>
            <Button variant={'link'} className='rounded-full gap-2'>Blog</Button>
          </Link>
          <Link href={"/contact"}>
            <Button variant={'link'} className='rounded-full gap-2'>Contact</Button>
          </Link>
        </div>
        <div className="sm:hidden block">
          <div className="h-10 px-4 py-4 flex flex-row items-center justify-between gap-2 w-full">
            <div className="flex justify-end z-20 w-full">
              <IconMenu2
              className='text-neutral-800'
              onClick={()=> setOpen(!open)}
              />
            </div>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{x:"-100%", opacity:0}}
                  animate={{x:0, opacity:1}}
                  exit={{x:"-100%", opacity:0}}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut'
                  }}
                  className='fixed h-full w-3/4 inset-0 bg-white p-10 z-[100] flex flex-col '
                >
                  <div className="font-bold">
                      {publication.name}
                  </div>
                  <div 
                    className="absolute right-10 top-10 z-50 text-neutral-800"
                    onClick={()=>setOpen(!open)}
                  >
                    <IconX/>
                  </div>
                  <div className="flex flex-col h-full justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto">
                      <div className="mt-8 flex flex-col gap-2">
                        <ClientSidebarLink 
                          link='/' 
                          label='Home'
                          icon=<GoHome/>
                        />
                        <ClientSidebarLink 
                          link='/blogs' 
                          label='Blog'
                          icon=<CiStickyNote/>
                        />
                        <ClientSidebarLink 
                          link='/contact' 
                          label='Contact'
                          icon=<FiMessageSquare/>
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
    </div>
  )
}

export default Navbar