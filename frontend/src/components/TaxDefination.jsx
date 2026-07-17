import React,{useState} from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import config from "../configuration/config";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const TaxDefination = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    taxType: "",
    percentValue: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${config.baseURL}/taxdefinitions/create`, formData);
      // If successful, navigate to the previous page or any other page
      toast.success("Tax defination created successfully..")
      navigate('/admin/payroll');
    } catch (error) {
      console.error(error);
      // Handle error
      toast.error("Something went wrong..")
    }
  };

  return (
    <div className="w-full border-2 border-gray-300">
      <div className="flex items-center cursor-pointer">
        <span
          onClick={() => {
            navigate("/admin/payroll");
          }}
        >
          <FaLongArrowAltLeft />
          Back
        </span>
      </div>

      <p className="font-semibold text-base"> Create Tax Defination</p>
      {/* grid div start below */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-3 ">
        <div className="mt-4">
          <label
            htmlFor="taxType"
            className="block text-sm text-gray-700 text-left"
          >
            Tax type
          </label>
          <input
            type="text"
            id="taxType"
            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter type"
            onChange={handleChange}
            value={formData.taxType}
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="percentvalue"
            className="block text-sm text-gray-700 text-left"
          >
            % Value
          </label>
          <input
            type="Number"
            id="percentValue"
            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter percent"
            onChange={handleChange}
            value={formData.percentValue}
          />
        </div>

        <div className="flex md:items-end items-end mt-4">
          <button className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
                onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </div>
      {/* grid div ends above */}
    </div>
  );
};

export default TaxDefination;
