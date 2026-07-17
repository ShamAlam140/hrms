import React, { useEffect, useState } from 'react'
import axios from 'axios';
import config from '../configuration/config';
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';
import { Table, Button , Select, Input} from 'antd';

const MarkAttendance = ()=>{
    const[tableData , setTableData]= useState([])
    const[refreshFlag , setRefreshFlag]= useState(false)

    const columns = [
        {
            title: "S/N",
            dataIndex: "serialNumber",
            key: "serialNumber", 
            render: (_, __, index) => index + 1,  

         },
    
        {
          title: " Name",
          dataIndex: "employee",
          key: "firstname",
          render: (employee) => employee?.firstname,
        },
        {
          title: "Date",
          dataIndex: "date",
          render: (date) => new Date(date).toLocaleDateString()
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
        },
        {
          title: "PunchIn Time",
          dataIndex: "punchIn",
          key: "punchIn",
        },
    
        {
          title: "PunchOut Time",
          dataIndex: "punchOut",
          key: "punchOut",
        },
     
      
      
      ];
useEffect(()=>{
    fetchAttendance() 
},[])

      const fetchAttendance = async()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        const res = await axios.get(`${config.baseURL}/attendance/employee-attendance/${user?._id}`)
        
        setTableData(res.data)
      }

    const handlePunchIn = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
          const response = await axios.post(`${config.baseURL}/attendance/mark-attendance`, {
            employeeId: user?._id,
            action: 'punchIn',
          });
          
          toast.success("Attendance Mark Successfully")
          fetchAttendance()
        } catch (error) {
            toast.error("something went wrong")
          console.error('Error marking attendance:', error);
        }
      };
    
      const handlePunchOut = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
          const response = await axios.post(`${config.baseURL}/attendance/mark-attendance`, {
            employeeId: user?._id,
            action: 'punchOut',
          });
          toast.success("Punch Out Successfully")
          
          fetchAttendance()
        } catch (error) {
            toast.error("something went wrong")
          console.error('Error marking attendance:', error);
        }
      };
    return(
        <div>
            <div className='font-semibold text-xl'>Mark Attendance</div>
            <div className='flex gap-4 bg-slate-200 mt-10 justify-center'>
                <button className ='cursor-pointer w-40  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white'
                  onClick={handlePunchIn}
                >
                Punch In

                </button>
                <button className='cursor-pointer w-40  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white'
                  onClick={handlePunchOut}
                >
                Punch Out
                </button>

            </div>
            <div className="mt-4 text-left text-xl text-black font-body-3-small">
      <div className="mt-10 text-xs text-grey-70 overflow-auto ">
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={{ pageSize: 8 }}
          size="middle"
        />
      </div>
    </div>


        </div>
    )
}

export default MarkAttendance