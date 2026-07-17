import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios'
import config from "../configuration/config";
import { toast } from 'react-toastify';
import bannerImg from "../assets/hrms--500x500.webp";

import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);




  const handleLogin = async (useGoogleSignIn) => {
    try {
      if (useGoogleSignIn) {
        // Redirect to Google OAuth 2.0 authentication
        // window.location.href = `${config.baseURL}/auth/google`;

        window.open(`${config.baseURL}/auth/google`, "_self")
        // const response = await axios.get(`${config.baseURL}/auth/google`);
     
    
        // // Handle the response data (e.g., store user data in localStorage)
        // 


      } else {
        // Perform email/password login
        const response = await axios.post(`${config.baseURL}/api/user/login`, {
          email,
          password,
        });

        const data = response.data;
        
        if (response.status === 200) {
          toast.success("Login successful");
          

          // Store token and user data in localStorage
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          // Redirect user based on role
          if (data.user.role.toLowerCase() === 'admin') {
            navigate("/admin");
          } else if (data.user.role.toLowerCase() === 'manager') {
            navigate("/manager");
          } else if (data.user.role.toLowerCase() === 'hr') {
            navigate("/hr");
          } else if (data.user.role.toLowerCase() === 'employee' && data.user.approved) {
            navigate("/employee");
          }
        } else {
          setError(data.error);
          toast.error("Something went wrong");
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Something went wrong");
      setError("Internal Server Error");
    }
  };

  return (
    <>
      <div className="w-full container mx-auto">
        <div className="grid md:grid-cols-2 items-center  grid-cols-1 mt-[5rem] ">
          <div className="p-5 ml-10">

            <div className=" flex gap-[15rem]">
              <div className="  flex flex-col items-center justify-start gap-[4px_0px]">
                <img
                  className="w-[50.5px] relative h-[50.5px] mix-blend-multiply"
                  alt=""
                  src="/images/logo.png"
                />
                <div className="">
                  {/* <p className="m-0">
                    <b className="[background:linear-gradient(135deg,_#14add5,_#384295)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                      Susakgjyo
                    </b>
                  </p> */}
                  <p className="m-0">ERP System</p>
                </div>
              </div>

              <button className="border-[1px] h-[40px] rounded-3xs p-3 border-solid border-relia-energy-gradient  text-transparent !bg-clip-text [background:linear-gradient(135deg,_#14add5,_#384295)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </button>


            </div>

            <div className="self-stretch flex flex-col items-start justify-center mt-12">
              <div className="">Welcome back!!</div>
              <div className="relative text-9xl font-extrabold text-relia-energy-black">
                Please Sign In
              </div>
            </div>


            <div>
              <div className="mt-3 flex flex-col items-start justify-start gap-[8px_0px]">
                <div className="">
                  Email address
                </div>

                <input
                  type="text"
                  className="w-[50%] mt-2 h-12 px-4 border border-gray-300 rounded focus:outline-none focus:border-relia-energy-primary-color"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

              </div>

              <div className="mt-3 flex flex-col items-start justify-start gap-[8px_0px]">
                <div className="">Password </div>
                <input
                  type="password"
                  className="w-[50%] mt-2 h-12 px-4 border border-gray-300 rounded focus:outline-none focus:border-relia-energy-primary-color"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}

                />
              </div>

              <div className=" mt-3 flex flex-row items-start justify-start gap-[0px_76px] text-grey-70">
                {/* <div className="flex flex-row items-center justify-start gap-[0px_4px]">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="w-4 h-4 text-relia-energy-primary-color"
                  />
                  <div className="relative leading-[24px]">Remember me</div>
                </div> */}

                <NavLink to='/forget-password' className='no-underline'>
                  <div
                    className="relative leading-[24px] text-transparent !bg-clip-text [background:linear-gradient(135deg,_#14add5,_#384295)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] cursor-pointer"
                  // onClick={onIForgotMy1Click}
                  >
                    I forgot my password
                  </div>
                </NavLink>
              </div>

              <button className="w-[50%] mt-4 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[50px] flex flex-row items-center justify-center p-2.5 box-border text-white"
                onClick={()=>handleLogin(false)}
              >
                <div className="relative leading-[24px]">Sign In</div>
              </button>

              {/* <button
          className="w-[50%] mt-4 rounded-3xs bg-blue-600 text-white h-[50px] flex items-center justify-center p-2.5 box-border"
          onClick={() => handleLogin(true)} // Pass true to indicate Google sign-in
        >
          Sign In with Google
        </button> */}
            </div>


          </div>
          {/* image div  */}
          <div className="col-span-1">
            <img
              className=" hidden w-[90%] rounded-sm   object-cover md:block "
              alt=""
              src={bannerImg}
            />
          </div>
        </div>

      </div>



    </>

  );
};

export default Login;

