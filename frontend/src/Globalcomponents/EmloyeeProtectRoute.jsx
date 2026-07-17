import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeProtectRoute = ({ Component }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const login = JSON.parse(localStorage.getItem('user'))
   
   if(login){
       if (login.role.toLowerCase() !== "employee" ) navigate("/");
   }else(navigate('/'))
  }, []);
  return (
    <div>
      <Component />
    </div>
  );
};

export default EmployeeProtectRoute;
