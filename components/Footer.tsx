import React from 'react'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from "react-icons/fa6";
import { publication } from '@/data';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="flex justify-around flex-col sm:flex-row bg-black text-white p-5 gap-3  items-center">
      <div className="flex items-center gap-3 text-2xl font-semibold">
        <p className="">
          {publication.name}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-1 text-xs items-center">
        <div className="">
          All right reserved. Copyright @{publication.name}
        </div>
        <Link className='underline' href={"/privacy"}>Privacy Policy</Link>
        <Link className='underline' href={"/terms"}>Terms and Condition</Link>
      </div>
      <div className="flex gap-5 sm:mt-0 mt-4">
        <Link href={publication.social.youtube}>
          <FaYoutube size={18} color='white' />
        </Link>
        <Link href={publication.social.twitter}>
          <FaXTwitter size={18} color='white' />
        </Link>
        <Link href={publication.social.instagram}>
          <FaInstagram size={18} color='white' />
        </Link>
      </div>
    </div>
  )
}

export default Footer