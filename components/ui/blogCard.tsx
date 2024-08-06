import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { Blog } from "@/lib/helper/types";
import { CiImageOff } from "react-icons/ci";

import React, { Dispatch, SetStateAction } from 'react'
import { useBlog } from "@/context/BlogContext";

interface BlogLinkProps {
    item: Blog;
}

const BlogCard = (
    {
        item,
        idx,
        hoveredIndex, 
        setHoveredIndex,
    }:{ 
        item: Blog,
        idx: number,
        hoveredIndex: number | null,
        setHoveredIndex: Dispatch<SetStateAction<number | null>>
    }) => {
    const { setBlog } = useBlog();
    const handelClick = () => {
        setBlog(item)
    }
    return (
        <Link 
        href={`/blogs/${item._id}`}
        className="relative group block p-2 h-full w-full"
        onMouseEnter={() => setHoveredIndex(idx)}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={handelClick}
        >
            <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-gradient-to-t from-gray-400 to-white dark:bg-slate-800/[0.8] block "
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
            </AnimatePresence>
            <Card>
                {false?
                    <Image src={item.image} alt={item.image} loading="lazy" width={500} height={500} className=" scale-125 h-36 w-full mb-10 bg-cover"/>
                    :
                    <div className="flex  justify-center items-center scale-125 mb-10 h-36">
                        <CiImageOff />
                    </div>
                }
                <CardTitle>
                    {item.title}
                </CardTitle>
                <CardDescription>
                    {item.description}
                </CardDescription>
                <CardCategory>
                    {item.category}
                </CardCategory>
            </Card>
        </Link>
  )
}

export const Card = ({children}:{children:React.ReactNode}) => {
    return (
        <div className=" h-full p-4 pt-0 overflow-hidden bg-slate-50 z-20 group-hover:border-slate-700  relative">
            <div className="relative z-50 ">
                <div className="p-4 flex flex-col h-full">
                    {children}
                </div>
            </div>
        </div>
    )
}

export const CardTitle = ({children}:{children:React.ReactNode})=>{
    return(
        <h4 className="text-zinc-700 line-clamp-2 font-bold tracking-wide ">
            {children}
        </h4>
    )
}

export const CardDescription = ({children}:{children:React.ReactNode})=>{
    return(
        <p className="mt-4 text-zinc-400 line-clamp-3 tracking-wide leading-relaxed text-sm">
            {children}
        </p>
    )
}

export const CardCategory = ({children}:{children:React.ReactNode})=>{
    return(
        <div className="mt-4 flex justify-between w-full h-full items-end">
            <p className="rounded-sm font-thin text-sm">
                {children}
            </p>
            <p className="text-sm">Read more</p>
        </div>
    )
}

export default BlogCard