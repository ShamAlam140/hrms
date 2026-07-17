import React, { useEffect, useState } from "react";
import { Table , Space, Badge} from "antd";
import config from "../configuration/config";
import axios from "axios";

const EmpProjects = ({data}) => {
    const[currUser, setCurrUser]= useState()
    const[projects, setProject]= useState()
  const projectColumns = [
    {
        title: "S/N",
        dataIndex: "serialNumber",
        key: "serialNumber",
        render: (_, __, index) => index + 1,
    },
    // {
    //     title: "Title",
    //     dataIndex: "projectTitle",
    //     key: "projectTitle",
    // },
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

    // {
    //     title: "Sent To",
    //     dataIndex: "sentTo",
    //     key: "sentTo",
    // },
    // {
    //     title: "Date",
    //     dataIndex: "generatedDate",
    //     key: "generatedDate",
    // },
    {
        title: "Status",
        dataIndex: "projectStatus",
        key: "projectStatus",
        render: (text) => (
            <Space size="middle">
              <Badge status={text === "Pending" || text==="Rejected" ? "error" : "success"} />
              {text}
            </Space>
          ),
    },
    // {
    //     title: "Reason",
    //     dataIndex: "reject_reason",
    //     key: "reject_reason",
    // },
    // {
    //     title: 'Action',
    //     key: 'action',
    //     render: (_, record) => (
    //         <div>
    //             {record.status === "Rejected" ?
    //                 <Button type="primary" onClick={() => handleApprove(record)}>Approve</Button>
    //                 : <>
    //                     {record.status === "Approved" ? '' :
    //                         <Button type="primary" onClick={() => handleApprove(record)}>Approve</Button>
    //                     }
    //                     <Button type="danger" className='bg-red-500' onClick={() => handleReject(record)}>Reject</Button>
    //                 </>}

    //         </div>
    //     )
    // }
];


useEffect(()=>{
    setCurrUser(JSON.parse(localStorage.getItem('user')))
    fetchproject()
},[])

const fetchproject=async()=>{
    const user= JSON.parse(localStorage.getItem('user'))
    const res= await axios.get(`${config.baseURL}/projects/getEmployeeProject/${user?._id}`)
  
    setProject(res.data)
}

  return (
    <div className=" overflow-y-auto bg-white rounded-xl shadow-md">
      <div className="flex flex-col items-start justify-start gap-4 p-4">
        <div className="font-extrabold">Projects</div>
        <div className="overflow-y-auto h-[300px] text-xs text-grey-70">
          <Table columns={projectColumns} dataSource={projects} pagination={false} />
        </div>
      </div>
    </div>
  );
};

export default EmpProjects;
