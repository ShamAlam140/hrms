import React ,{useState, useEffect} from "react";
import AllStaffTable from "../components/AllStaffTable";
import { NavLink } from "react-router-dom";
import axios from "axios";
import config from "../configuration/config";

const Staff = () => {
    const [searchText, setSearchText] = useState("");
    const [EmpList, setEmplist]= useState()
    
     useEffect(()=>{
       fetchdata()
     },[])

     const handleSearch = (e) => {
        setSearchText(e.target.value);
      };
     const fetchdata=async()=>{
       try {
         const res= await axios.get(`${config.baseURL}/api/user/getAllEmployees`)
         setEmplist(res.data.response)
         
       } catch (error) {
         
       }
   
     }
  return (
    <div className="w-full overflow-auto">
     
     <div className=" grid w-full justify-start items-end gap-[20px_7px] md:grid-cols-4 sm:grid-cols-2  md:auto-cols-auto">


<div className="flex flex-col  justify-center items-baseline text-9xl text-relia-energy-black">
    <div className=" font-extrabold">{EmpList?.length}</div>
    <div className=" text-sm leading-[24px] text-grey-70">
        Total staff
    </div>
</div>


<div className="w-[350px] col-span-1 flex flex-col items-start justify-start gap-[8px_0px]">
    <div className="">
        Quick search a staff
    </div>
    <div className="  h-[50px] text-grey-50">
        <input className=" h-[102%] w-[100.29%] p-2 rounded-3xs box-border border-[1px] border-solid border-grey-40" placeholder="Enter search word"
           value={searchText}
           onChange={handleSearch}
        />

    </div>
</div>




{/* <div className="flex flex-col items-start justify-start">
    <div className="flex flex-col items-start justify-start gap-[8px_0px]">
        <div className=" leading-[24px]">Filter staff</div>

        <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">All staff <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
        </svg>
        </button>


        <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                </li>
            </ul>
        </div>


    </div>
</div> */}
<div className="flex items-baseline">
  <NavLink to='/admin/staff/add-staff'>
  <button className="w-[180px] rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white">
    <div className=" leading-[24px]">Add new staff</div>
</button>
  </NavLink>

</div>






</div>

      <div className="mt-20">
        <AllStaffTable
         EmpList={EmpList?.filter((emp) => {
            const search = searchText.toLowerCase();
            return(
                emp.firstname.toLowerCase().includes(search) ||
    emp.lastname.toLowerCase().includes(search) ||
    emp.empId.toLowerCase().includes(search) ||
    emp.mobile.toLowerCase().includes(search)
            )
         }
           )} />
      </div>

    </div>
  )
}

export default Staff