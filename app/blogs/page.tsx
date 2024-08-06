'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import BlogCard from '@/components/ui/blogCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Blog } from '@/lib/helper/types'
import { ChevronDownIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { FaArrowDown, FaSearch, FaSpinner } from 'react-icons/fa'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


async function fetchBlogs ({ pageParam }:{ pageParam: number}):Promise<{
  data: Blog[],
  currentPage: number,
  nextPage: number | null
}> {
  const response = await axios.get("/api/blog",{
    params:{
      page: pageParam,
      limit: 6
    }
  })
  return {
    data: response.data.blogs,
    currentPage: pageParam,
    nextPage: pageParam + 1
  }
}

const page = () => {
  const [menu, setMenu] = useState("All");
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const {data, error, status, fetchNextPage, isFetchingNextPage} = useInfiniteQuery({
    queryKey:['blogs'],
    queryFn: fetchBlogs,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  })
  const [search, setSearch] = useState("");
  return (
    <div className="py-5 pb-10 px-5 md:px-12 lg:px-28 overflow-clip ">
      <div className="relative h-16 sm:h-52 mb-5 w-full gap-2 ">
        <div className="bg-grid-small-black/[0.2] h-full w-full flex-col flex justify-center items-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]"></div>
          <p className="text-xl sm:text-4xl font-semibold">Blog List</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto text-3xl font-thin flex gap-2 justify-between">
        <div className="text-3xl font-thin flex gap-2">
          <Input 
          placeholder='Search blog...'
          className='h-9 w-40 sm:w-64 '
          onChange={(e)=>setSearch(e.target.value)}
          value={search}
          />
          <Button variant={'outline'}><FaSearch/></Button>
        </div>
        <Select onValueChange={setMenu}>
          <SelectTrigger className='w-full sm:w-1/6'>
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent position='item-aligned'>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Lifestyle">Lifestyle</SelectItem>
            <SelectItem value="Startup">Startup</SelectItem>
            <SelectItem value="News">News</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="max-w-5xl mx-auto ">
        <div className="">
          {
            (status === "pending")?(
              <div className="flex items-center justify-center w-full h-[50vh] text-3xl">Loading...</div>
            ): status === "error" ?(
              <div>{error.message}</div>
            ):(
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-10 min-h-[50vh]">
                  {data.pages.map((page, pi)=>{
                    return <React.Fragment key={pi}>
                        {
                        page.data 
                        .filter((item)=>
                          search === "" ? true: item.title.toLowerCase().includes(search.toLowerCase())
                        )
                        .filter((item) =>
                          menu === "All" ? true : item.category === menu
                        )
                        .map((item, i)=>{
                          const serialNumber = pi * page.data.length + i + 1;
                          
                          return (
                          <BlogCard 
                            item={item} 
                            hoveredIndex={hoveredIndex} 
                            setHoveredIndex={setHoveredIndex} 
                            key={serialNumber}
                            idx={serialNumber}
                            />
                          )
                          })
                        }
                      </React.Fragment>
                    })
                  }
                </div>
            )
          }
        </div>
        <div className="w-full text-center ">
          <Button onClick={()=>fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage?<FaSpinner className=' animate-spin'/>:"Load more "}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default page