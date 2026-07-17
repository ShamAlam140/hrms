import React,{useEffect, useState} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import config from "../configuration/config";
const ResetPassword = () => {
  const navigate=useNavigate();
    const[resetToken,setresetToken]=useState('')
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

useEffect(()=>{
  setresetToken(localStorage.getItem("resetToken"))
},[])
const handleResetPassword = async () => {
  try {
    const response = await axios.post(`${config.baseURL}/api/user/reset-password?token=${resetToken}`, {
      password: newPassword
    });

    if (response.data.success) {
      setMessage(response.data.msg);
      // Reset form fields
      setNewPassword("");
      setConfirmPassword("");
      navigate('/')

    } else {
      setMessage(response.data.msg);
    }
  } catch (error) {
    console.error("Error resetting password:", error);
    setMessage("An error occurred while resetting your password.");
  }
};
    return (
      <div>
        <div className="flex justify-around">

        <div className="w-[390px] relative bg-white h-[700px] overflow-hidden shrink-0 text-center text-smi text-gray font-heading-4">
        <div className="absolute top-[64px] left-[20px] w-[350px] flex flex-row items-center justify-start gap-[0px_187px]">
          <div className="w-[62.3px] relative h-[50px]">
        
            <div className="absolute top-[calc(50%_-_36px)] left-[calc(50%_-_36.15px)] w-[72px] h-[72px] flex flex-col items-center justify-start gap-[4px_0px]">
            <img
                  className="w-[50.5px] relative h-[50.5px]"
                  alt=""
                  src="/images/logo.png"
                />
              <div className="relative leading-[16px]">
              
                <p className="m-0">ERP System</p>
              </div>
            </div>
          </div>
          <button className="w-[101px] rounded-3xs box-border h-[47px] flex flex-row items-center justify-center p-2.5 text-left text-sm border-[1px] border-solid border-relia-energy-gradient"
          onClick={()=>navigate('/signup')}
          >
            <div className="relative leading-[24px] text-transparent !bg-clip-text [background:linear-gradient(135deg,_#14add5,_#384295)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              Sign Up
            </div>
          </button>
        </div>
        <div className="p-6 max-w-sm mx-auto bg-white   flex items-center space-x-4">
        <div className="absolute top-[170px] left-[20px] flex flex-col items-start justify-start gap-[48px_0px] text-left text-sm text-darkslategray">
          <div className="flex flex-col items-start justify-start">
            <div className="relative leading-[24px]">Password recovery</div>
            <div className="w-[350px] relative text-9xl font-extrabold text-gray inline-block">
              Password reset
            </div>
            <div className="w-[350px] relative leading-[24px] inline-block">
              Kindly enter a new password.
            </div>
          </div>
          <div>
            <div>
                <h3>New Password</h3>
                <div className="border flex justify-center items-center shadow-md shadow-sky-300/100 ">
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type='password'
                    required
                    className="h-14 w-full block p-2 text-xl outline-none"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    // onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  </div>

                </div>
          </div>
          <div className="flex flex-col mt-2">
                <label htmlFor="confirmPassword" className="mb-2">
                  Comfirm New Password
                </label>
                <div className="border flex justify-center items-center shadow-md shadow-sky-300/100 ">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="h-14 w-full block p-2 text-xl outline-none"
                    value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
                    // onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <div className="mr-2 cursor-pointer">
                    {/* {visibility2 ? (
                      <RemoveRedEyeIcon
                        onClick={() => setVisibility2(!visibility2)}
                      />
                    ) : (
                      <VisibilityOffIcon
                        onClick={() => setVisibility2(!visibility2)}
                      />
                    )} */}
                  </div>
                </div>
              </div>
          <div className="flex flex-col items-start justify-start gap-[48px_0px] text-grey-100">
          
            <button className="w-[350px] rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[50px] flex flex-row items-center justify-center p-2.5 box-border text-white"
             onClick={handleResetPassword}
            >
              <div className="relative leading-[24px]">Reset</div>
            </button>
          </div>
        </div>
        </div>
      </div>
      <img src="/images/imgforget.png"/>
        </div>
      </div>
    );
  };
  
  export default ResetPassword;
  