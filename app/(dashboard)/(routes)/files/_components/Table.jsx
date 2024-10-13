"use client"

import { useUser } from '@clerk/nextjs';
import { app } from '../../../../../firebaseConfig'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

function Table() {
    const[documents, setDocuments] = useState([]);
    const db = getFirestore(app);
    const { user } = useUser();
    
    async function getUserUploadedDocuments(userEmail) {
        try {
            const docRef = collection(db, "uploadedFile");
            const q = query(docRef, where("userEmail", "==", userEmail));

            const querySnapshot = await getDocs(q);
            //console.log(querySnapshot)

            if(!querySnapshot.empty){
                const userDocument = [];

                querySnapshot.forEach((doc) => {
                    userDocument.push({id: doc.id, ...doc.data()});
                })
                setDocuments(userDocument);
            }else{
                console.log("No document found for this user");
            }
            
        } catch (error) {
            console.log("Error in retrieving data", error);
            
        }
    }

    useEffect(() => {
         if(user && user.primaryEmailAddress){
            //console.log(user.primaryEmailAddress.emailAddress)
            getUserUploadedDocuments(user.primaryEmailAddress.emailAddress);
         }
    },[user])

  return (
    <div className='flex justify-center w-full my-5'>
        <div class=" overflow-x-auto shadow-md sm:rounded-lg w-full max-w-7xl">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            File Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Type
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Size
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Uploaded by
                        </th>
                        <th scope="col" class="px-6 py-3">
                            URL
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Share
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {documents .length > 0 ? (
                        documents.map((file) => (
                            <tr class="odd:bg-white  even:bg-gray-50  border-b dark:border-gray-700 ">
                            <th scope="row" class="px-6 py-4 font-medium  whitespace-nowrap text-gray-900 ">
                                {file.fileName}
                            </th>
                            <td class="px-6 py-4">
                                {file.fileType}
                            </td>
                            <td class="px-6 py-4">
                                {((file.fileSize)/ (1024 *1024)).toFixed(2)} MB
                            </td>
                            <td class="px-6 py-4">
                                {file.userEmail}
                            </td>
                            <td class="px-6 py-4">
                                <a href={file.fileUrl} target='_blank' class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                            </td>
                            <td class="px-6 py-4">
                                <a href= {`/file-preview/${file.id}`}  target='_blank' class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Share</a>
                            </td>
                            </tr>
                        ))
                    )  : (
                        <tr>
                            <td colSpan="5" className="px-6 py-4 text-center">No documents found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        </div>


  )
}

export default Table
