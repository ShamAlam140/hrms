import React, { useEffect, useState } from "react";
// import { memoColumns } from "../utils/columns";
import { Table } from "antd";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../configuration/config";

const Memo = () => {
    const [memoList, setMemoList] = useState();
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();
    const memoColumns = [
        {
            title: "S/N",
            dataIndex: "serialNumber",
            key: "serialNumber",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Memo Title",
            dataIndex: "memoTitle",
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
            title: "Attachment?",
            dataIndex: "addAttachment",
            key: "attachment",
        },
        {
            title: "Memo Type",
            dataIndex: "memoType",
            key: "memoType",
        },
    
        {
            title: 'Action ',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
              <>
                {/* <span
                  className="text-transparent !bg-clip-text [background:linear-gradient(135deg,_#14add5,_#384295)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] cursor-pointer"
                  onClick={() => handleEdit(record._id)}
                >
                  Edit
                </span> */}
                <span
                  className="text-transparent !bg-clip-text [background:linear-gradient(135deg,_#14add5,_#384295)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] cursor-pointer"
                  onClick={() => handleDelete(record._id)}
                >
                  Delete
                </span>
              </>
            ),
          },
    ];
    
    useEffect(() => {
        fetchmemo()
    }, [])
    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const fetchmemo = async () => {
        const res = await axios.get(`${config.baseURL}/memo/getMemo`)
        setMemoList(res.data)

    }

    const handleDelete = async (id) => {
        try {
          await axios.delete(`${config.baseURL}/memo/${id}`);
          toast.success('Successfully deleted..')
          fetchmemo()
        //   setrefreshFlag(!refreshFlag)
        } catch (error) {
          console.error(error);
          toast.error("Something went wrong ..")
        }
      };


    return (
        <div className="w-full">




            <div className=" grid w-full justify-start items-end gap-[20px_7px] md:grid-cols-4 sm:grid-cols-2  md:auto-cols-auto">


                <div className="flex flex-col  justify-start items-baseline text-9xl text-relia-energy-black">
                    <div className=" font-extrabold">{memoList?.length}</div>
                    <div className=" text-sm leading-[24px] text-grey-70">
                        Total memo
                    </div>
                </div>


                <div className="w-[350px] col-span-1 flex flex-col items-start justify-start gap-[8px_0px]">
                    <div className="">
                        Quick search a memo
                    </div>
                    <div className="  h-[50px] text-grey-50">
                        <input className=" h-[102%] w-[100.29%] p-2 rounded-3xs box-border border-[1px] border-solid border-grey-40" placeholder="Enter search word"
                            value={searchText}
                            onChange={handleSearch}
                        />

                    </div>
                </div>



{/* 
                <div className="flex flex-col items-start justify-start">
                    <div className="flex flex-col items-start justify-start gap-[8px_0px]">
                        <div className=" leading-[24px]">Filter memo</div>

                        <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">All memo <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                        </svg>
                        </button>


                        <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
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
                </div> */}
                <div className="flex items-baseline">
                    <button className="w-[180px] rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
                        onClick={() => { navigate('/admin/memo/create-memo') }}
                    >
                        <div className=" leading-[24px]">Create Memo</div>
                    </button>
                </div>




            </div>


            <div className="mt-20">

                <div className="bg-white rounded-xl shadow-md mt-6 p-3">
                    <div className="font-bold md:text-base flex mt-3">All Memo</div>
                    <div className="overflow-auto md:overflow-auto  md:overflow-x-scroll mt-6  text-left text-xl text-black font-body-3-small">
                        <div className=" text-xs text-grey-70">
                            <Table
                                columns={memoColumns}
                                dataSource={memoList?.filter((memo) => {
                                    const search = searchText?.toLowerCase();
                                    return (
                                        memo.memoTitle?.toLowerCase().includes(search) ||
                                        memo.memoType?.toLowerCase().includes(search)

                                    );
                                })}
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
export default Memo;