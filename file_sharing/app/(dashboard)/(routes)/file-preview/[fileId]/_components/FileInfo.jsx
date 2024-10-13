import React, { useEffect, useState } from 'react'
import { ArrowLeft, Copy, FileType } from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import GlobalApi from '../../../../../_utils/GlobalApi'
import { useUser } from '@clerk/nextjs'

export default function FileShareComponent({file, onPasswordSave}) {
  const [enablePassword, setEnablePassword] = useState(false)
  const [email, setEmail] = useState("")
  const[fileType, setFileType] = useState("");
  const[tempPassword, setTempPassword] = useState("");
  const { user } = useUser();
  const router = useRouter()

  const handleClick = () => {
    router.push('/upload')
  }

  const sendEmail = () => {
    const data = {
      emailToSend: email,
      userName: user?.fullName,
      fileName: file.fileName,
      fileSize: file.fileSize,
      fileType: file.fileType,
      shortUrl: file.shortUrl
    }
    //console.log(file.shortUrl)
    GlobalApi.SendEmail(data).then(res => {
      toast.success("Email Sent")})
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(file.shortUrl).then(() => {
        toast.success("Copied!!")
    })
  }

  const handleSave = () => {
    onPasswordSave(tempPassword);
  }
  useEffect(()=>{
    file && setFileType(file?.fileType.split('/')[0]);
  },[file]);
  //console.log(file.fileUrl)
  return (
    <div className="max-w-3xl mx-auto p-6">
      <button className="flex items-center text-gray-600 hover:text-gray-800 mb-4" onClick={handleClick}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Go to Upload
      </button>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <img
              src={fileType ==='image'? file?.fileUrl : '/file.png'}
              alt="React Native E-Learning App"
              className="w-full h-auto mb-4 rounded-lg"
            />
            <p className="text-center text-sm text-gray-500">
              {file.fileName}
              <br />
              {file.fileType}/{file.id}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="shortUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Short Url
            </label>
            <div className="flex">
              <input
                id="shortUrl"
                type="text"
                value={file.shortUrl}
                readOnly
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Copy URL" onClick={handleCopy}
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="enablePassword"
                checked={enablePassword}
                onChange={(e) => setEnablePassword(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="enablePassword"
                className="text-sm font-medium text-gray-700"
              >
                Enable Password?
              </label>
            </div>
            {enablePassword && (
                <>
                    <input
                        type="password"
                        onChange={(e) => setTempPassword(e.target.value)}
                        placeholder="Enter password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                        { tempPassword &&
                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2
                        focus:ring-blue-500 focus:ring-offset-2" onClick={handleSave}>
                            Save
                        </button>
                        }
                </>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Send File to Email
            </label>
            <input
              id="email"
              type="email"
              placeholder='Enter the email'
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 
            focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => sendEmail()}
            >
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}