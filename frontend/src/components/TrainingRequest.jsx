import React ,{useState}from "react";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import { FaLongArrowAltLeft } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import config from "../configuration/config";
import { toast } from "react-toastify";
import moment from "moment";
const TrainingRequest=()=>{
    const navigate= useNavigate()
    const [formData, setFormData] = useState({
        sentFrom: "",
        description: "",
        duration: "",
        startDate: null,
        trainingType: "",
        mode: "",
        StaffName:""

       
    });
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleDateChange = (date, dateString) => {
        setFormData({ ...formData, startDate: dateString });
      };

      const handleSubmit = async () => {
        try {
            const response = await axios.post(`${config.baseURL}/capacitybuilding/create-training`, formData);
            
            toast.success("Training created successfully")
            navigate('/admin/capacity')
            // Redirect or show success message
        } catch (error) {
            toast.error("something went wrong")
            console.error("Error creating Training:", error);
            // Handle error (show error message, log, etc.)
        }
    };

    return(
        <div className="w-full overflow-auto">

        <div className="shadow-md  p-4 ">
        <div className="flex items-center cursor-pointer">
                <span onClick={() => { navigate('/admin/capacity') }}>
                    <FaLongArrowAltLeft />Back
                </span>

            </div>
            <div className="font-bold md:text-base flex mt-5">Training Request</div>
            <div className='grid grid-cols-1 md:grid-cols-3 md:gap-3 '>






                <div className="mt-4">
                    <label htmlFor="description" className="block text-sm text-gray-700 text-left">
                 Training description
                    </label>
                    <input
                        type="text"
                        id="description"
                        className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Enter description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>


                <div className="mt-4">
                    <label htmlFor="trainingType" className="block text-sm text-gray-700 text-left">
                       Training type
                    </label>
                    <input
                        type="text"
                        id="trainingType"
                        className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Enter type"
                        value={formData.trainingType}
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="duration" className="block text-sm text-gray-700 text-left">
                     Training duration
                    </label>
                    <input
                        type="text"
                        id="duration"
                        className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Enter duration"
                        value={formData.duration}
                        onChange={handleChange}
                    />
                </div>

             


              

                <div className="mt-4">
                    <label htmlFor="startDate" className="block text-sm text-gray-700 text-left">
                         Date 
                    </label>
                    <DatePicker
                        id="startDate"
                        className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Select Date"
                        onChange={handleDateChange}
                        value={formData.startDate ? moment(formData.startDate, 'YYYY-MM-DD') : null}
                    />
                </div>

              
                <div className="mt-4">
        <label htmlFor="mode" className="block text-sm text-gray-700 text-left">
         Training mode
        </label>
        <select
          id="mode"
          value={formData.mode}
          onChange={handleChange}
          className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="" disabled selected>
            Select mode
          </option>
          <option value="Online">Online </option>
          <option value="Offline">Offline</option>
        </select>
      </div>
      <div className="mt-4">
                    <label htmlFor="sentFrom" className="block text-sm text-gray-700 text-left">
               Sent From
                    </label>
                    <input
                        type="text"
                        id="sentFrom"
                        className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Enter name"
                        value={formData.sentFrom}
                        onChange={handleChange}
                    />
                </div>

      <div className="mt-4">
                    <label htmlFor="StaffName" className="block text-sm text-gray-700 text-left">
                Staff to be trained
                    </label>
                    <input
                        type="text"
                        id="StaffName"
                        className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Enter name"
                        value={formData.StaffName}
                        onChange={handleChange}

                    />
                </div>
            </div>

            <div>
                   
                <div className="flex md:items-end items-end mt-4 flex-wrap gap-4">
                    <button className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white" 
                    onClick={handleSubmit}>Save and Submit</button>
                    {/* <button className="w-[205px] cursor-pointer text-blue-300 focus:outline-none ring border-purple-500  rounded-3xs  h-[46px] flex flex-row items-center justify-center p-2.5 box-border " >Save</button> */}

                </div>
            </div>
        </div>

    </div>
    )
}

export default TrainingRequest