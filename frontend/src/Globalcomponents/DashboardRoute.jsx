import axios from 'axios'
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from '../configuration/config';
import { toast } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";
const DashboardRoute = ({ Component }) => {
  const navigate = useNavigate();
  useEffect(() => {
//     const login = JSON.parse(localStorage.getItem('user'))
//    
//    if(login){

//        if (login.role.toLowerCase() !== "admin" ) navigate("/");
//    }else(navigate('/'))
    fetchuser()

  }, []);

  const fetchuser= async()=>{
    try {
        const  res= await axios.get(`${config.baseURL}/auth/login/success`,{withCredentials:true})
        

        if (res.status === 200) {
            // toast.success("Login successful");
      
  
            // Store token and user data in localStorage
            // localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(res.data));
  
            // Redirect user based on role
            if (res.data.role.toLowerCase() === 'admin') {
              navigate("/admin");
            } else if (res.data.role.toLowerCase() === 'manager') {
              navigate("/manager");
            } else if (res.data.role.toLowerCase() === 'hr') {
              navigate("/hr");
            } else if (res.data.role.toLowerCase() === 'employee' && res.data.approved) {
              navigate("/employee");
            }   else {
              
                toast.error("Something went wrong");
              }
            }
    } catch (error) {
        
    }
  }
  return (
    <div>
      {/* <Component /> */}
    </div>
  );
};

export default DashboardRoute;
