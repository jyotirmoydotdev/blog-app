'use client'

import { Card, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { publication } from '@/data'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  subject: z.string({required_error:"subject is required"}).min(2).max(50),
  message: z.string({required_error:"message is required"}),
});

const page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      message: ""
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Encode the subject and body for use in a mailto link
    const mailtoLink = `mailto:?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(values.message)}`;

    // Open the mailto link in a new window/tab
    window.location.href = mailtoLink;
  }
  return (
    <div className="py-5 pb-10 px-5 md:px-12 lg:px-28 overflow-clip min-h-[100vh]">
      <div className="relative h-16 sm:h-52 mb-5 w-full gap-2 ">
        <div className="bg-grid-small-black/[0.2] h-full w-full flex-col flex justify-center items-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]"></div>
          <p className="text-xl sm:text-4xl font-semibold">Contact</p>
        </div>
      </div>
      <div className="max-w-xl mx-auto py-5 grid gap-3">
        <div className="flex justify-between">
          <div className="">Email</div>
          <div className="">{publication.email}</div>
        </div>
        <div className="flex justify-between">
          <div className="">Phone</div>
          <div className="">{publication.phone}</div>
        </div>
        <div className="flex justify-between gap-3">
          <div className="">Location</div>
          <div className="text-right">{publication.location}</div>
        </div>
      </div>
      <div className="max-w-xl mx-auto py-5 text-center">
        <hr className='border-slate-300'/>
      </div>
      <div className="max-w-xl mx-auto">
        <Card>
        <CardHeader>
          <CardTitle>Message</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your subject" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea className='h-[200px]' placeholder='Enter your message' {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center pt-3">
                <Button type="submit" className="w-full">Send</Button>
              </div>
            </form>
          </Form>
        </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default page