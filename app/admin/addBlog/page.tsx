'use client'

import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons"
import { object, z } from 'zod'
import { MdOutlineFileUpload } from "react-icons/md";
import { Input } from '@/components/ui/input1'
import Image from 'next/image'
import Markdown from 'react-markdown'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from 'axios'
import { toast } from '@/components/ui/use-toast'
import { FaSpinner } from 'react-icons/fa'
import { ToastAction } from '@radix-ui/react-toast'

const MAX_FILE_SIZE = 1024 * 1024 * 5;

const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const FormSchema = z.object({
  image: z.any().refine((files) => {
    return files?.[0]?.size <= MAX_FILE_SIZE;
  }, `Max image size is 5MB.`).refine(
    (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported."
  ),
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be string",
  }),
  description: z.string({
    required_error: "description is required",
    invalid_type_error: "description must be string",
  }),
  category: z.string({
    required_error: "category is required",
    invalid_type_error: "category must be string",
  }),
  content: z.string({
    required_error: "content is required",
    invalid_type_error: "content must be string",
  })
})

const page = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "Technology",
      content: "",
      image: undefined,
    }
  })

  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [content, setContent] = useState("");

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const formData = new FormData();
    formData.append("title",data.title)
    formData.append("description",data.description)
    formData.append("content",data.content)
    formData.append("category",data.category)
    formData.append("image", data.image[0] as Blob)
    const response = await axios.post("/api/blog", formData);
    if (response.data.success){
      setLoading(false)
      toast({
        description: "Blog is Saved",
        action:<ToastAction altText='View'>View</ToastAction>
      })
    }else{
      setLoading(false)
      toast({
        title: "Uh oh! Something went wrong.",
        description: response.data.msg,
      })
    }
  }

  return (
    <Form{...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2 flex-1'>
        <div className="justify-between items-center flex">
          <div className="text-center items-center flex font-medium h-10 rounded-md">Add Blog</div>
          <Button className='hover:scale-110  transition ease-in-out delay-150  duration-300' disabled={loading}>
            {
              loading?<FaSpinner className=' animate-spin'/>:"Save"
            }
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 h-full">
          <div className="bg-gray-100 rounded-lg p-5">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem >
                  <FormLabel className='flex gap-2 pb-4'>
                    Upload Thumbnail* <p className='text-xs text-gray-400'>(1600 x 840)</p>
                  </FormLabel>
                  <label htmlFor='fileInput' className='w-fit'>
                    {
                      selectedImage ?
                        <Image src={URL.createObjectURL(selectedImage)} width={128} height={98} alt='' className=' object-cover w-2/3 h-52 rounded-lg'></Image>
                        :
                        <div className="bg-gray-50 w-full sm:w-2/3 h-52 border-gray-500 rounded-md border border-dotted  flex flex-col justify-center items-center">
                          <MdOutlineFileUpload size={20} />
                          <p className='text-sm text-gray-500'>Image</p>
                        </div>
                    }
                  </label>
                  <FormControl>
                    <Input
                      type='file'
                      id="fileInput"
                      accept="image/*"
                      onBlur={field.onBlur}
                      name={field.name}
                      className='w-2/3 hidden'
                      onChange={(e) => {
                        field.onChange(e.target.files);
                        setSelectedImage(e.target.files?.[0] || null);
                      }}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className='mt-5'>
                  <FormLabel >
                    Title*
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='Enter title' required className='bg-white w-full sm:w-2/3 h-14' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className='mt-5'>
                  <FormLabel >
                    Description*
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='Enter description' required className='bg-white w-full sm:w-2/3 h-14' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className='mt-5'>
                  <FormLabel >
                    Category*
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-[180px] bg-white">
                        <SelectValue placeholder="Technology" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='bg-white'>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="Startup">Startup</SelectItem>
                      <SelectItem value="News">News</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem >
                <Tabs defaultValue='editor' className='relative' >
                  <TabsList className='w-full'>
                    <TabsTrigger className='w-full' value="editor">Editor</TabsTrigger>
                    <TabsTrigger className='w-full' value="preveiw">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="editor" >
                    <FormControl >
                      <textarea 
                      id="contentTextArea" 
                      className='border resize-none rounded-md p-2 w-full h-[80vh]' 
                      placeholder='Write markdown here...' 
                      onBlur={field.onBlur}
                      name={field.name}
                      value={content}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        setContent(e.target.value);
                      }}
                      ref={field.ref}
                    ></textarea>
                    </FormControl>
                  </TabsContent>
                  <TabsContent value="preveiw" className='py-2 px-5 border border-gray-200 rounded-lg w-full h-[80vh] overflow-scroll'>
                    <Markdown className={"blog-content"}>
                      {content}
                    </Markdown>
                  </TabsContent>
                  <FormMessage />
                </Tabs>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}

export default page