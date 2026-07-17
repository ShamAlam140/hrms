import React, { useEffect, useState } from "react";
import { DatePicker } from 'antd';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { Table } from "antd";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import config from "../configuration/config";
import { toast } from "react-toastify";

const CreatePayroll = () => {


    const staffDetailsCol=[
        {
            title: "S/N",
            dataIndex: "serialNumber",
            key: "serialNumber",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Staff Name",
            dataIndex: "staffName",
            key: "staffName",
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Level",
            dataIndex: "level",
            key: "level",
        },
        {
            title: "Basic Salary",
            dataIndex: ["salaryStructure", "basicSalary"],
            key: "basicSalary",
            render: (basicSalary) => `₹${basicSalary.toFixed(2)}`, // Format the salary as needed
        },
        {
            title: "Allowance",
            dataIndex: "salaryStructure", // Display all allowance fields together
            key: "allowance",
            render: (salaryStructure) => {
                const allowances = Object.values(salaryStructure).reduce((total, allowance) => total + allowance, 0);
                return `₹${allowances.toFixed(2)}`; // Format the total allowance as needed
            },
        },
        {
            title: "Gross Salary",
            dataIndex: "grossSalary",
            key: "grossSalary",
            render: (grossSalary) => `₹${grossSalary}`,
           
        },
        {
            title: "Deductions",
            dataIndex: "deductions", // Display all deduction fields together
            key: "deductions",
            render: (deductions) => {
                const totalDeductions = Object.values(deductions).reduce((total, deduction) => total + deduction, 0);
                return `₹${totalDeductions.toFixed(2)}`; // Format the total deductions as needed
            },
        },
        {
            title: "Net Salary",
            dataIndex: "netSalary",
            key: "netSalary",
            render: (netSalary) => `₹${netSalary.toFixed(2)}`, // Format the net salary as needed
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (_, record) => (
                <span
                    className="text-transparent !bg-clip-text [background:linear-gradient(135deg,_#14add5,_#384295)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] cursor-pointer"
                    // onClick={() => onViewMoreTextClick(record)}
                >
                    View more
                </span>
            ),
        },
    ]

    const[StaffDetailsData, setStaffDetailsData]=useState()
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        paymentName: '',
        designation: '',
        generatedDate: null,
        month: '',
        year: '',
      });

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };
    
      const handleFormSubmit = async () => {
        try {
          // Send the form data to the backend API endpoint
          const response = await axios.post(`${config.baseURL}/payroll/create-payroll`, formData);
          
          
          toast.success('payroll generated sucessfully ')
          // Optionally, you can handle the response here, such as showing a success message or navigating to another page
        } catch (error) {
          console.error('Error creating payroll:', error);
          // Handle error, such as displaying an error message to the user
        }
      };

    useEffect(()=>{
        fetchData()
    },[])
    

    const fetchData=async()=>{
        try {
            const res=  await axios.get(`${config.baseURL}/payslips/getAllPayslips`)
           
            setStaffDetailsData(res.data)
            
        } catch (error) {
            
        }
    }

    // const transformedData = StaffDetailsData?.map((item, index) => ({
    //     key: index, // Assuming the index can be used as the key
    //     serialNumber: index + 1, // Generate a serial number based on the index
    //     staffName: item.staffName,
    //     title: item.title,
    //     level: item.level,
    //     basicSalary: item.salaryStructure.basicSalary,
    //     allowance: { ...item.salaryStructure }, // Allowances object
    //     grossSalary: item.grossSalary,
    //     deductions: { ...item.deductions }, // Deductions object
    //     netSalary: item.netSalary,
    //     action: null, // No action specified
    //   }));

    //   

    const months = [
        { value: 'January', label: 'January' },
        { value: 'February', label: 'February' },
        { value: 'March', label: 'March' },
        { value: 'April', label: 'April' },
        { value: 'May', label: 'May' },
        { value: 'June', label: 'June' },
        { value: 'July', label: 'July' },
        { value: 'August', label: 'August' },
        { value: 'September', label: 'September' },
        { value: 'October', label: 'October' },
        { value: 'November', label: 'November' },
        { value: 'December', label: 'December' },
    ];

    const currentYear = new Date().getFullYear();
    const handleDate = (date, dateString) => {
        setFormData({ ...formData, generatedDate: dateString });
      };
    

    

    return (
        <div>

            <div className="shadow-md  p-4 ">
                <div className="flex items-center cursor-pointer">
                    <span onClick={() => { navigate('/admin/payroll') }}>
                        <FaLongArrowAltLeft />Back
                    </span>

                </div>
                <div className="font-bold md:text-base flex mt-10">Generate Payroll</div>
                <div className='grid grid-cols-1 md:grid-cols-3 md:gap-3  mt-5'>






                    <div className="mt-4">
                        <label htmlFor="paymentName" className="block text-sm text-gray-700 text-left">
                            Payment Name
                        </label>
                        <input
                            type="text"
                            id="paymentName"
                            className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter payment name"
                            onChange={handleChange}
                            value={formData.paymentName}
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="designation" className="block text-sm text-gray-700 text-left">
                            Designation
                        </label>
                        <select
                            id="designation"
                            className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            onChange={handleChange}
                            value={formData.designation}
                      >
                            <option value="" disabled selected>
                                Select designation
                            </option>
                            <option value="Manager">Manager</option>
                            <option value="HR">HR</option>
                            <option value="Developer">Developer</option>
                        </select>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="generatedDate" className="block text-sm text-gray-700 text-left">
                            Generated Date
                        </label>
                        <DatePicker
                            id="generatedDate"
                            className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Select Generated Date"
                            onChange={handleDate}
                            value={formData.generatedDate ? moment(formData.generatedDate, 'YYYY-MM-DD') : null}
                       />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="month" className="block text-sm text-gray-700 text-left">
                            Payment Month
                        </label>
                        <select
                            id="month"
                            className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            onChange={handleChange}
                            value={formData.month}
                       >
                            <option value="" disabled selected>
                                Select Month
                            </option>
                             {months.map((month, index) => (
                                <option key={index} value={month.value}>{month.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="year" className="block text-sm text-gray-700 text-left">
                            Payment Year
                        </label>
                        <select
                            id="year"
                       
                            className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            onChange={handleChange}
                            value={formData.year}
                       >
                            <option value="" disabled selected>
                                Select Year
                            </option>
                            {[currentYear - 1, currentYear, currentYear + 1].map((year, index) => (
                                <option key={index} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>




                    {/* 
                    <div className="flex md:items-end items-end mt-4">
                        <button className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white" >Create</button>

                    </div> */}






                </div>
                <div className="flex md:items-end items-end mt-4">
                    <button className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
                   onClick={handleFormSubmit}
                   >Generate Payroll</button>

                </div>
            </div>


            <div className="bg-white rounded-xl shadow-md mt-6 p-3">
                <div className="font-bold md:text-base flex mt-3">Staff Details</div>
                <div className="overflow-auto md:overflow-auto  md:overflow-x-scroll mt-6  text-left text-xl text-black font-body-3-small">
                    <div className=" text-xs text-grey-70">
                        <Table
                            columns={staffDetailsCol}
                            dataSource={StaffDetailsData}
                            pagination={{ pageSize: 7 }}
                            size="middle"
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}
export default CreatePayroll