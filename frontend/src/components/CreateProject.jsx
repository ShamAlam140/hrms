import React, {useState, useEffect} from "react";
import {  Select } from "antd";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import axios from "axios";
import config from "../configuration/config";
import { toast } from "react-toastify";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";


const CreateProject = () => {
    const navigate= useNavigate()
    const[currUser, setCurrUser]=useState()
    const [formData, setFormData] = useState({
        projectName: "",
        projectTitle: "",
        description: "",
        duration: "",
        tickets: "",
        teamAssign: "",
        manager: "",
    
    });

    const [managers, setManagers] = useState([]);

    useEffect(()=>{
       setCurrUser(JSON.parse(localStorage.getItem('user')))
        fetchMangers();
     
      },[])
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const fetchMangers=async()=>{
        const res= await axios.get(`${config.baseURL}/api/user/get-managers`)
        setManagers(res.data.managers)
    
    }
 

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${config.baseURL}/projects/create-project`, formData);
            
            toast.success("project created successfully")
            // Redirect or show success message
        } catch (error) {
            toast.error("something went wrong")
            console.error("Error creating project:", error);
            // Handle error (show error message, log, etc.)
        }
    };
    



      const handleChangeManager = (value) => {
        setFormData({
          ...formData,
          manager: value // Update the manager field in formData
        });
      };
    

    return (
        <div className="w-full overflow-auto">

            <div className="shadow-md  p-4 ">
            <div className="flex items-center cursor-pointer">
                    <span onClick={() => { currUser?.role.toLowerCase()==='admin' ? navigate('/admin/projects') : navigate('/manager/projects') }}>
                        <FaLongArrowAltLeft />Back
                    </span>

                </div>
                <div className="font-bold md:text-base flex mt-5">Create project</div>
                <div className='grid grid-cols-1 md:grid-cols-3 md:gap-3 '>




                <div className="mt-4">
                        <label htmlFor="projectName" className="block text-sm text-gray-700 text-left">
                            Project Name
                        </label>
                        <input
                            type="text"
                            id="projectName"
                            className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter Name"
                            onChange={handleChange}
                            value={formData.projectName}
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="projectTitle" className="block text-sm text-gray-700 text-left">
                            Project Title
                        </label>
                        <input
                            type="text"
                            id="projectTitle"
                            className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter title"
                            onChange={handleChange}
                            value={formData.projectTitle}
                        />
                    </div>


                    <div className="mt-4">
                        <label htmlFor="duration" className="block text-sm text-gray-700 text-left">
                           Duration
                        </label>
                        <input
                            type="text"
                            id="duration"
                            className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter duration"
                            onChange={handleChange}
                            value={formData.duration}
                        />
                    </div>

                    

                  

                   
                    <div className="mt-4">
                        <label htmlFor="addAttachment" className="block text-sm text-gray-700 text-left">
                            Assign Manager
                        </label>
                        <Select
    onChange={handleChangeManager} 
              style={{ width: 230 }}
              className="mt-2 h-10  border rounded-md focus:outline-none focus:border-blue-500"
            >
              {managers.map((manager, index) => (
                <option key={index} value={manager._id}>
                  {manager.firstname}{manager.lastname}
                 
                </option>
              ))}
            </Select>
                    </div>
\


              






                </div>

                <div className="flex w-[80%] ">
                <div className="mt-4 text-bold">
                        <label htmlFor="description" className="block text-sm text-gray-700 text-left">
                          Project Description
                        </label>
                        <textarea
                            type="text"
                            id="description"
                            className=" mt-2 md:w-[400px] md:h-[150px] h-[100px] p-1 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter subject"
                            onChange={handleChange}
                            value={formData.description}
                        />
                    </div>




                 
                </div>

                <div>
                       
                    <div className="flex md:items-end items-end mt-4 flex-wrap gap-4">
                        {/* <button className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white" >Attach Payment Voucher</button> */}
                        <button className="w-[205px] cursor-pointer text-blue-300 focus:outline-none focus:ring border-purple-500  rounded-3xs  h-[46px] flex flex-row items-center justify-center p-2.5 box-border "
                        onClick={handleSubmit}
                        >Create Project</button>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default CreateProject;