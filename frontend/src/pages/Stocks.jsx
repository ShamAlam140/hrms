import React, { useEffect, useState } from "react";
import { Table , Space, Badge} from "antd";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa"
import { logisticColumns, stockColumns } from "../utils/columns";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../configuration/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Stocks = () => {
    const navigate = useNavigate()
    const [stockList, setstockList] = useState();
    const [stockSummary, setStockSummary]= useState()
    const [file, setFile] = useState(null);
    const[refresflag, setrefreshflag]= useState(false)
    useEffect(() => {
        fetchStock()
        fetchsummary()
    }, [])

    const fetchsummary=async()=>{
        const res= await axios.get(`${config.baseURL}/stocks/stock-summary`)
        // 
        setStockSummary(res.data)
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        try {
            const formData = new FormData();
            
            formData.append('file', file);

            const response = await axios.post(`${config.baseURL}/upload/upload-stockCsv`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
                toast.success("file Uploaded successfully")
                setrefreshflag(!refresflag)
             // Output success message
        } catch (error) {
            console.error('Error:', error);

            toast.error("Something went wrong")
        }
    };
    const fetchStock = async () => {
        const res = await axios.get(`${config.baseURL}/stocks/getStocks`)
        setstockList(res.data)
    }


    return (
        <div>

            <div className="flex w-full  flex-wrap md:flex-wrap gap-8">

                <div className=" rounded-xl shadow-md">
                    <div className="flex gap-3 p-5 items-start justify-start ">
                        <div>
                            <div className=" font-extrabold">{stockSummary?.totalCategories}</div>
                            <div className=" text-base leading-[24px]">
                                Categories
                            </div>
                        </div>
                        <div>
                            <img
                                className=" w-[50px] h-[50px]"
                                alt=""
                                src="/images/img17.png"
                            />
                        </div>
                    </div>

                    <div className="flex flex-row items-center justify-start text-xs text-grey-70 m-2">
                        <FaLongArrowAltUp />
                        <div className="relative leading-[20px]">
                            3 more than last year
                        </div>
                    </div>
                </div>

                {/* total application */}

                <div className=" rounded-xl shadow-md">
                    <div className="flex gap-3 p-5 items-start justify-start ">
                        <div>
                            <div className=" font-extrabold">{stockSummary?.totalItems}</div>
                            <div className=" text-base leading-[24px]">
                                Total items
                            </div>
                        </div>
                        <div>
                            <img
                                className=" w-[50px] h-[50px]"
                                alt=""
                                src="/images/img18.png"
                            />
                        </div>
                    </div>

                    <div className="flex flex-row items-center justify-start text-xs text-grey-70 m-2">
                        <FaLongArrowAltUp />
                        <div className="relative leading-[20px]">
                            10 than last quater
                        </div>
                    </div>
                </div>

                {/* Total projects */}

                <div className=" rounded-xl shadow-md">
                    <div className="flex gap-3 p-5 items-start justify-start ">
                        <div>
                            <div className=" font-extrabold">{stockSummary?.totalCosts}</div>
                            <div className=" text-base leading-[24px]">
                                Total item cost
                            </div>
                        </div>
                        <div>
                            <img
                                className=" w-[50px] h-[50px]"
                                alt=""
                                src="/images/img19.png"
                            />
                        </div>
                    </div>

                    <div className="flex flex-row items-center justify-start text-xs text-grey-70 m-2">
                        <FaLongArrowAltDown />
                        <div className="relative leading-[20px]">
                            2% less than last quater
                        </div>
                    </div>
                </div>

                {/* Total departments */}

                <div className=" rounded-xl shadow-md">
                    <div className="flex gap-3 p-5 items-start justify-start ">
                        <div>
                            <div className=" font-extrabold">100</div>
                            <div className=" text-base leading-[24px]">
                                Items low in stock
                            </div>
                        </div>
                        <div>
                            <img
                                className=" w-[50px] h-[50px]"
                                alt=""
                                src="/images/img20.png"
                            />
                        </div>
                    </div>

                    <div className="flex flex-row items-center justify-start text-xs text-grey-70 m-2">
                        <FaLongArrowAltUp />
                        <div className="relative leading-[20px]">
                            2% more than last week
                        </div>
                    </div>
                </div>


            </div>


            <div className="bg-white rounded-xl shadow-md mt-4  p-8 ">
                <div className="flex md:flex-wrap flex-wrap gap-7 cursor-pointer justify-between items-center">
                    <div className="md:text-bold text-[20px]">Update Stock list</div>
                    <div
                        className="flex items-baseline gap-3"
                    >

                        <label className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" for="file_input">Choose CSV file</label>
                        <input
                            className="hidden mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                            // className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            id="file_input" type="file"
                            onChange={handleFileChange}
                        />
                        <button onClick={handleUpload}

                            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload</button>
                    </div>

                    <button
                        className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
                        onClick={() => navigate("/admin/stock/update-stock")}
                    >
                        Update Stock
                    </button>
                </div>
            </div>

            <div className="mt-10">

                <div className="bg-white rounded-xl shadow-md mt-6 p-3">
                    <div className="font-bold md:text-base flex mt-3"> Stock List </div>
                    <div className="overflow-auto md:overflow-auto  md:overflow-x-scroll mt-6  text-left text-xl text-black font-body-3-small">
                        <div className=" text-xs text-grey-70">
                            <Table
                                columns={stockColumns}
                                dataSource={stockList}
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

export default Stocks