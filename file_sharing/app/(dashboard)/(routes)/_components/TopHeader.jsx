import { UserButton } from '@clerk/nextjs'
import { AlignJustify } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function TopHeader({setToggleBar}) {
  return (
    <div className='flex p-5 mr-2 border-b items-center justify-between md:justify-end'>
      <AlignJustify className='md:hidden hover:cursor-pointer' onClick={setToggleBar}/>
      <Image className='md:hidden' src="/logo1.svg" width={50} height={50}/>
      <UserButton 
        appearance={{
          elements: {
            avatarBox: "h-8 w-8", // Adjust the size of the avatar
            rootBox: "hover:opacity-80 transition-opacity", // Add hover effect
            userPreviewMainIdentifier: "font-bold", // Style the user's name
            userPreviewSecondaryIdentifier: "text-gray-500", // Style the user's email
            userButtonPopoverCard: "bg-white shadow-lg rounded-lg border border-gray-200", // Style the popover card
            userButtonPopoverActions: "p-2", // Add padding to the actions section
            userButtonPopoverActionButton: "hover:bg-gray-100 transition-colors rounded", // Style action buttons
            userButtonPopoverFooter: "border-t border-gray-200 mt-2 pt-2", // Style the footer
          },
          variables: {
            colorPrimary: '#0070f3', // Change the primary color
            colorText: '#333', // Change the text color
          },
        }}
      />
    </div>
  )
}

export default TopHeader
