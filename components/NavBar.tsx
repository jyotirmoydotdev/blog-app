import { Publication } from '@/data'
import React from 'react'
import { Button } from './ui/button'
import { FaPenNib } from "react-icons/fa";

const NavBar = () => {
  return (
    <div className="px-5 py-5 md:px-12 lg:px-28 justify-between flex items-center">
        <h1 className="heading text-2xl font-semibold flex gap-3 items-center">
          <FaPenNib/>
          {Publication.publicationName}
        </h1>
        <Button variant={'outline'}>Login</Button>
    </div>
  )
}

export default NavBar