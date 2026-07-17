import { useState, useCallback, useEffect } from "react";
import UserDropdown from "./UserDropdown";
import MemoTable from "../components/MemoTable";
import StaffListTable from "../components/StaffListTable";
import PaymentVouchersTable from "../components/ProjectTable";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import axios from "axios";
import config from "../configuration/config";
import ProjectTable from "../components/ProjectTable";
// import PortalPopup from "./portal-popup";

const Dashbaord = () => {
    const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
    const [memoList , setMemoList]=useState()
    const [appList , setAppList]=useState()
    const [stafflist , setStafflist]=useState()
    const [depList, setDepList]= useState([])
    const [projectList, setProjectList]= useState([])
    const [empApplications , setempApplication]=useState()

    useEffect(()=>{
        fetchmemo();
        fetchstaff();
        fetchApplication()
        fetchdepart()
        fetchprojects()
        fetchempApplicaiton()
    },[])

    const fetchempApplicaiton= async()=>{
        const response = await axios.get(`${config.baseURL}/api/user/employee-requests`)
        setAppList(response.data.data)
  }

  
      const fetchdepart= async()=>{
        const res = await axios.get(`${config.baseURL}/department/all/departments`)
        setDepList(res.data.departments)

      }

      const fetchprojects= async()=>{
        const res = await axios.get(`${config.baseURL}/projects/get-projects`)
        setProjectList(res.data)

      }

     const fetchmemo=async()=>{
        const res = await axios.get(`${config.baseURL}/memo/getMemo`)
    
        setMemoList(res.data)
     }
     const fetchApplication=async()=>{
        const res = await axios.get(`${config.baseURL}/api/user/employee-requests`)
    
        setempApplication(res.data)
     }
     const fetchstaff=async()=>{
        const res = await axios.get(`${config.baseURL}/api/user/getAllEmployees`)
        
        setStafflist(res.data.response)
     }
     
     const fetchpaymentvoucher=()=>{

     }

    return (
        <>
            <div className="wd:mx-5  bg-ghostwhite  overflow-hidden text-left text-9xl text-grey-100 font-body-3-small">
                {/* upper div starts */}

                <div className="flex  flex-wrap md:flex-wrap gap-2">

                    <div className=" rounded-xl shadow-md">
                        <div className="flex gap-3 p-5 items-start justify-start ">
                            <div>
                                <div className=" font-extrabold text-9xl">{stafflist?.length}</div>
                                <div className=" text-base leading-[24px]">
                                    Total number of staff
                                </div>
                            </div>
                            <div>
                                <img
                                    className=" w-[50px] h-[50px]"
                                    alt=""
                                    src="/images/Group 9.png"
                                />
                            </div>
                        </div>

                        <div className="flex flex-row items-center justify-start text-xs text-grey-70 m-2">
                         <FaLongArrowAltUp/>
                            <div className="relative leading-[20px]">
                                12 more than last quarter
                            </div>
                        </div>
                    </div>

                    {/* total application */}

                    <div className=" rounded-xl shadow-md">
                        <div className="flex gap-3 p-5 items-start justify-start ">
                            <div>
                                <div className=" font-extrabold">{empApplications ? 0 : empApplications?.length}</div>
                                <div className=" text-base leading-[24px]">
                                    Total Application
                                </div>
                            </div>
                            <div>
                                <img
                                    className=" w-[50px] h-[50px]"
                                    alt=""
                                    src="/images/img1.png"
                                />
                            </div>
                        </div>

                        <div className="flex flex-row items-center justify-start text-xs text-grey-70 m-2">
                            <FaLongArrowAltDown/>
                            <div className="relative leading-[20px]">
                                0.2% than last quater
                            </div>
                        </div>
                    </div>

                    {/* Total projects */}

                    <div className=" rounded-xl shadow-md">
                        <div className="flex gap-3 p-5 items-start justify-start ">
                            <div>
                                <div className=" font-extrabold">{projectList?.length}</div>
                                <div className=" text-base leading-[24px]">
                                    Total Projects
                                </div>
                            </div>
                            <div>
                                <img
                                    className=" w-[50px] h-[50px]"
                                    alt=""
                                    src="/images/img2.png"
                                />
                            </div>
                        </div>

                        <div className="flex flex-row items-center justify-start text-xs text-grey-70 m-2">
                         <FaLongArrowAltUp/>
                            <div className="relative leading-[20px]">
                                2% more than last quater
                            </div>
                        </div>
                    </div>

                    {/* Total departments */}

                    <div className=" rounded-xl shadow-md">
                        <div className="flex gap-3 p-5 items-start justify-start ">
                            <div>
                                <div className=" font-extrabold">{depList?.length}</div>
                                <div className=" text-base leading-[24px]">
                                    Total Departments
                                </div>
                            </div>
                            <div>
                                <img
                                    className=" w-[50px] h-[50px]"
                                    alt=""
                                    src="/images/img3.png"
                                />
                            </div>
                        </div>


                    </div>


                </div>



                {/* close */}
                <div className="w-full overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 md:mt-5 md:justify-items-stretch gap-5  mt-5 ">
                        <MemoTable memoList={memoList} />
                        <StaffListTable stafflist={stafflist} />
                        <ProjectTable  data={projectList} />

                        <div className=" text-xl text-relia-energy-black mt-8">

                            <div className=" w-[412px] h-[251px]">
                                <div className="font-extrabold">
                                    Staff Applications Card
                                </div>
                                <div className=" w-[412px] h-[152px] text-base">
                                    <div className=" flex flex-col items-start justify-start gap-[24px_0px]">
                                        <div className="font-extrabold">
                                            13 Total applications
                                        </div>
                                        <div className="flex  gap-10">


                                            <div className="flex flex-col items-start justify-start gap-[20px_0px]">
                                                <div className="flex flex-row items-center justify-start gap-[0px_8px]">
                                                    <div className="w-1.5 relative rounded-21xl bg-accent-orange h-5" />
                                                    <div className="relative">
                                                        <span className="font-extrabold">{appList?.length}</span>
                                                        <span className="text-xs leading-[20px]"> Pending</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-row items-center justify-start gap-[0px_8px]">
                                                    <div className="w-1.5 relative rounded-21xl bg-accent-green h-5" />
                                                    <div className="relative">
                                                        <span className="font-extrabold">{stafflist?.length}</span>
                                                        <span className="text-xs leading-[20px]"> Approved</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-row items-center justify-start gap-[0px_8px]">
                                                    <div className="w-1.5 relative rounded-21xl bg-secondary-shades-60 h-5" />
                                                    <div className="relative">
                                                        <span className="font-extrabold">1</span>
                                                        <span className="text-xs leading-[20px]"> Rejected</span>
                                                    </div>
                                                </div>
                                               

                                            </div>
                                            <div className=" w-[150px] h-[150px] text-black">
                                                    {/* <img
                                                        className=" w-[150px] h-[150px]"
                                                        alt=""
                                                        src="/group-22.svg"
                                                    /> */}
                                                    <div className="hidden flex-col items-center justify-start">
                                                        <div className="relative font-extrabold">60%</div>
                                                        <div className="relative text-sm leading-[24px] mt-[-6px]">
                                                            Done
                                                        </div>
                                                    </div>
                                                </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>



                        {/* grid close */}
                    </div>
                </div>













                {/* lower */}














                <div className="flex justify-center w-full mt-5 h-5 text-xs text-grey-80">
                    <div className=" leading-[20px] whitespace-pre-wrap">
                        Copyright © 2022 Relia Energy. All Rights Reserved
                    </div>
                </div>

            </div>
            {/* {isUserDropdownOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeUserDropdown}
        >
          <UserDropdown onClose={closeUserDropdown} />
        </PortalPopup>
      )} */}
        </>
    );
};

export default Dashbaord;
