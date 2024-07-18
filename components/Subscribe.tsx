'use client'

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Publication } from '@/data'

const formSchema = z.object({
  email: z.string().email({message:"Invalid email"})
})

const Subscribe = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <div className="text-center my-8">
        <h1 className='text-3xl sm:text-5xl'>
            Latest Blogs
        </h1>
        <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
            {Publication.about}
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-center gap-2 max-w-[500px] scale-100 mx-auto mt-10 ">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className=''>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </Form>
    </div>
  )
}

export default Subscribe