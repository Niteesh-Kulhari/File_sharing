import React, { useState } from 'react';

export default function FileShareComponent({file}) {
  const [password, setPassword] = useState('');

  return file && (
    <div className="flex items-center justify-center  bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4">
          <span className="text-blue-600">{file?.userEmail?.split("@")[0]}</span> Shared the file with You
        </h1>
        <p className="text-gray-600 mb-10 text-center">Find File details below</p>

        <div className="flex justify-center mb-10">
          <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13 2V9H20" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 11V17" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; 0 2; 0 0"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </path>
            <path d="M9 14L12 17L15 14" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; 0 2; 0 0"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </path>
            <rect x="7" y="18" width="10" height="2" rx="1" fill="#2563EB">
              <animate
                attributeName="width"
                values="0; 10"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </rect>
          </svg>
        </div>

        <p className="text-center text-gray-700 mb-12">
          {file.fileName} ⚡ {file?.fileType?.split("/")[0]} ⚡ {(file.fileSize / (1024 * 1024)).toFixed(2)} MB
        </p>

        { file.password.length > 0 ? <input
          type="password"
          placeholder="Enter password to acces"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        /> : null}

        <button
        disabled={password !== file.password} // Disable button if password is empty
        className={`w-full py-2 px-4 rounded-md transition duration-300 mb-4 ${
            file.password.length === 0 || (password === file.password) ? 'bg-primary text-white hover:bg-blue-700' : 'bg-gray-400 text-gray-300 cursor-not-allowed'
        }`}
        onClick={() => window.open(file?.fileUrl)}
        >
        Download
        </button>

        <p className="text-xs text-gray-500 text-center">*Term and Condition apply</p>
      </div>
    </div>
  );
}