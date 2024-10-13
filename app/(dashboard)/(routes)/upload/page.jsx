"use client"

import React, { useEffect, useState } from 'react'
import UploadForm from './_components/UploadForm'
import { app } from '../../../../firebaseConfig'
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'
import { doc, getFirestore, setDoc } from "firebase/firestore"
import { Toaster } from 'react-hot-toast'
import { useUser } from '@clerk/nextjs'
import { generateRandomString } from '../../../_utils/GenerateRandomString'
import { useRouter } from 'next/navigation'

function Upload() {
  const router = useRouter();
  const storage = getStorage(app);
  const [progress, setProgress] = useState(0);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [docId, setDocId] = useState("");
  const db = getFirestore(app);
  const { user } = useUser();

  const uploadFile = (file) => {
    const metadata = {
      contentType: file.type
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
          saveInfo(file, downloadURL)
        });
      },)
  }

  const saveInfo = async (file, fileUrl) => {
    const docId = generateRandomString();  // Unique ID based on timestamp
    await setDoc(doc(db, "uploadedFile", docId), {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      fileUrl: fileUrl,
      userEmail: user?.primaryEmailAddress.emailAddress,
      userName: user?.fullName,
      password: "",  // Placeholder for password if needed
      id: docId,
      shortUrl: process.env.NEXT_PUBLIC_BASE_URL + 'f/' + docId  // Generated short URL
    });
    setDocId(docId);
  }

  useEffect(() => {
    setUploadCompleted(true);
  },[progress === 100])

  useEffect(() => {
    // Redirect after upload is completed and docId is set
    if (uploadCompleted && docId) {
      //console.log("here")
      setTimeout(() => {
        router.push(`/file-preview/${docId}`);
        setUploadCompleted(false); // Reset state
      }, 2000); // Delay to allow the user to see completion
    }
  }, [uploadCompleted, docId]);

  return (
    <div className='p-5 px-8 md:px-28'>
      <h2 className='text-[20px] text-center m-5'>Start 
        <strong className='text-primary'> Uploading </strong> 
        Files and  
        <strong className='text-primary'> Share </strong> 
         them</h2>
      <Toaster/>   
      <UploadForm progress={progress} uploadBtnClick={(file)=>uploadFile(file)}/>
    </div>
  )
}

export default Upload
