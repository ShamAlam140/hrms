import React, { useEffect, useState } from 'react'
import { Table, Button , Select, Input} from 'antd';
import axios from 'axios';
import config from '../configuration/config';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Employeeform=()=>{
    const[tableData , setTableData]= useState([])
    const [managers, setManagers] = useState([]);
    const [depList, setDepList]= useState([])
    const[designation, setDesignation]=useState('')
    const [depId, setdepId]=useState()
    const [refreshFlag, setRefreshFlag] = useState(false);
    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
         
            render: (t, r) => <img src={config.getSecureUrl(r.image)} style={{width:'50px', height:'50px'}}/>
         },
    
        {
          title: "First Name",
          dataIndex: "firstname",
          key: "firstname",
        },
        {
          title: "Last Name",
          dataIndex: "lastname",
          key: "lastname",
        },
        {
          title: "Gender",
          dataIndex: "gender",
          key: "gender",
        },
        {
          title: "Mobile no.",
          dataIndex: "mobile",
          key: "mobile",
        },
    
        {
          title: "Aadhar no.",
          dataIndex: "aadhar_number",
          key: "aadhar_number",
        },
        {
          title: "Pan no.",
          dataIndex: "pan_number",
          key: "pan_number",
        },
        {
          title: "Manager",
          dataIndex: "reporting_manager",
          key: "reporting_manager",
          render: (_, record) => (
            <Select
              defaultValue={record.reporting_manager}
              onChange={(value) => handleAssignManager(record._id, value)}
              style={{ width: 120 }}
            >
              {managers.map((manager, index) => (
                <option key={index} value={manager._id}>
                  {manager.firstname}{manager.lastname}
                 
                </option>
              ))}
            </Select>
          ),
        },
        {
          title: "Deparment",
          dataIndex: "department",
          key: "department",
          render: (_, record) => (
            <Select
              // defaultValue={record.department.name}
              onChange={(value) => setdepId(value)}
              style={{ width: 120 }}
            >
              {depList.map((dep, index) => (
                <option key={index} value={dep._id}>
                  {dep.name}
                 
                </option>
              ))}
            </Select>
          ),
        },
        {
          title: "Designation",
          dataIndex: "designation",
          key: "designation",
          render: (_, record) => (
            <Input
              value={designation}
              onChange={handleDesignationChange}
              placeholder="Enter designation"
            />
          ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
              <Button type="primary" onClick={() => handleRegister(record)}>Enroll</Button>
            )
          }
      ];


      useEffect(()=>{
        fetchData();
        fetchMangers();
        fetchdepart()
      },[])
      const fetchData= async()=>{
            const response = await axios.get(`${config.baseURL}/api/user/employee-requests`)
            setTableData(response.data.data)
      }

      const handleDesignationChange = (e) => {
        // Update the state with the new input value
        setDesignation(e.target.value);
      };

      const fetchdepart= async()=>{

        const res = await axios.get(`${config.baseURL}/department/all/departments`);
     
        setDepList(res.data.departments)
      }
      const handleAssignManager = async (employeeId, managerId) => {
        try {
          const response = await axios.post(`${config.baseURL}/api/user/assign-manager`, {
            employeeId,
            managerId,
          });
          toast.success("Manger is assigned")
           // Handle success response
          fetchData(); // Refresh employee data after assignment
        } catch (error) {
          console.error("Error assigning manager: ", error);
        }
      };

      const fetchMangers=async()=>{
          const res= await axios.get(`${config.baseURL}/api/user/get-managers`)
          setManagers(res.data.managers)
          // 
      }

      const handleRegister = async (record) => {
        try {
          
         const newdata={
              ...record, 
              // accountDetails:{bankName:record.bankName,
              //   bankCode:record.bankCode,
              //   branchName: record.branchName,
              //   accountNumber:record.accountNumber
              // },
              "designation":designation,
              "departmentId":depId
            }
            
          const response = await axios.post(`${config.baseURL}/api/user/create-employee`, newdata);
            const calenderdata = { 
              email : record.email ,
               userName: record.firstname + " " + record.lastname,
                isVerified: true };
                // 
                const cal= await axios.post(`https://susacalender.el.r.appspot.com/api/user/signup`, calenderdata)

                // 
          fetchData();
          setRefreshFlag(!refreshFlag);
        } catch (error) {
          console.error('Error registering employee:', error);
        //   message.error('Failed to register employee');
        }
      };

    return(
     <div className='container h-full px-6 py-24'>
  <div className=" text-left text-xl text-black font-body-3-small">
      <div className=" text-xs text-grey-70 overflow-auto ">
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

export default Employeeform