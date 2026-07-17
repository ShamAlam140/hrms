import React,{useEffect, useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import OtpInput from "react-otp-input";
import config from "../configuration/config";
const VerifyEmail = () => {
  const navigate = useNavigate()
    const [otp, setOtp] = useState('');
const [email, setEmail]= useState('')

    const [errorMsg, setErrorMsg] = useState('');
    useEffect(()=>{
   setEmail((localStorage.getItem('verifiedEmail')))   
    },[])

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`${config.baseURL}/api/user/verify-otp`, { email, otp });
        const data = response.data;
        if (response.status === 200 && data.success) {
          // Redirect to password reset page or display success message
          
          navigate('/reset-password')

        } else {
          setErrorMsg(data.msg);
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMsg("Internal Server Error");
      }
    };
    return (
      <>

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
                <div className=" ">2FA</div>
                <div className=" text-9xl font-extrabold text-relia-energy-black">
                Please enter the 2FA code sent to your mail.
                </div>
                <form onSubmit={handleSubmit}>
                   <div className="flex flex-col items-start justify-start gap-[48px_0px] text-grey-100">
           <OtpInput
                         value={otp}
                         onChange={setOtp}
                         numInputs={4}
                        
                         renderInput={(props) => <input {...props} />}
                         inputStyle="h-14 w-35 p-5 text-center text-6xl active:text-gray-500 bg-sky-100  shadow-sm ring-gray-300  outline-none"
                         containerStyle="flex gap-10"
                       />
             {/* <NavLink to='/reset-password' className='no-underline'> */}
             <button className="w-[350px] rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[50px] flex flex-row items-center justify-center p-2.5 box-border text-white">
               <div className="no-underline relative leading-[24px]">Verify</div>
             </button>
             {/* </NavLink> */}
           </div>
           </form>

              </div>
              {/* <div className="flex flex-col items-start justify-start gap-[48px_0px] text-grey-100">
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
              />
                      </div>
                  
                    </div>
                
                 
                  </div>
           
                </div>
                <NavLink to='/verify-email' className='no-underline'>
                <button className=" rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[50px] flex flex-row items-center justify-center p-2.5 box-border text-white">
                  <div className=" ">Send</div>
                </button>
                </NavLink>
                
              </div> */}
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
      </>


      //   <div className="container flex gap-6"> 
      //   <div className="w-[390px] relative bg-white h-[700px] overflow-hidden shrink-0 text-center text-smi text-gray font-heading-4 flex">
      //   <div className="absolute top-[64px] left-[20px] w-[350px] flex flex-row items-center justify-start gap-[0px_187px] ">
      //     <div className="w-[62.3px] relative h-[50px]">
      //       <img
      //         className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover hidden"
      //         alt=""
      //         src="/logo@2x.png"
      //       />
      //       <div className="absolute top-[calc(50%_-_36px)] left-[calc(50%_-_36.15px)] w-[72px] h-[72px] flex flex-col items-center justify-start gap-[4px_0px]">
      //         <img
      //           className="w-[35.5px] relative h-[35.5px]"
      //           alt=""
      //           src="/group-13.svg"
      //         />
      //         <div className="relative leading-[16px]">
      //           <p className="m-0">
      //             <b className="[background:linear-gradient(135deg,_#14add5,_#384295)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
      //               UiUxOtor
      //             </b>
      //           </p>
      //           <p className="m-0">ERP System</p>
      //         </div>
      //       </div>
      //     </div>
      //     <div className="w-[101px] rounded-3xs box-border h-[47px] flex flex-row items-center justify-center p-2.5 text-left text-sm border-[1px] border-solid border-relia-energy-gradient">
      //       <div className="relative leading-[24px] text-transparent !bg-clip-text [background:linear-gradient(135deg,_#14add5,_#384295)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
      //         Sign Up
      //       </div>
      //     </div>
      //   </div>
      //   <div className="absolute top-[170px] left-[20px] flex flex-col items-start justify-start gap-[48px_0px] text-left text-sm text-darkslategray">
      //     <div className="flex flex-col items-start justify-start">
      //       <div className="relative leading-[24px]">2FA</div>
      //       <div className="w-[350px] relative text-9xl font-extrabold text-gray inline-block">
      //         Please enter the 2FA code sent to your mail.
      //       </div>
      //     </div>
      //     <div className="flex flex-col items-start justify-start gap-[48px_0px] text-grey-100">
      //     <OtpInput
      //                   value={otp}
      //                   onChange={setOtp}
      //                   numInputs={4}
                        
      //                   renderInput={(props) => <input {...props} />}
      //                   inputStyle="h-14 w-35 p-5 text-center text-6xl active:text-gray-500 bg-sky-100  shadow-sm ring-gray-300  outline-none"
      //                   containerStyle="flex gap-10"
      //                 />
      //       <NavLink to='/reset-password' className='no-underline'>
      //       <button className="w-[350px] rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[50px] flex flex-row items-center justify-center p-2.5 box-border text-white">
      //         <div className="no-underline relative leading-[24px]">Verify</div>
      //       </button>
      //       </NavLink>
      //     </div>
    
      //   </div>

       
      //   </div>

      //   <div className="hidden md:block">
      //       <img src="/images/imgforget.png"/>
      //       </div>

      // </div>
    );
  };
  
  export default VerifyEmail;
  