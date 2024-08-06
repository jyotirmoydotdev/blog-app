import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const page = () => {
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
          <div className="">Location</div>
          <div className="">XYZ, Lorem ipsum dolor, sit amet consectetur</div>
        </div>
        <div className="flex justify-between">
          <div className="">Phone</div>
          <div className="">+00 0000000000</div>
        </div>
        <div className="flex justify-between">
          <div className="">Email</div>
          <div className="">example@gmail.com</div>
        </div>
      </div>
      <div className="max-w-xl mx-auto py-5 text-center">
        <hr className='border-slate-300'/>
      </div>
      <div className="max-w-xl mx-auto flex flex-col gap-3 py-5">
        <div className="text-2xl">
          Message
        </div>
        <div className="flex flex-col w-full gap-3">
          <Input type='name' placeholder='Enter you name' className='h-12'/>
          <Textarea placeholder='Write your message' className='min-h-[30vh]'></Textarea>
          <div className="text-right">
            <Button type='submit' className='px-10 hover:scale-110  transition ease-in-out delay-150  duration-300'>Send</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page