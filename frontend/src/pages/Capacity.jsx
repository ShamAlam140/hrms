import React,{useState, useEffect} from "react";
import { Table } from "antd";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa"
import {  trainingColumns } from "../utils/columns";
import { dummyLogisticData, dummyStockData, dummyTrainingData } from "../utils/dummyData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../configuration/config";

const  Capacity=()=>{
    const navigate= useNavigate()
    const[trainingList, settrainingList]= useState();
    useEffect(()=>{
        fetchtraining()
    },[])
    const handleSearch = (e) => {
        setSearchText(e.target.value);
     
      };

    const fetchtraining=async()=>{
     const res = await axios.get(`${config.baseURL}/capacitybuilding/gettraining`)
    
    settrainingList(res.data)

    }
return(
    <div>

<div className="flex w-full  flex-wrap md:flex-wrap gap-3">

<div className=" rounded-xl shadow-md">
    <div className="flex gap-3 p-5 items-start justify-start ">
        <div>
            <div className=" font-extrabold">350</div>
            <div className=" text-base leading-[24px]">
              Total Training request
            </div>
        </div>
        <div>
            <img
                className=" w-[50px] h-[50px]"
                alt=""
                src="/images/img21.png"
            />
        </div>
    </div>

    {/* <div className="flex flex-row items-center justify-start text-xs text-grey-70 m-2">
    <FaLongArrowAltUp />
        <div className="relative leading-[20px]">
            3 more than last year
        </div>
    </div> */}
</div>

{/* total application */}

<div className=" rounded-xl shadow-md">
    <div className="flex gap-3 p-5 items-start justify-start ">
        <div>
            <div className=" font-extrabold">500</div>
            <div className=" text-base leading-[24px]">
                Total staff trained
            </div>
        </div>
        <div>
            <img
                className=" w-[50px] h-[50px]"
                alt=""
                src="/images/img22.png"
            />
        </div>
    </div>

    {/* <div className="flex flex-row items-center justify-start text-xs text-grey-70 m-2">
    <FaLongArrowAltUp />
        <div className="relative leading-[20px]">
            10 than last quater
        </div>
    </div> */}
</div>

{/* Total projects */}

<div className=" rounded-xl shadow-md">
    <div className="flex gap-3 p-5 items-start justify-start ">
        <div>
            <div className=" font-extrabold">300</div>
            <div className=" text-base leading-[24px]">
                Total training done
            </div>
        </div>
        <div>
            <img
                className=" w-[50px] h-[50px]"
                alt=""
                src="/images/img23.png"
            />
        </div>
    </div>

    {/* <div className="flex flex-row items-center justify-start text-xs text-grey-70 m-2">
      <FaLongArrowAltDown/>
        <div className="relative leading-[20px]">
            2% less than last quater
        </div>
    </div> */}
</div>

{/* Total departments */}

<div className=" rounded-xl shadow-md">
    <div className="flex gap-3 p-5 items-start justify-start ">
        <div>
            <div className=" font-extrabold">70%</div>
            <div className=" text-base leading-[24px]">
           Staff training rate
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

{/* <div className="flex flex-row items-center justify-start text-xs text-grey-70 m-2">
    <FaLongArrowAltUp/>
        <div className="relative leading-[20px]">
            2% more than last week 
        </div>
    </div> */}
</div>


</div>


<div className="bg-white rounded-xl shadow-md mt-4  p-8 ">
        <div className="flex md:flex-wrap flex-wrap gap-7 cursor-pointer justify-between items-center">
            <div className="md:text-bold text-[20px]">Training request</div>
        
          <button
            className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
            onClick={() => navigate("/admin/capacity/training-request")}
          >
        Make Training Request
          </button>
        </div>
      </div>

      <div className="mt-10">
                
                <div className="bg-white rounded-xl shadow-md mt-6 p-3">
                <div className="font-bold md:text-base flex mt-3"> All Trainings </div>
                <div className="overflow-auto md:overflow-auto  md:overflow-x-scroll mt-6  text-left text-xl text-black font-body-3-small">
              <div className=" text-xs text-grey-70">
                <Table
                  columns={trainingColumns}
                  dataSource={trainingList}
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

export default Capacity