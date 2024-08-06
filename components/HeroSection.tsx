'use client'

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from 'axios';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

import { ToastAction } from '@radix-ui/react-toast'
import { ReloadIcon } from '@radix-ui/react-icons'

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email " })
})


const HeroSection = () => {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "" }
  })

  const [loading, setLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true)
    const formData = new FormData();
    formData.append("email", data.email);
    const response = await axios.post("/api/email", formData);
    if (response.data.success) {
      form.reset()
      setLoading(false)
      return toast({
        title: "Yhoo! You are subscribed",
        action: <ToastAction className='border px-2 py-1 text-white bg-black rounded-md mr-8' altText='Login' onClick={() => { console.log("Login") }}>Login</ToastAction>
      })
    } else {
      setLoading(false)
      return toast({
        title: "Uh oh! You are already subscribed",
        action: <ToastAction
          className='border px-2 py-1 text-white bg-black rounded-md mr-8'
          altText='Login'
          onClick={() => { console.log("Login") }}
        >
          Login
        </ToastAction>
      })
    }
  }
  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 sm:h-[90vh] h-[35vh] px-5 md:px-12 lg:px-28">
      <div className="shadow-lg flex justify-center items-center gap-3">
        <div className="flex flex-col gap-3">
          <div className="sm:text-8xl  text-6xl">
            UNCOVER
          </div>
          <div className="sm:text-6xl text-4xl flex sm:gap-3 gap-2">
            <div className="sm:text-3xl text-2xl">The</div> UNEXPECTED
          </div>
          <div className='text-gray-500 sm:text-base text-sm italic font-serif'>
            There's more to the story than meets the eye.
          </div>
          <Form{...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full max-w-6xl gap-3 ">
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem >
                    <FormControl>
                      <Input className='bg-white sm:w-[250px] w-full' placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage className='absolute' />
                  </FormItem>
                )}
              />
              <Button disabled={loading} type="submit" className='hover:scale-110  transition ease-in-out delay-150  duration-300'>
                {loading ?
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  : "Subscribe"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="sm:block  hidden shadow-lg ">
        <div className="bg-white text-white h-full relative flex items-center">
          <div className="bg-grid-small-black/[50] absolute h-full w-full "></div>
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
          <div className="bg-white shadow-sm size-72 transition absolute ease-in-out delay-100 duration-300 text-black flex flex-col gap-3 justify-around rounded-full"></div>
          <div className="bg-white shadow-sm size-72 transition absolute ease-in-out delay-100 duration-300 text-black flex flex-col gap-3 justify-around right-0"></div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection