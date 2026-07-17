import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useNavigate } from 'react-router-dom';
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import config from "../configuration/config";
const EmpPaySlip = ()=>{
  const navigate= useNavigate()
    const [tabledata, settabledata]= useState()
    const [currUser, setCurrUser] = useState();


      useEffect(()=>{
        fetchEmployeePayslips();
      },[])
      
        const fetchEmployeePayslips = async()=>{
            setCurrUser(JSON.parse(localStorage.getItem('user')))
                const user= JSON.parse(localStorage.getItem('user'))
                const res = await axios.get(`${config.baseURL}/payslips/employeePayslips/${user?._id}`)
                
                settabledata(res.data)
        }
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
                    
                  onClick={()=>navigate( currUser?.role.toLowerCase()=== 'employee' ? `/employee/payslip/created-payslip/${record.employee}/${record.month}/${record.year}`:
                  currUser?.role.toLowerCase()=== 'hr' ?  `/hr/payslip/created-payslip/${record.employee}/${record.month}/${record.year}`: `/manager/payslip/created-payslip/${record.employee}/${record.month}/${record.year}`)}
                >
                    {}
                    View more
                </span>
               
        
            ),
        },
      ]
    return(
        <div className='container h-full px-6 py-24'>
        <div className=" text-left text-xl text-black font-body-3-small">
            <div className=" text-xs text-grey-70 overflow-auto ">
              <Table
                columns={staffDetailsCol}
                dataSource={tabledata}
                pagination={{ pageSize: 8 }}
                size="middle"
              />
            </div>
          </div>
              </div>
    )
}

export default EmpPaySlip;