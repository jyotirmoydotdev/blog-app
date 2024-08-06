'use client'

import BlogCard from '@/components/ui/blogCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useBlog } from '@/context/BlogContext';
import { Blog } from '@/lib/helper/types'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaArrowRight, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaFacebookF } from "react-icons/fa6";
import { FaRegCopy } from "react-icons/fa6";
import Markdown from 'react-markdown';

const page = () => {
  const param = useParams<{id: string}>()
  const {blog , setBlog} = useBlog()
  const [loading, setLoading] = useState<boolean>(false);
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const readMore = useQuery({
    queryKey: ['pageReadMore'],
    queryFn: async () :Promise<Blog[]> => {
      const response = await axios.get('/api/blog',{
        params:{
          readMore: true
        }
      })
      return response.data.blogs
    }
  })

  useEffect(()=>{
    const fetchBlogs = async (blogId: string) => {
      setLoading(true);
      try{
        const response = await axios.get(`/api/blog`,{
          params:{
            id: blogId,
          }
        })
        if (response.statusText === 'OK'){
          const fetchBlog: Blog = await response.data.blog;
          setBlog(fetchBlog);
        } else {
          console.log('Failed to fetch blogs:', response.statusText)
        } 
      } catch (e) {
        console.log('Failed to fetch blog:', e);
      } finally {
        setLoading(false);
      }
    };

    if (!blog && param.id){
      fetchBlogs(param.id);
    }
  },[blog, param.id, setBlog])

  let renderedCount = 0;

  if (loading || !blog || readMore.isPending){
    return (
      <>
        <div className='bg-white'>
        <div className="bg-grid-small-black/[0.2] h-full w-full flex-col flex justify-center items-center"></div>
          <div className="text-center mb-32 mt-16">
            <h1 className='text-2xl sm:text-4xl font-semibold max-w-[700px] mx-auto'>{"Loading..."}</h1>
            <h3 className="font-normal text-lg py-5">{"Loading..."}</h3>
          </div>
        </div>
        <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <div className="bg-white">
        <Skeleton className='h-52 sm:h-[404px] border-4 border-white'></Skeleton>
        </div>
        </div>
    </>
    )
  }
  return (
    <>
    <div className='bg-white'>
      <div className="bg-grid-small-black/[0.2] h-full w-full flex-col flex justify-center items-center">
        <div className="text-center mb-32 mt-16 px-8">
          <p className='text-2xl sm:text-4xl font-semibold max-w-[700px] mx-auto'>{blog.title}</p>
          <p className="font-medium text-sm sm:text-lg py-5">{blog.description}</p>
          <p>{(new Date(blog.date).toDateString())}</p>
        </div>
      </div>
    </div>
    <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
      {/* <Image className='border-4 bg-gray-200 border-white w-full' src={''} width={500} height={250} alt='' /> */}
      <div className="bg-white">
        <Skeleton className='h-52 sm:h-[404px] border-4 border-white'></Skeleton>
        </div>
      <div className="mt-10 blog-content">
        <Markdown>
          {blog.content}
        </Markdown>
      </div>
      <div className="my-24 text-center">
        <h4 className="text-black font font-semibold my-4">Share this article on social media</h4>
        <div className="flex gap-10 justify-center">
          <FaFacebookF size={20} />
          <FaXTwitter size={20} />
          <FaInstagram size={20} />
          <FaRegCopy size={20} />
        </div>
      </div>
    </div>
    <div className='w-full flex justify-center px-5'>
      <div className="max-w-5xl">
        <div className="text-2xl">
          Read more
        </div>
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10">         
            {readMore.data?.map((item, i)=>{
              if (renderedCount >= 3) {
                return null;
              }
              if (blog._id === item._id){
                return null;
              }
              renderedCount++;
              return (
                <BlogCard
                item={item}
                idx={i}
                key={i}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                />
              )})
            }
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default page