import React, { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import config from '../configuration/config'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const SalaryDefination = () => {


  const [formData, setFormData] = useState({
    title: "",
    level: "",
    // basicSalary: "",
    allowance: "",
    salaryStructure: {
      basicSalary: "",
      houseAllowance: "",
      transportAllowance: "",
      utilityAllowance: "",
      productivityAllowance: "",
      communicationAllowance: "",
      inconvenienceAllowance: "",
  },
    grossSalary: "",
    deductions: "",
  //   deductions: {
  //     tax: "",
  //     employeePension: "",
  //     totalDeduction: "",
  // },
    netSalary: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handlesal = (e) => {
    const { id, value } = e.target;
    setFormData({
        ...formData,
        salaryStructure: {
            ...formData.salaryStructure,
            [id]: value,
        },
    });
};

const handlededuction = (e) => {
    const { id, value } = e.target;
    setFormData({
        ...formData,
        deductions: {
            ...formData.deductions,
            [id]: value,
        },
    });
};
  const handleSubmit = async () => {
    try {

      
      await axios.post(`${config.baseURL}/salarybreakdowns/create`, formData);
      toast.success("Salary Breakdown created successfully ")
      // If successful, navigate to the previous page or any other page
      navigate('/admin/payroll');
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };


  const navigate = useNavigate();
  return (
    <div className="w-full border-2 border-gray-300">
      <div className="flex items-center cursor-pointer">
        <span onClick={() => { navigate('/admin/payroll') }}>
          <FaLongArrowAltLeft />Back
        </span>

      </div>
      <p className="font-semibold text-base"> Create Salary Defination</p>
      {/* grid div start below */}



      <div className='grid grid-cols-1 md:grid-cols-3 md:gap-3 '>
        <div className="mt-4">
          <label htmlFor="title" className="block text-sm text-gray-700 text-left">
            Title
          </label>
          <select
            id="title"
            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={handleChange}
            value={formData.title}
          >
            <option value="" disabled selected>
              Select Title
            </option>
            <option value="Manager">Manager</option>
            <option value="Asst. Manager">Asst. Manager</option>
            <option value="HR">HR</option>
            <option value="Developer">Developer</option>
          </select>
        </div>


        <div className="mt-4">
          <label htmlFor="level" className="block text-sm text-gray-700 text-left">
            Level
          </label>
          <select
            id="level"
            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={handleChange}
            value={formData.level}
          >
            <option value="" disabled selected>
              Select Level
            </option>
            <option value="level0">level 0</option>
            <option value="level1">level 1</option>
            <option value="level2">level 2</option>
            <option value="level3">level 3</option>
          </select>
        </div>


        <div className="mt-4">
          <label htmlFor="basicSalary" className="block text-sm text-gray-700 text-left">
            Basic Salary
          </label>
          <input
            type="text"
            id="basicSalary"
            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter amount"
            onChange={handlesal}
            value={formData.salaryStructure.basicSalary}
          />
        </div>
        <div className="mt-4">
                        <label htmlFor="houseAllowance" className="block text-sm text-gray-700 text-left">
                            House  Allowance
                        </label>
                        <input
                            type="text"
                            id="houseAllowance"
                            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter amount"
                            onChange={handlesal} // Add onChange event handler
                            value={formData.salaryStructure.houseAllowance} 
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="transportAllowance" className="block text-sm text-gray-700 text-left">
                            Transport Allowance
                        </label>
                        <input
                            type="text"
                            id="transportAllowance"
                            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter amount"
                            onChange={handlesal} // Add onChange event handler
                            value={formData.salaryStructure.transportAllowance} 
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="utilityAllowance" className="block text-sm text-gray-700 text-left">
                            Utility Allowance
                        </label>
                        <input
                            type="text"
                            id="utilityAllowance"
                            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter amount"
                            onChange={handlesal} // Add onChange event handler
                            value={formData.salaryStructure.utilityAllowance} 
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="productivityAllowance" className="block text-sm text-gray-700 text-left">
                            Productivity Allowance
                        </label>
                        <input
                            type="text"
                            id="productivityAllowance"
                            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter amount"
                            onChange={handlesal} // Add onChange event handler
                            value={formData.salaryStructure.productivityAllowance} 
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="communicationAllowance" className="block text-sm text-gray-700 text-left">
                            Communication Allowance
                        </label>
                        <input
                            type="text"
                            id="communicationAllowance"
                            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter amount"
                            onChange={handlesal} // Add onChange event handler
                            value={formData.salaryStructure.communicationAllowance} 
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="inconvenienceAllowance" className="block text-sm text-gray-700 text-left">
                            Inconvenience Allowance
                        </label>
                        <input
                            type="text"
                            id="inconvenienceAllowance"
                            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter amount"
                            onChange={handlesal} // Add onChange event handler
                            value={formData.salaryStructure.inconvenienceAllowance} 
                        />
                    </div>






        <div className="mt-4">
          <label htmlFor="grossSalary" className="block text-sm text-gray-700 text-left">
            Gross Salary
          </label>
          <input
            type="text"
            id="grossSalary"
            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter gross salary"
            onChange={handleChange}
            value={formData.grossSalary}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="deductions" className="block text-sm text-gray-700 text-left">
            Deductions
          </label>
          <input
            type="text"
            id="deductions"
            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter amount"
            onChange={handleChange}
            value={formData.deductions}
          />
        </div>



        <div className="mt-4">
          <label htmlFor="netSalary" className="block text-sm text-gray-700 text-left">
            Net Salary
          </label>
          <input
            type="text"
            id="netSalary"
            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter amount"
            onChange={handleChange}
            value={formData.netSalary}
          />
        </div>

        <div className="flex md:items-end items-end mt-4">
          <button className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
          onClick={handleSubmit}
          >Create</button>

        </div>






      </div>
      {/* grid div ends above */}
    </div>
  )
}

export default SalaryDefination