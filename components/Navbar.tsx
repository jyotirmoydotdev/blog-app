import { publication } from '@/data';
import React from 'react'
import { FaPenNib } from "react-icons/fa";
import { Button } from './ui/button';  

const Navbar = () => {
  return (
    <div className='py-5 px-5 md:px-12 lg:px-28 flex justify-between items-center'>
        <div className=" flex items-center gap-3 text-2xl font-semibold">
            <FaPenNib />
            <p className="">
                {publication.name}
            </p>
        </div>
        <div className="">
            <Button>Login</Button>
        </div>
    </div>
  )
}

export default Navbar