import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import { FaLongArrowAltLeft } from "react-icons/fa";
import axios from "axios";
import config from "../configuration/config";
import { toast } from "react-toastify";
import moment from "moment";
const CreateBudget=()=>{
    const navigate= useNavigate()
    const [formData, setFormData] = useState({
        budgetNo: "",
        budgetDescription: "",
        budgetedAmount: "null",
        generatedDate: '',
        actualAmount: null,
        variance: null,

       
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
            const response = await axios.post(`${config.baseURL}/budget/create-budget`, formData);
            
            toast.success("budget created successfully")
            navigate('/admin/budget')
            // Redirect or show success message
        } catch (error) {
            toast.error("something went wrong")
            console.error("Error creating budget:", error);
            // Handle error (show error message, log, etc.)
        }
    };
    return(
        <div className="w-full overflow-auto">

        <div className="shadow-md  p-4 ">
        <div className="flex items-center cursor-pointer">
                <span onClick={() => { navigate('/admin/budget') }}>
                    <FaLongArrowAltLeft />Back
                </span>

            </div>
            <div className="font-bold md:text-base flex mt-5">Create Budget</div>
            <div className='grid grid-cols-1 md:grid-cols-3 md:gap-3 '>






                <div className="mt-4">
                    <label htmlFor="budgetNo" className="block text-sm text-gray-700 text-left">
                     Budget Number
                    </label>
                    <input
                        type="text"
                        id="budgetNo"
                        className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Enter number"
                        value={formData.budgetNo}
                        onChange={handleChange}
                    />
                </div>


                <div className="mt-4">
                    <label htmlFor="description" className="block text-sm text-gray-700 text-left">
                       Budget Description
                    </label>
                    <input
                        type="text"
                        id="budgetDescription"
                        className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Enter description"
                        value={formData.budgetDescription}
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="budgetedAmount" className="block text-sm text-gray-700 text-left">
                      Budget Amount
                    </label>
                    <input
                        type="Number"
                        id="budgetedAmount"
                        className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Enter amount"
                        value={formData.budgetedAmount}
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="actualAmount" className="block text-sm text-gray-700 text-left">
                      Actual Amount
                    </label>
                    <input
                        type="Number"
                        id="actualAmount"
                        className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Enter amount"
                        value={formData.actualAmount}
                        onChange={handleChange}
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="variance" className="block text-sm text-gray-700 text-left">
                      Variance
                    </label>
                    <input
                        type="Number"
                        id="variance"
                        className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Enter amount"
                        value={formData.variance}
                        onChange={handleChange}
                    />
                </div>
             


              

                <div className="mt-4">
                    <label htmlFor="date" className="block text-sm text-gray-700 text-left">
                         Date 
                    </label>
                    <DatePicker
                        id="generatedDate"
                        className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Select Date"
                        onChange={handleDateChange}
                        value={formData.generatedDate ? moment(formData.generatedDate, 'YYYY-MM-DD') : null}

                    />
                </div>

              


            </div>

            <div>
                   
                <div className="flex md:items-end items-end mt-4 flex-wrap gap-4">
                    <button className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
                    onClick={handleSubmit}
                    >Create Budget</button>

                </div>
            </div>
        </div>

    </div>
    )
}

export default CreateBudget