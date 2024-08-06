'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Skeleton } from "@/components/ui/skeleton"

import { Blog } from '@/lib/helper/types'
import axios from 'axios'
import BlogCard from './ui/blogCard'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

const Bloglist = () => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { 
    data, 
    isPending
  } = useQuery({
    queryKey: ['homeBloglist'],
    queryFn : async (): Promise<Blog[]> => {
      const response = await axios.get("/api/blog",{
          params:{
            page: 0
          }
        }
      )
      return await response.data.blogs
    },
  })

  if (isPending){
    return(
      <div className="py-5 mt-10 pb-10 px-5 md:px-12 lg:px-28 overflow-clip">
      <div className="max-w-5xl mx-auto sm:px-11 px-4 text-3xl font-thin flex justify-between">
        <div className="text-2xl sm:text-3xl font-thin">
          Latest Blog
        </div>
          <Link href={"/blogs"}>
            <Button className='text-lg sm:text-xl font-thin' variant={'link'}>
              View all
            </Button>
          </Link>
      </div>
      <div className="max-w-5xl mx-auto sm:px-8 px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-3">
          <div className="flex flex-col space-y-3 p-4 gap-3 border rounded-xl">
            <Skeleton className="h-[180px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[225px]" />
            </div>
            <div className="flex justify-between">
              <Skeleton className='h-4 w-[100px]'/>
              <Skeleton className='h-4 w-[100px]'/>
            </div>
          </div>
          <div className="flex flex-col space-y-3 p-4 gap-3 border rounded-xl">
            <Skeleton className="h-[180px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[225px]" />
            </div>
            <div className="flex justify-between">
              <Skeleton className='h-4 w-[100px]'/>
              <Skeleton className='h-4 w-[100px]'/>
            </div>
          </div>
          <div className="flex flex-col space-y-3 p-4 gap-3 border rounded-xl">
            <Skeleton className="h-[180px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[225px]" />
            </div>
            <div className="flex justify-between">
              <Skeleton className='h-4 w-[100px]'/>
              <Skeleton className='h-4 w-[100px]'/>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
  
  return (
    <div className="py-5 mt-10 pb-10 px-5 md:px-12 lg:px-28 overflow-clip">
      <div className="max-w-5xl mx-auto sm:px-11 px-4 text-3xl font-thin flex justify-between">
        <div className="text-2xl sm:text-3xl font-thin">
          Latest Blog
        </div>
          <Link href={"/blogs"}>
            <Button className='text-lg sm:text-xl font-thin' variant={'link'}>
              View all
            </Button>
          </Link>
      </div>
      <div className="max-w-5xl mx-auto sm:px-8 px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10">
         {(data?.length && data.length > 0)?
         data.map((blog, i)=>{
          return (
            <BlogCard 
              item={blog} 
              hoveredIndex={hoveredIndex} 
              setHoveredIndex={setHoveredIndex} 
              key={i}
              idx={i}
            >
            </BlogCard>
          )
          }):
          <div className=" col-span-3 text-2xl p-20 text-center">
            No Blogs
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Bloglist