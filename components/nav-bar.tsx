import { Publication } from '@/data'
import React from 'react'
import { Button } from './ui/button'
import { DarkMode } from './ui/dark-mode'

const NavBar = () => {
  return (
    <div className="px-5 py-5 md:px-12 lg:px-28 justify-between flex items-center">
        <h1 className="heading text-2xl font-semibold">
          {Publication.publicationName}
        </h1>
        <div className="flex items-center gap-3">
          <DarkMode/>
          <Button>Login</Button>
        </div>
    </div>
  )
}

export default NavBar