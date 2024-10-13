"use client"

import { File, Shield, Upload, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

function SideNav({closeSideBar}) {
    const menuList = [
        {
            id:1,
            name:'Upload',
            icons: Upload,
            path:'/upload'
        },
        {
            id:2,
            name:'Files',
            icons: File,
            path:'/files'
        },
        {
            id:3,
            name:'About Us',
            icons: Users,
            path:'/about-us'
        }
    ]

    const[activeIndex, SetActiveIndex] = useState(0);
  return (
    <div className='shadow-sm border-r h-full'>
        <div className='p-4 border-b h-21'>
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10">
            <Image
              src="/logo1.svg"
              alt="File-sharing Logo"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
          <span className="text-xl font-bold text-black">File-sharing</span>
        </Link>
        </div>
        <div className='flex flex-col float-left w-full'>
            {menuList.map((item, index) =>(
                <Link href={item.path}>
                <button className={`flex gap-2 p-4 px-6 hover:bg-gray-100 w-full text-gray-500 ${activeIndex == index ? 'bg-blue-50 text-primary' : null} `}
                    onClick={()=> {SetActiveIndex(index); closeSideBar();}}
                >
                    <item.icons/>
                    <h2>{item.name}</h2>
                </button>
                </Link>
            ))}
        </div>
        
    </div>
  )
}

export default SideNav
