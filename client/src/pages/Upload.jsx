import React from 'react'
import Navbar from '../components/Navbar'
import Upload_area from '../components/Upload_area'

const Upload = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
        <Navbar/>
        <Upload_area/>
    </div>
  )
}

export default Upload