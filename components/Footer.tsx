import React from 'react'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from "react-icons/fa6";
import { FaPenNib } from "react-icons/fa";
import { publication } from '@/data';

const Footer = () => {
  return (
    <div className="flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center ">
        <div className=" flex items-center gap-3 text-2xl font-semibold">
            <FaPenNib color='white'/>
            <p className="text-white">
                {publication.name}
            </p>
        </div>
        <p className="sm:text-sm text-xs text-center sm:px-7 px-0 text-slate-500">All right reserved. Copyright @Blog-App | <u className='hover:text-white'>Privacy Policy</u>&nbsp;| &nbsp;<u className='hover:text-white'>Terms of Service</u></p>
        <div className="flex gap-5 sm:mt-0 mt-4">
            <FaYoutube size={20} color='white'/>
            <FaXTwitter size={20} color='white'/>
            <FaInstagram size={20} color='white'/>
        </div>
    </div>
  )
}

export default Footer