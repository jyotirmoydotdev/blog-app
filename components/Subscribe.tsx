'use client'

import React from 'react'
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
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
    email : z.string().email({message:"Invalid message "})
})

const Subscribe = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {email:""}
    })
    function onSubmit(data: z.infer<typeof FormSchema> ){
        console.log(data)
    }
    return (
        <div className="sm:h-[40rem] h-[30rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.3] relative flex items-center justify-center">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className=" flex flex-col justify-center items-center text-center py-5 px-5 md:px-12 lg:px-28 gap-3">
                <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
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
                                    <Input className='bg-white sm:w-[250px] w-full' placeholder="Enter Email" {...field} />
                                </FormControl>
                                <FormMessage className='absolute'/>
                            </FormItem>
                        )}
                        />
                        <Button type="submit">Subscribe</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Subscribe