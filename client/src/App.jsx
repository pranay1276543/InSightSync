import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Email_Verify from "./pages/Email_Verify";
import Reset_Password from "./pages/Reset_Password";
import {ToastContainer} from 'react-toastify'
import Upload from "./pages/Upload";
import ResultPage from "./pages/ResultPage";
import Navbar from "./components/Navbar";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/email-verify",
      element: <Email_Verify />,
    },
    {
      path: "/reset-password",
      element: <Reset_Password />,
    },
    {
      path:'/upload-file',
      element:<Upload/>
    },
    {
      path:'/result-page',
      element:<ResultPage/>
    }
  ]);
  return (
    <div>
      <ToastContainer/>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
