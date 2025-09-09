import React, { use, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import {useNavigate} from "react-router-dom"
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const {userData,isLoggedin} = useContext(AppContext)
  console.log(userData)
  const onClickGetStrartedHandler = (e)=>{
    e.preventDefault();
    if(!isLoggedin){
      navigate('/login')
    }
    else if(!userData.isAccountVerified){
      toast.error("Verify Your Account First")
    }else{
      navigate('/upload-file')
    }
  }
  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
      <img
        src={assets.header_img}
        alt=""
        className="w-50 h-40 rounded-full mb-6"
      />

      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        Hey {userData? userData.name : "Developer"}{" "}
        <img className="w-8 aspect-square" src={assets.hand_wave} alt="" />
      </h1>

      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Welcome to InSightSync
      </h2>

      <p className="mb-8 max-w-md">
        Upload any audio or video file and get an instant, easy-to-read summary. Save time by turning long recordings into clear, concise insights.
      </p>

      <button
      onClick={onClickGetStrartedHandler}
      className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all">
        Get Started
      </button>
    </div>
  );
};

export default Header;
