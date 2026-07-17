
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Form, Space, Badge } from "antd";
import { FaLongArrowAltUp } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import config from "../configuration/config";
import { toast } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";

const Projects = () => {
    const [projectList, setprojectList] = useState();
    // const [logsummary, setlogsummary] = useState();
    // const [logId, setlogId] = useState();
    // const [rejectReason, setRejectReason] = useState('');
    // const [isModalVisible, setIsModalVisible] = useState(false);
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


    // const handleApprove = async (record) => {
    //     try {
    //         const response = await axios.put(`${config.baseURL}/project/approve/${record._id}`);
    //         if (response.status === 200) {
    //             toast.success('project Request Approved Successfully')
    //             fetchproject();
    //             // setRefreshFlag(!refreshFlag); // Call a function to fetch updated data
    //         } else {
    //             toast.error('Something went wrong')
    //             console.error('Error approving logistic request:', response.statusText);
    //         }
    //     } catch (error) {
    //         console.error('Error approving logistic:', error.message);
    //     }
    // };

    // const handleReject = async (record) => {
    //     setIsModalVisible(true);
    //     setlogId(record._id)
    // };

    // const onFinish = async () => {
    //     try {
    //         
    //         const response = await axios.put(`${config.baseURL}/Logistic/reject/${logId}`, {
    //             reject_reason: rejectReason
    //         });
    //         if (response.status === 200) {
    //             toast.success('Logistc Request  Reject Successfully')
    //             fetchlogistic();
    //             // setRefreshFlag(!refreshFlag);
    //             setIsModalVisible(false);
    //         } else {
    //             toast.error('Something went wrong');

    //             console.error('Error rejecting logistic:', response.statusText);
    //         }
    //     } catch (error) {
    //         toast.error('Error rejecting logistic:', error.message);
    //     }
    // };

    // const onFinishFailed = (errorInfo) => {
    //     
    // };


    const fetchproject = async () => {
        const res = await axios.get(`${config.baseURL}/projects/get-projects`)
        
        setprojectList(res.data)

    }
    return (
        <div>



            <div className="bg-white rounded-xl shadow-md mt-4  p-8 ">
                <div className="flex md:flex-wrap flex-wrap gap-7 cursor-pointer justify-between items-center">
                    <div className="md:text-bold text-[20px]">Projects</div>

                    <button
                        className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
                        onClick={() => navigate("/admin/projects/create-project")}
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

            {/* <Modal
                title="Reason for Rejection"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={onFinish}>
                        Submit
                    </Button>,
                ]}
            >
                <Form
                    name="reasonForm"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Reason"
                        name="reason"
                        rules={[{ required: true, message: 'Please input the reason for rejection!' }]}
                    >
                        <Input.TextArea
                            rows={4}
                            onChange={(e) => setRejectReason(e.target.value)}
                            value={rejectReason}
                        />
                    </Form.Item>
                </Form>
            </Modal> */}
        </div>
    )
}

export default Projects