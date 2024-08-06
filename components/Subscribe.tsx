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
    email : z.string().email({message:"Invalid email "})
})

const Subscribe = () => {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {email:""}
    })

    const [loading, setLoading] = useState(false);

    async function onSubmit(data: z.infer<typeof FormSchema> ){
        setLoading(true)
        const formData = new FormData();
        formData.append("email", data.email);
        const response = await axios.post("/api/email", formData);
        if (response.data.success){
            form.reset()
            setLoading(false)
            return toast({
                title: "Yhoo! You are subscribed",
                action: <ToastAction className='border px-2 py-1 text-white bg-black rounded-md mr-8' altText='Login' onClick={()=>{console.log("Login")}}>Login</ToastAction>
            })
        }else{
            setLoading(false)
            return toast({
                title: "Uh oh! You are already subscribed",
                action: <ToastAction 
                            className='border px-2 py-1 text-white bg-black rounded-md mr-8' 
                            altText='Login' 
                            onClick={()=>{console.log("Login")}}
                            >
                                Login
                        </ToastAction>
            })
        }
    }
    return (
        <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className=" flex flex-col justify-center items-center text-center py-5 px-5 md:px-12 lg:px-28 gap-3">
                <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-blue-500 py-8">
                    Never miss a thing
                </p>
                <p className="font-light text-sm sm:text-base px-5">
                    Subscribe to our newsletter and you will always have our latest blog posts and news right on your fingertips.
                </p>
                <p className="font-light text-sm sm:text-base px-5">
                    We promise not to send you lots of emails, onky once a week, on Sundays.
                </p>
                <Form{...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" flex justify-center w-full max-w-6xl items-center gap-3 pt-7 z-0">
                        <FormField
                        control={form.control}
                        name='email'
                        render={({field})=>(
                            <FormItem >
                                <FormControl>
                                    <Input className='bg-white sm:w-[250px] w-full' placeholder="Enter email" {...field} />
                                </FormControl>
                                <FormMessage className='absolute'/>
                            </FormItem>
                        )}
                        />
                        <Button disabled={loading} type="submit">
                            {loading?
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            :"Subscribe"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Subscribe