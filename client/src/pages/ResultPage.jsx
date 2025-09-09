import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";

const ResultPage = () => {
  const { uploadedFile } = useContext(AppContext);
  const navigate = useNavigate()
  const handleCopy = () => {
  navigator.clipboard.writeText(uploadedFile.transcript)
    .then(() => {
      toast.success("Copied To Clipboard")
    })
    .catch(err => {
      toast.error("Failed to copy: ", err);
    });
};

  if (!uploadedFile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">No result available. Please upload a file first.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      
      <Navbar />

      
      <div className="flex flex-col items-center justify-center p-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-4xl mt-20">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center" >
            Summarized Result
          </h2>
          <p className="text-gray-800 whitespace-pre-line">
            {uploadedFile.transcript}
          </p>
        </div>

        <div className="flex flex-row gap-8 justify-center items-center mt-5">
          <button
          onClick={handleCopy}
          className="border border-gray-500 rounded-full bg-white px-8 py-2.5 hover:bg-gray-100 transition-all">
            Copy the Summarized Text
          </button>
          <button
          onClick={()=>navigate('/upload-file')}
          className="border border-gray-500 text-white rounded-full bg-blue-900 px-8 py-2.5 hover:bg-blue-500 hover:text-black transition-all">
            Upload Another File
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
