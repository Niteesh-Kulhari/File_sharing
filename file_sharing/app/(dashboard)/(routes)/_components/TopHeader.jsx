import { UserButton } from '@clerk/nextjs'
import { AlignJustify } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function TopHeader({setToggleBar}) {
  return (
    <div className='flex p-7 border-b items-center justify-between md:justify-end'>
      <AlignJustify className='md:hidden hover:cursor-pointer' onClick={setToggleBar}/>
      <Image className='md:hidden' src="/logo1.svg" width={50} height={50}/>
      <UserButton/>
    </div>
  )
}

export default TopHeader
