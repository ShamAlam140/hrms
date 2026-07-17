
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Form, Space, Badge } from "antd";
import { FaLongArrowAltUp } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import config from "../configuration/config";
import { toast } from 'react-toastify';
import { Select } from 'antd';

const { Option } = Select;
import "react-toastify/dist/ReactToastify.css";

const ManagerProjects = () => {
    const [projectList, setprojectList] = useState();
    const statusOptions = ["Pending", "Running", "Completed"];
    const navigate = useNavigate()

    useEffect(() => {
        fetchproject()
      
    }, [])

    const projectColumns = [
        {
            title: "S/N",
            dataIndex: "serialNumber",
            key: "serialNumber",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Title",
            dataIndex: "projectTitle",
            key: "projectTitle",
        },
        {
            title: "Project Name",
            dataIndex: "projectName",
            key: "projectName",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Manager Assigned",
            dataIndex: "manager",
            key: "firstname",
            render: (manager) => manager?.firstname,
        },

       
        {
            title: "Status",
            dataIndex: "projectStatus",
            key: "projectStatus",
            render: (text, record) => (
                <div>

                <Space size="middle">
                  <Badge status={text === "Pending" || text==="Running" ? "error" : "success"} />
                  {record?.projectStatus}
                </Space>
                <Select className="ml-2" defaultValue={text} onChange={(value) => handleChangeStatus(record._id, value)}>
            {statusOptions.map(option => (
              <Option key={option} value={option}>{option}</Option>
            ))}
          </Select>
                </div>
              ),
        },
      
    ];


    const handleChangeStatus = async (projectId, newStatus) => {
        try {
            
          const response = await axios.post(`${config.baseURL}/projects/ChangeProjetcStatus/${projectId}`, { status: newStatus });
          if (response.status === 200) {
            // Handle success
            
            toast.success("Project Status has been changed")
            fetchproject()
            
          } else {
            // Handle error
            console.error('Error updating project status:', response.statusText);
          }
        } catch (error) {
          console.error('Error updating project status:', error.message);
        }
      };
      

    const fetchproject = async () => {
         const user = JSON.parse(localStorage.getItem('user'))
        const res = await axios.get(`${config.baseURL}/projects/getManagerProject/${user?._id}`)
        
        setprojectList(res.data)

    }
    return (
        <div>



            <div className="bg-white rounded-xl shadow-md mt-4  p-8 ">
                <div className="flex md:flex-wrap flex-wrap gap-7 cursor-pointer justify-between items-center">
                    <div className="md:text-bold text-[20px]">Projects</div>

                    <button
                        className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
                        onClick={() => navigate("/manager/projects/create-project")}
                    >
                       Create New Project
                    </button>
                </div>
            </div>

            <div className="mt-10">

                <div className="bg-white rounded-xl shadow-md mt-6 p-3">
                    <div className="font-bold md:text-base flex mt-3">All projects </div>
                    <div className="overflow-auto md:overflow-auto  md:overflow-x-scroll mt-6  text-left text-xl text-black font-body-3-small">
                        <div className=" text-xs text-grey-70">
                            <Table
                                columns={projectColumns}
                                dataSource={projectList}
                                pagination={{ pageSize: 7 }}
                                size="middle"
                            />
                        </div>
                    </div>
                </div>
            </div>

           
        </div>
    )
}

export default ManagerProjects