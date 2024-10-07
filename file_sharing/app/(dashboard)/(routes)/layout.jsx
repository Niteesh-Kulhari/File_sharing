"use client"
import React, { useState } from 'react'
import SideNav from './_components/SideNav'
import TopHeader from './_components/TopHeader'

function layout({children}) {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
        <div className=' h-full md:w-64 flex-col fixed inset-y-0 z-50 md:flex hidden'>
          <SideNav/>
        </div>

        {toggle && (
          <>
          {/* Backdrop to prevent background interaction */}
          <div 
            className="fixed inset-0 z-40 bg-black opacity-50"
            onClick={() => setToggle(false)}
          ></div>

          {/* Sidebar with larger width (full width on small screens) */}
          <div className='h-full w-80 flex-col fixed inset-y-0 z-50 bg-white'>
            <SideNav />
          </div>
        </>)}
        <div className='md:ml-64'>
          <TopHeader setToggleBar={() => setToggle(prev => !prev)}/>
          {children}
        </div>
      
    </div>
  )
}

export default layout
