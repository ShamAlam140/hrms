import React,{useEffect, useState} from 'react';
import axios from 'axios';
import config from '../configuration/config';
import { toast } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
const Tickets = () => {
const navigate = useNavigate()
  const handleRedirect =()=>{
    // window.open(`http://localhost:3000/auth/google/ticket`, "_self")
     window.location.href = `${config.TicketProjectUrl}/auth/google/ticket`;
      // window.location.href='https://melodic-arcadia-417919.web.app/googleSigIn/login'

  }

  const handleRedirect2=()=>{
    
  }

  return (
    <div className="w-full   mt-16">
        <div className="mt-4 text-xl font-extrabold text-black p-4 mb-4">Ticket Management</div>
        <div className='flex gap-4 bg-slate-200 mt-10 justify-center'>
                <button className ='cursor-pointer w-40  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white'
                  onClick={handleRedirect}
                >
                  Go to your tickets

                </button>

                <button className ='cursor-pointer w-40  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white'
                  onClick={handleRedirect2}
                >
                  Go to your tickets

                </button>
            

            </div>
    </div>
  );
};

export default Tickets;
