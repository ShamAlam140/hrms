
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Form, Space, Badge } from "antd";
import { FaLongArrowAltUp } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import config from "../configuration/config";
import { toast } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";

const Logistics = () => {
    const [logisticList, setlogisticList] = useState();
    const [logsummary, setlogsummary] = useState();
    const [logId, setlogId] = useState();
    const [rejectReason, setRejectReason] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        fetchlogistic()
        fetchDashboadinfo()
    }, [])

    const logisticColumns = [
        {
            title: "S/N",
            dataIndex: "serialNumber",
            key: "serialNumber",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Purpose",
            dataIndex: "purpose",
            key: "purpose",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
        },
        {
            title: "Request By",
            dataIndex: "requestBy",
            key: "requestBy",
        },

        {
            title: "Sent To",
            dataIndex: "sentTo",
            key: "sentTo",
        },
        {
            title: "Date",
            dataIndex: "generatedDate",
            key: "generatedDate",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (text) => (
                <Space size="middle">
                  <Badge status={text === "Pending" || text==="Rejected" ? "error" : "success"} />
                  {text}
                </Space>
              ),
        },
        {
            title: "Reason",
            dataIndex: "reject_reason",
            key: "reject_reason",
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div>
                    {record.status === "Rejected" ?
                        <Button type="primary" onClick={() => handleApprove(record)}>Approve</Button>
                        : <>
                            {record.status === "Approved" ? '' :
                                <Button type="primary" onClick={() => handleApprove(record)}>Approve</Button>
                            }
                            <Button type="danger" className='bg-red-500' onClick={() => handleReject(record)}>Reject</Button>
                        </>}

                </div>
            )
        }
    ];


    const handleApprove = async (record) => {
        try {
            const response = await axios.put(`${config.baseURL}/Logistic/approve/${record._id}`);
            if (response.status === 200) {
                toast.success('Logistic Request Approved Successfully')
                fetchlogistic();
                // setRefreshFlag(!refreshFlag); // Call a function to fetch updated data
            } else {
                toast.error('Something went wrong')
                console.error('Error approving logistic request:', response.statusText);
            }
        } catch (error) {
            console.error('Error approving logistic:', error.message);
        }
    };

    const handleReject = async (record) => {
        setIsModalVisible(true);
        setlogId(record._id)
    };

    const onFinish = async () => {
        try {
            
            const response = await axios.put(`${config.baseURL}/Logistic/reject/${logId}`, {
                reject_reason: rejectReason
            });
            if (response.status === 200) {
                toast.success('Logistc Request  Reject Successfully')
                fetchlogistic();
                // setRefreshFlag(!refreshFlag);
                setIsModalVisible(false);
            } else {
                toast.error('Something went wrong');

                console.error('Error rejecting logistic:', response.statusText);
            }
        } catch (error) {
            toast.error('Error rejecting logistic:', error.message);
        }
    };

    const onFinishFailed = (errorInfo) => {
        
    };


    const fetchDashboadinfo = async () => {
        const res = await axios.get(`${config.baseURL}/Logistic/logistics-summary`)
        // 
        setlogsummary(res.data)
    }
    const fetchlogistic = async () => {
        const res = await axios.get(`${config.baseURL}/Logistic/getAllLogistics`)

        setlogisticList(res.data)

    }
    return (
        <div>

            <div className="flex  flex-wrap md:flex-wrap gap-2">

                <div className=" rounded-xl shadow-md">
                    <div className="flex gap-3 p-5 items-start justify-start ">
                        <div>
                            <div className=" font-extrabold">{logsummary?.totalRequestsCount}</div>
                            <div className=" text-base leading-[24px]">
                                Total request made
                            </div>
                        </div>
                        <div>
                            <img
                                className=" w-[50px] h-[50px]"
                                alt=""
                                src="/images/img9.png"
                            />
                        </div>
                    </div>

                    <div className="flex flex-row items-center justify-start text-xs text-grey-70 m-2">
                        <FaLongArrowAltUp />
                        <div className="relative leading-[20px]">
                            12 more than last year
                        </div>
                    </div>
                </div>

                {/* total application */}

                <div className=" rounded-xl shadow-md">
                    <div className="flex gap-3 p-5 items-start justify-start ">
                        <div>
                            <div className=" font-extrabold">{logsummary?.totalAmount}</div>
                            <div className=" text-base leading-[24px]">
                                Total cost incurred
                            </div>
                        </div>
                        <div>
                            <img
                                className=" w-[50px] h-[50px]"
                                alt=""
                                src="/images/img10.png"
                            />
                        </div>
                    </div>
                    {/* 
    <div className="flex flex-row items-center justify-start text-xs text-grey-70 m-2">
    <FaLongArrowAltUp />
        <div className="relative leading-[20px]">
            0.2% than last quater
        </div>
    </div> */}
                </div>

                {/* Total projects */}

                <div className=" rounded-xl shadow-md">
                    <div className="flex gap-3 p-5 items-start justify-start ">
                        <div>
                            <div className=" font-extrabold">{logsummary?.pendingCount}</div>
                            <div className=" text-base leading-[24px]">
                                Pending Request
                            </div>
                        </div>
                        <div>
                            <img
                                className=" w-[50px] h-[50px]"
                                alt=""
                                src="/images/img11.png"
                            />
                        </div>
                    </div>

                    {/* <div className="flex flex-row items-center justify-start text-xs text-grey-70 m-2">
        <img
            className="w-6 relative h-6"
            alt=""
            src="/small-arrow-up.svg"
        />
        <div className="relative leading-[20px]">
            2% more than last quater
        </div>
    </div> */}
                </div>

                {/* Total departments */}

                <div className=" rounded-xl shadow-md">
                    <div className="flex gap-3 p-5 items-start justify-start ">
                        <div>
                            <div className=" font-extrabold">{logsummary?.approvedCount}</div>
                            <div className=" text-base leading-[24px]">
                                Approved Request
                            </div>
                        </div>
                        <div>
                            <img
                                className=" w-[50px] h-[50px]"
                                alt=""
                                src="/images/img12.png"
                            />
                        </div>
                    </div>

                    <div className="flex flex-row items-center justify-start text-xs text-grey-70 m-2">
                        <FaLongArrowAltUp />
                        <div className="relative leading-[20px]">
                            2% more than last quater
                        </div>
                    </div>
                </div>


            </div>


            <div className="bg-white rounded-xl shadow-md mt-4  p-8 ">
                <div className="flex md:flex-wrap flex-wrap gap-7 cursor-pointer justify-between items-center">
                    <div className="md:text-bold text-[20px]">Logistic Request</div>

                    <button
                        className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
                        onClick={() => navigate("/admin/logistic/logistic-request")}
                    >
                        Make logistics request
                    </button>
                </div>
            </div>

            <div className="mt-10">

                <div className="bg-white rounded-xl shadow-md mt-6 p-3">
                    <div className="font-bold md:text-base flex mt-3">All Logistics Request</div>
                    <div className="overflow-auto md:overflow-auto  md:overflow-x-scroll mt-6  text-left text-xl text-black font-body-3-small">
                        <div className=" text-xs text-grey-70">
                            <Table
                                columns={logisticColumns}
                                dataSource={logisticList}
                                pagination={{ pageSize: 7 }}
                                size="middle"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Modal
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
            </Modal>
        </div>
    )
}

export default Logistics