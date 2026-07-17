import React, { useEffect, useState } from 'react'
import { Table, Button , Select, Input} from 'antd';
import axios from 'axios';
import config from '../configuration/config';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Managerteam=()=>{
    const[tableData , setTableData]= useState([])
    const [managers, setManagers] = useState([]);
    const [projectList, setprojectList]= useState([])
    const[designation, setDesignation]=useState('')
    const [projectId, setprojectId]=useState()
    const [refreshFlag, setRefreshFlag] = useState(false);
    const columns = [
        {
            title: 'Image',
            dataIndex: 'photo',
         
            render: (t, r) => <img src={config.getSecureUrl(r.photo)} style={{width:'50px', height:'50px'}}/>
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
    
        // {
        //   title: "Aadhar no.",
        //   dataIndex: "aadhar_number",
        //   key: "aadhar_number",
        // },
        // {
        //   title: "Pan no.",
        //   dataIndex: "pan_number",
        //   key: "pan_number",
        // },
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
          title: "Project assign",
          dataIndex: "project",
          key: "project",
          render: (_, record) => (
            <>       

{record.project.map(proname => (
                <div key={proname._id}>
                    {proname.projectName}
                </div>
            ))}
            <Select
            //   defaultValue={record.firstname}
              onChange={(value) => setprojectId(value)}
              style={{ width: 120 }}
            >
              {projectList.map((dep, index) => (
                <option key={index} value={dep._id}>
                  {dep.projectName}
                 
                </option>
              ))}
            </Select>

            </>
          ),
        },
        {
          title: " Backup Project",
          dataIndex: "project",
          key: "project",
          render: (_, record) => (
            <>       

{record.project.map(proname => (
                <div key={proname._id}>
                    {proname.projectName}
                </div>
            ))}
            <Select
            //   defaultValue={record.firstname}
              onChange={(value) => setprojectId(value)}
              style={{ width: 120 }}
            >
              {projectList.map((dep, index) => (
                <option key={index} value={dep._id}>
                  {dep.projectName}
                 
                </option>
              ))}
            </Select>

            </>
          ),
        },
        // {
        //   title: "Designation",
        //   dataIndex: "designation",
        //   key: "designation",
        //   render: (_, record) => (
        //     <Input
        //       value={designation}
        //       onChange={handleDesignationChange}
        //       placeholder="Enter designation"
        //     />
        //   ),
        // },
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
            const user = JSON.parse(localStorage.getItem('user'))
            const response = await axios.get(`${config.baseURL}/api/user/get-team/${user?._id}`)
            setTableData(response.data)
      }

      const handleDesignationChange = (e) => {
        // Update the state with the new input value
        setDesignation(e.target.value);
      };

      const fetchdepart= async()=>{

        const res = await axios.get(`${config.baseURL}/projects/get-projects`);
     
        setprojectList(res.data)
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
             
              "employeeId":record?._id,
              "projectId":projectId
            }
            
          const response = await axios.post(`${config.baseURL}/projects/assign-employee`, newdata);
          toast.success("Project is assign to the employee")
              
          fetchData();
          setRefreshFlag(!refreshFlag);
        } catch (error) {
          toast.error("Project is already assign to the employee")
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

export default Managerteam