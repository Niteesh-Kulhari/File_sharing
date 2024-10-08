"use client"
import React, { useState } from 'react'
import UploadForm from './_components/UploadForm'
import { app } from '@/firebaseConfig'
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'

function Upload() {
  const storage = getStorage(app);
  const [progress, setProgress] = useState()

  const uploadFile = (file) => {
    const metadata = {
      contetType: file.type
    }

    const storageRef = ref(storage, 'file-upload/' + file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file, file.type);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setProgress(progress)
        progress == 100 && getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      },)
  }

  return (
    <div className='p-5 px-8 md:px-28'>
      <h2 className='text-[20px] text-center m-5'>Start 
        <strong className='text-primary'> Uploading </strong> 
        Files and  
        <strong className='text-primary'> Share </strong> 
         them</h2>
      <UploadForm progress={progress} uploadBtnClick={(file)=>uploadFile(file)}/>
    </div>
  )
}

export default Upload
