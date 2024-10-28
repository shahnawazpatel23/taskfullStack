import React, { useState } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import api from '../api';

const Navbar = ({ setFileId }) => {
  const [file, setFile] = useState(null);
  const [upload,setUpload] =useState(false);

  const uploadPdf = async () => {
    if (!file) {
      alert("Please select a PDF file first.");
      return;
    }
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/upload_pdf/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const uploadedFileId = response.data.file_id;
      setFileId(uploadedFileId);  
      setUpload(true);
      console.log("PDF uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading PDF:", error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  return (
    <div className="w-full border-b p-3 md:p-6 flex items-center justify-between">
      {/* Logo */}
      <div className="text-lg md:text-xl font-semibold">LOGO</div>

      {/* File Upload Section */}
      <div className="flex items-center space-x-2">
        {file && (
          <span className="text-gray-600 text-sm truncate max-w-xs">
            {file.name.length > 5 ? `${file.name.slice(0,4)}...` : file.name}
          </span>
        )}
        <input
          type="file"
          onChange={handleChange}
          accept="application/pdf"
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="flex items-center gap-2 p-2 border border-gray-300 rounded-lg cursor-pointer"
        >
          <CiCirclePlus />
          <span className='hidden md:block'>Select PDF</span>
        </label>
        <button disabled={!file} onClick={uploadPdf} className="px-4 py-2 bg-blue-500 text-white cursor-pointer rounded-lg disabled:bg-blue-200">
          {upload? 'Uploaded' : 'Upload'}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
