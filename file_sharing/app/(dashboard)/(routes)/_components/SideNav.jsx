"use client"

import { File, Shield, Upload } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

function SideNav() {
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
            name:'Upgrade',
            icons: Shield,
            path:'/upgrade'
        }
    ]

    const[activeIndex, SetActiveIndex] = useState(0);
  return (
    <div className='shadow-sm border-r h-full'>
        <div className='p-4 border-b h-21'>
            <Image src='/logo1.svg' width={50} height={50}/>
        </div>
        <div className='flex flex-col float-left w-full'>
            {menuList.map((item, index) =>(
                <button className={`flex gap-2 p-4 px-6 hover:bg-gray-100 w-full text-gray-500 ${activeIndex == index ? 'bg-blue-50 text-primary' : null} `}
                    onClick={()=> SetActiveIndex(index)}
                >
                    <item.icons/>
                    <h2>{item.name}</h2>
                </button>
            ))}
        </div>
        
    </div>
  )
}

export default SideNav
