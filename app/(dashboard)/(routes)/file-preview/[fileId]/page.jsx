"use client"

import { app } from '../../../../../firebaseConfig'
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'


function page({ params }) {
    const db = getFirestore(app);
    const[file, setFile] = useState("");
    const[password, setPassword] = useState("");

    const getFileInfo = async() => {
        //console.log(params?.fileId)
        const docRef = doc(db, "uploadedFile", params?.fileId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            //console.log(docSnap.data());
            setFile(docSnap.data());
        }else{
            console.log("No such document exists");
        }
    }

    const onPasswordSave = async(password) => {
        const docRef = doc(db, "uploadedFile", params?.fileId)
        await updateDoc(docRef, {
            password: password
        }).then(() => {
            toast.success("Password Saved")
        })
    }

    useEffect(()=>{
        params?.fileId && getFileInfo();
    },[params])

  return (
    <div>
        <Toaster/>
      <FileShareComponent file = {file} onPasswordSave={(password) =>  onPasswordSave(password) }/>
      {/* <div>password is: {password}</div> */}

    </div>
  )
}
import FileShareComponent from './_components/FileInfo'
import toast, { Toaster } from 'react-hot-toast';

export default page
