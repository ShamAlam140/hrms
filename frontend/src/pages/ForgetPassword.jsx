import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../configuration/config";
const ForgetPassword = () => {
  const navigate= useNavigate()
  const [email, setEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.baseURL}/api/user/forget-password`, { email });
      const data = response.data;
      
      if (response.status === 200 && data.success) {
        setSuccessMsg(data.msg);
        localStorage.setItem("resetToken", data.resetToken);
        localStorage.setItem("verifiedEmail", email);
        navigate('/verify-email')

      } else {
        setErrorMsg(data.msg);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg("Internal Server Error");
    }
  };



    return (
      <div className="container mx-auto my-auto bg-white overflow-hidden text-center text-smi text-relia-energy-black font-heading-4 grid md:grid-cols-2  grid-cols-1 ">
        <div className="p-10 ">
          <div className=" bg-white " />
          <div className=" ">
            <div className=" flex flex-row items-center justify-between">
              <div className="">
              
                <div className=" flex flex-col items-center justify-start gap-[4px_0px]">
                <img
                  className="w-[50.5px] relative h-[50.5px]"
                  alt=""
                  src="/images/logo.png"
                />
                  <div className=" ">
                    {/* <p className="m-0">
                      <b className="[background:linear-gradient(135deg,_#14add5,_#384295)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                        UiUxOtor
                      </b>
                    </p> */}
                    <p className="m-0">ERP System</p>
                  </div>
                </div>
              </div>
              <button className="w-[101px] rounded-3xs box-border h-[47px] flex flex-row items-center justify-center p-2.5 text-left text-sm border-[1px] border-solid border-relia-energy-gradient"
              onClick={()=>{navigate('/signup')}}
              >
                <div className="  text-transparent !bg-clip-text [background:linear-gradient(135deg,_#14add5,_#384295)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                  Sign Up
                </div>
              </button>
            </div>
            <div className="flex flex-col items-start justify-start gap-[48px_0px] text-left text-sm text-grey-80 mt-10">
              <div className="flex flex-col items-start justify-start">
                <div className=" ">Password recovery.</div>
                <div className=" text-9xl font-extrabold text-relia-energy-black">
                  Forgot your password?
                </div>
                <div className="   inline-block">
                  Kindly enter the email address linked to this account and we
                  will send you a code to enable you change your password.
                </div>
              </div>
              <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-start justify-start gap-[48px_0px] text-grey-100">
                <div className=" flex flex-col items-start justify-start gap-[16px_0px]">
                  <div className="flex flex-col items-start justify-start gap-[24px_0px]">
                    <div className=" flex flex-col items-start justify-start gap-[5px_0px]">
                      <div className=" flex flex-col items-start justify-start gap-[8px_0px]">
                        <div className=" ">
                          Email address
                        </div>
                        <input
                type="text"
                className="w-full h-12 px-4 border border-gray-300 rounded focus:outline-none focus:border-relia-energy-primary-color"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
             
             />
                      </div>
                  
                    </div>
                
                 
                  </div>
           
                </div>
                {/* <NavLink to='/verify-email' className='no-underline'> */}
                <button className=" rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[50px] flex flex-row items-center justify-center p-2.5 box-border text-white">
                  <div className=" ">Send</div>
                </button>
                {/* </NavLink> */}
                
              </div>
              </form>
            </div>
          </div>
        </div>




        <div className="hidden md:block">
          <div className=" bg-relia-energy-primary-color " />
          <img
            className=" object-cover"
            alt=""
            src="/images/imgforget.png"
          />
        </div>
      </div>
    );
  };
  
  export default ForgetPassword;
  