"use client"

import { app } from '../../../firebaseConfig';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import FileItem from './_components/fileItem';
import Link from 'next/link';
import Image from 'next/image';

function FileView({params}) {
    const[file, setFile] = useState("");
    const db = getFirestore(app);

    const getFileInfo = async() => {
        //console.log(params?.fileId)
        const docRef = doc(db, "uploadedFile", params?.fileId);
        const docSnap = await getDoc(docRef);
        //console.log(docSnap.data())

        if(docSnap.exists()){
            //console.log(docSnap.data());
            setFile(docSnap.data());
        }else{
            console.log("No such document exists");
        }
    }

    useEffect(()=>{
        params?.fileId && getFileInfo();
    },[params])


  return (
    <div className='bg-gray-100 h-screen w-full flex justify-center items-center flex-col gap-4'>
        <Link href="/" className='mt-4'>
                <div className='flex items-center gap-4'>
                    <Image src="/logo1.svg" width={50} height={50} alt="Logo"  className='h-auto'/>
                    <h1 className="font-bold">File-Sharing</h1>
                </div>
        </Link>
      <FileItem file={file}/>
    </div>
  )
}

export default FileView
