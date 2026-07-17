import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import { FaLongArrowAltLeft } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import config from "../configuration/config";
import { toast } from "react-toastify";
import moment from "moment";
const LogisticRequest=()=>{
    const navigate= useNavigate()
    const [formData, setFormData] = useState({
        title: "",
        purpose: "",
        sentTo: "",
        generatedDate: null,
        requestBy: "",
        amount: "",
       
    });
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleDateChange = (date, dateString) => {
        setFormData({ ...formData, generatedDate: dateString });
      };

      const handleSubmit = async () => {
        try {
            const response = await axios.post(`${config.baseURL}/Logistic/create`, formData);
            
            toast.success("Logistic created successfully")
            navigate('/admin/logistics')
            // Redirect or show success message
        } catch (error) {
            toast.error("something went wrong")
            console.error("Error creating Logistic:", error);
            // Handle error (show error message, log, etc.)
        }
    };
    return(
        <div className="w-full overflow-auto">

        <div className="shadow-md  p-4 ">
        <div className="flex items-center cursor-pointer">
                <span onClick={() => { navigate('/admin/logistics') }}>
                    <FaLongArrowAltLeft />Back
                </span>

            </div>
            <div className="font-bold md:text-base flex mt-5">Logistic Request</div>
            <div className='grid grid-cols-1 md:grid-cols-3 md:gap-3 '>






                <div className="mt-4">
                    <label htmlFor="requestTitle" className="block text-sm text-gray-700 text-left">
                      Request Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Enter title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>


                <div className="mt-4">
                    <label htmlFor="purpose" className="block text-sm text-gray-700 text-left">
                        Purpose
                    </label>
                    <input
                        type="text"
                        id="purpose"
                        className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Enter purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="amount" className="block text-sm text-gray-700 text-left">
                       Amount
                    </label>
                    <input
                        type="text"
                        id="amount"
                        className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Enter amount"
                        value={formData.amount}
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="requestedBy" className="block text-sm text-gray-700 text-left">
                    Requested By
                    </label>
                    <input
                        type="text"
                        id="requestBy"
                        className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Enter name"
                        onChange={handleChange}
                        value={formData.requestBy}
                       
                    />
                </div>


                <div className="mt-4">
                    <label htmlFor="sentTo" className="block text-sm text-gray-700 text-left">
                        Sent to
                    </label>
                    <input
                        type="text"
                        id="sentTo"
                        className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Enter name"
                        value={formData.sentTo}
                        onChange={handleChange}
                    />
                </div>

              

                <div className="mt-4">
                    <label htmlFor="generatedDate" className="block text-sm text-gray-700 text-left">
                         Date from
                    </label>
                    <DatePicker
                        id="generatedDate"
                        className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Select  Date"
                        onChange={handleDateChange}
                        value={formData.generatedDate ? moment(formData.generatedDate, 'YYYY-MM-DD') : null}

                    />
                </div>

                {/* <div className="mt-4">
                    <label htmlFor="dateTo" className="block text-sm text-gray-700 text-left">
                         Date to
                    </label>
                    <DatePicker
                        id="dateTo"
                        className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Select  Date"
                    />
                </div> */}
               


          






            </div>

            <div>
                   
                <div className="flex md:items-end items-end mt-4 flex-wrap gap-4">
                    <button className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white" 
                   onClick={handleSubmit}
                   >Create</button>

                </div>
            </div>
        </div>

    </div>
    )
}

export default LogisticRequest