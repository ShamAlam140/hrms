import React, {useState} from "react";
import { DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import axios from "axios";
import config from "../configuration/config";
import { toast } from "react-toastify";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";


const CreateMemo = () => {
    const navigate= useNavigate()
    const [formData, setFormData] = useState({
        memoTitle: "",
        sentFrom: "",
        sentTo: "",
        action: "",
        generatedDate: null,
        addAttachment: "",
        memoType: "",
        memoBody: ""
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
            const response = await axios.post(`${config.baseURL}/memo/create-memo`, formData);
            
            toast.success("Memo created successfully")
            // Redirect or show success message
        } catch (error) {
            toast.error("something went wrong")
            console.error("Error creating memo:", error);
            // Handle error (show error message, log, etc.)
        }
    };
    


    return (
        <div className="w-full overflow-auto">

            <div className="shadow-md  p-4 ">
            <div className="flex items-center cursor-pointer">
                    <span onClick={() => { navigate('/admin/memo') }}>
                        <FaLongArrowAltLeft />Back
                    </span>

                </div>
                <div className="font-bold md:text-base flex mt-5">Create Memo</div>
                <div className='grid grid-cols-1 md:grid-cols-3 md:gap-3 '>






                    <div className="mt-4">
                        <label htmlFor="memoTitle" className="block text-sm text-gray-700 text-left">
                            Memo Title
                        </label>
                        <input
                            type="text"
                            id="memoTitle"
                            className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter title"
                            onChange={handleChange}
                            value={formData.memoTitle}
                        />
                    </div>


                    <div className="mt-4">
                        <label htmlFor="sentFrom" className="block text-sm text-gray-700 text-left">
                            Sent from
                        </label>
                        <input
                            type="text"
                            id="sentFrom"
                            className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter mail"
                            onChange={handleChange}
                            value={formData.sentFrom}
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
                            placeholder="Enter mail"
                            onChange={handleChange}
                            value={formData.sentTo}
                        />
                    </div>

                    {/* <div className="mt-4">
                        <label htmlFor="action" className="block text-sm text-gray-700 text-left">
                            Action
                        </label>
                        <input
                            type="text"
                            id="action"
                            className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter action"
                            onChange={handleChange}
                            value={formData.action}
                        />
                    </div> */}

                    <div className="mt-4">
                        <label htmlFor="generatedDate" className="block text-sm text-gray-700 text-left">
                             Date
                        </label>
                        <DatePicker
                            id="generatedDate"
                            className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Select  Date"
                            onChange={handleDateChange}
                            value={formData.generatedDate ? moment(formData.generatedDate, 'YYYY-MM-DD') : null}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="addAttachment" className="block text-sm text-gray-700 text-left">
                            Add attachment?
                        </label>
                        <select
                            id="addAttachment"
                        
                        className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                        onChange={handleChange}
                        value={formData.addAttachment}
                    >
                            <option value="" disabled selected>
                                Select 
                            </option>
                            <option value="yes">Yes</option>
                            <option value="no">NO</option>
                            
                        </select>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="memoType" className="block text-sm text-gray-700 text-left">
                          Memo type
                        </label>
                        <input
                            type="text"
                            id="memoType"
                            className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter type"
                            onChange={handleChange}
                            value={formData.memoType}
                        />
                    </div>


              






                </div>

                <div className="flex w-[80%] ">
                <div className="mt-4 text-bold">
                        <label htmlFor="memoBody" className="block text-sm text-gray-700 text-left">
                          Memo body
                        </label>
                        <textarea
                            type="text"
                            id="memoBody"
                            className=" mt-2 md:w-[400px] md:h-[150px] h-[100px] p-1 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter subject"
                            onChange={handleChange}
                            value={formData.memoBody}
                        />
                    </div>




                 
                </div>

                <div>
                       
                    <div className="flex md:items-end items-end mt-4 flex-wrap gap-4">
                        {/* <button className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white" >Attach Payment Voucher</button> */}
                        <button className="w-[205px] cursor-pointer text-blue-300 focus:outline-none focus:ring border-purple-500  rounded-3xs  h-[46px] flex flex-row items-center justify-center p-2.5 box-border "
                        onClick={handleSubmit}
                        >Send Memo</button>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default CreateMemo;