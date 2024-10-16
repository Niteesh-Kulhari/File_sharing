import React, { useEffect, useState } from 'react'
import AlerMessage from './AlerMessage';
import FilePreview from './FilePreview';
import ProgressBar from './ProgressBar';
import toast from 'react-hot-toast';

function UploadForm({uploadBtnClick, progress}) {
    const[file, setFile] = useState();
    const[errorMessage, setErrorMessage] = useState();

    const onFileSelect = (file) =>{
        //console.log(file)
        if(file && file.size>2000000){
            setErrorMessage("File size greater than 2 MB")
            return;
        }
        setErrorMessage(null);
        setFile(file);
    }

    // For Toast message
    useEffect(()=>{
        if(progress === 100){
            toast.success("Uploaded successfully");
        }
    },[progress]);

    
  return (
    <div className='text-center'>
      
        <div className="flex items-center justify-center w-full">
            <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-12 h-12 mb-4 text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-l lg:text-2xl text-gray-500"><span className="font-semibold">
                        <strong>Click to upload</strong>
                        </span> and 
                        <strong className='text-primary'> Share </strong> 
                        your 
                        <strong className='text-primary'> Files </strong></p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
                </div>
                <input 
                id="dropzone-file" 
                type="file" 
                className="hidden"
                onChange={(event) => onFileSelect(event.target.files[0])} />
            </label>
        </div>
        {errorMessage ? <AlerMessage msg={errorMessage}/> : null}
        {file ? <FilePreview file={file} removeFile={() => setFile(null)}/> : null}
        <div>
            {progress>0 ?<ProgressBar progress={progress}/> : 
                <button disabled={!file} className='bg-primary w-[30%] mt-5 rounded-full text-white 
                    p-2 disabled:bg-gray-500 hover:cursor-pointer' onClick={() => uploadBtnClick(file)}>
                    Upload
                </button> 
            }   
        </div> 

    </div>
  )
}

export default UploadForm
