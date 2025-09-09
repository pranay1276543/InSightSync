import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Upload_area = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { backendUrl, setUploadedFile } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const { data } = await axios.post(backendUrl + "api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        setUploadedFile(data);
        navigate("/result-page"); // go to result page
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center space-y-4 w-96"
      >
        <h2 className="text-xl font-semibold text-gray-700">Upload a File</h2>

        <input
          onChange={handleChange}
          type="file"
          className="block w-full text-sm text-gray-500 
          file:mr-4 file:py-2 file:px-4 
          file:rounded-lg file:border-0 
          file:text-sm file:font-semibold 
          file:bg-blue-50 file:text-blue-700 
          hover:file:bg-blue-100"
        />

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow 
          hover:bg-blue-700 transition duration-200"
        >
          {loading ? "Processing..." : "Upload File"}
        </button>
      </form>
    </div>
  );
};

export default Upload_area;
