import React ,{ useEffect, useState }from "react";
import { Table, Modal } from "antd";
import { dummyCircularData } from "../utils/dummyData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../configuration/config";
const Circular = () => {
    const[circularList, setcircularList]= useState();
    const [searchText, setSearchText] = useState("");
    const navigate= useNavigate();
    const [selectedCircular, setSelectedCircular] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const circularColumns = [
        {
            title: "S/N",
            dataIndex: "serialNumber",
            key: "serialNumber",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Circular Title",
            dataIndex: "circularTitle",
            key: "title",
        },
        {
            title: "Sent From",
            dataIndex: "sentFrom",
            key: "sentFrom",
        },
        {
            title: "Sent To",
            dataIndex: "sentTo",
            key: "sentTo",
        },
        {
            title: "Date",
            dataIndex: "generatedDate",
            key: "date",
        },
        {
            title: "Circular Type",
            dataIndex: "circularType",
            key: "circularType",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (_, record) => (
                <span
                    className="text-transparent !bg-clip-text [background:linear-gradient(135deg,_#14add5,_#384295)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] cursor-pointer font-semibold"
                    onClick={() => {
                        setSelectedCircular(record);
                        setIsModalOpen(true);
                    }}
                >
                    View more
                </span>
            ),
        },
    ];

    useEffect(()=>{
        fetchcircular()
    },[])
    const handleSearch = (e) => {
        setSearchText(e.target.value);
     
      };

    const fetchcircular=async()=>{
     const res = await axios.get(`${config.baseURL}/circulars/getCircular`)
    
    setcircularList(res.data)

    }
    return (
        <div className="w-full">




            <div className="overflow-hidden grid w-full justify-start items-end gap-[20px_7px] md:grid-cols-4 sm:grid-cols-2  md:auto-cols-auto">

            <div className="w-[350px] col-span-1 flex flex-col items-start justify-start gap-[8px_0px]">
                    <div className="">
                        Quick search a Circular
                    </div>
                    <div className="  h-[50px] text-grey-50">
                        <input className=" h-[102%] w-[100.29%] p-2 rounded-3xs box-border border-[1px] border-solid border-grey-40" placeholder="Enter search word"
                        onChange={handleSearch} />

                    </div>
                </div>

                <div className="flex flex-col  justify-start items-baseline text-5xl text-relia-energy-black">
                    <div className=" font-extrabold text-9xl">{circularList?.length}</div>
                    <div className=" text-sm leading-[24px] text-grey-70">
                        Total Circular
                    </div>
                </div>


              



                <div className="flex flex-col items-start justify-start">
                    <div className="flex flex-col items-start justify-start gap-[8px_0px]">
                        <div className=" leading-[24px]">Filter circular</div>

                        <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">All circular <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                        </button>


                        <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                                </li>
                            </ul>
                        </div>


                    </div>
                </div>
<div className="flex items-baseline">
<button className="w-[180px] rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
onClick={()=>{navigate('/admin/circular/create-circular')}}
>
                    <div className=" leading-[24px]">Create Circular</div>
                </button>
</div>
               



            </div>


            <div className="mt-20">
                
            <div className="bg-white rounded-xl shadow-md mt-6 p-3">
            <div className="font-bold md:text-base flex mt-3">All Circular</div>
            <div className="overflow-auto md:overflow-auto  md:overflow-x-scroll mt-6  text-left text-xl text-black font-body-3-small">
          <div className=" text-xs text-grey-70">
            <Table
              rowKey="_id"
              columns={circularColumns}
              dataSource={circularList?.filter((circular) => {
                const search = searchText?.toLowerCase();
                return (
                  circular.circularTitle?.toLowerCase().includes(search) ||
                  circular.circularType?.toLowerCase().includes(search) 
            
                );
              })}
              pagination={{ pageSize: 7 }}
              size="middle"
            />
          </div>
        </div>
            </div>
            </div>

            <Modal
                title={<span className="text-xl font-bold text-slate-800">{selectedCircular?.circularTitle}</span>}
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <button 
                        key="close" 
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition cursor-pointer"
                    >
                        Close
                    </button>
                ]}
            >
                <div className="mt-4 space-y-3 text-slate-700">
                    <div className="mb-2">
                        <span className="font-semibold text-slate-500">Sent From: </span>
                        <span className="text-slate-800">{selectedCircular?.sentFrom}</span>
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold text-slate-500">Sent To: </span>
                        <span className="text-slate-800">{selectedCircular?.sentTo}</span>
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold text-slate-500">Date: </span>
                        <span className="text-slate-800">{selectedCircular?.generatedDate}</span>
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold text-slate-500">Type: </span>
                        <span className="text-slate-800">{selectedCircular?.circularType}</span>
                    </div>
                    <div className="mt-4 border-t pt-4">
                        <div className="font-semibold text-slate-500 mb-1">Message:</div>
                        <div className="bg-slate-50 p-4 rounded-md whitespace-pre-wrap text-slate-800 border">
                            {selectedCircular?.circularMessage}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>

    )
}
export default Circular;