
import React ,{ useEffect, useState }from "react";
import { Table } from "antd";
import { FaLongArrowAltUp } from "react-icons/fa"
import { budgetColumns, logisticColumns } from "../utils/columns";
import { dummyBudgetData, dummyLogisticData } from "../utils/dummyData";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import config from "../configuration/config";

const  OfficeBudget=()=>{
    const[budgetList, setbudgetList]= useState();
    const[budgetSummary, setSummary]= useState()
    const navigate= useNavigate()
    
    useEffect(()=>{
        fetchbudget()
        fetchSummary()
    },[])

    const fetchSummary= async()=>{
        const res= await axios.get(`${config.baseURL}/budget/budget-summary`)
        setSummary(res.data)
    }
    const fetchbudget=async()=>{
        const res = await axios.get(`${config.baseURL}/budget/getAllbudget`)
       
       setbudgetList(res.data)
   
       }
return(
    <div>

<div className="flex  flex-wrap md:flex-wrap gap-2">

<div className=" rounded-xl shadow-md">
    <div className="flex gap-3 p-5 items-start justify-start ">
        <div>
            <div className=" font-extrabold">{budgetSummary?.totalBudget}</div>
            <div className=" text-base leading-[24px]">
                Total Budget
            </div>
        </div>
        <div>
            <img
                className=" w-[50px] h-[50px]"
                alt=""
                src="/images/img13.png"
            />
        </div>
    </div>
{/* 
    <div className="flex flex-row items-center justify-start text-xs text-grey-70 m-2">
    <FaLongArrowAltUp />
        <div className="relative leading-[20px]">
            12% more than last year
        </div>
    </div> */}
</div>

{/* total application */}

<div className=" rounded-xl shadow-md">
    <div className="flex gap-3 p-5 items-start justify-start ">
        <div>
            <div className=" font-extrabold">{budgetSummary?.totalAmountUsed}</div>
            <div className=" text-base leading-[24px]">
               Amount Used
            </div>
        </div>
        <div>
            <img
                className=" w-[50px] h-[50px]"
                alt=""
                src="/images/img14.png"
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
            <div className=" font-extrabold">{budgetSummary?.totalBalance}</div>
            <div className=" text-base leading-[24px]">
                Total budget balance
            </div>
        </div>
        <div>
            <img
                className=" w-[50px] h-[50px]"
                alt=""
                src="/images/img15.png"
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
            <div className=" font-extrabold">{budgetSummary?.variancePercentage}%</div>
            <div className=" text-base leading-[24px]">
              Budget % used
            </div>
        </div>
        <div>
            <img
                className=" w-[50px] h-[50px]"
                alt=""
                src="/images/img16.png"
            />
        </div>
    </div>


</div>


</div>


<div className="bg-white rounded-xl shadow-md mt-4  p-8 ">
        <div className="flex md:flex-wrap flex-wrap gap-7 cursor-pointer justify-between items-center">
            <div className="md:text-bold text-[20px]">Create a Budget</div>
        
          <button
            className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
            onClick={() => navigate("/admin/budget/create-budget")}
          >
        Create Budget
          </button>
        </div>
      </div>

      <div className="mt-10">
                
                <div className="bg-white rounded-xl shadow-md mt-6 p-3">
                <div className="font-bold md:text-base flex mt-3">Budget History</div>
                <div className="overflow-auto md:overflow-auto  md:overflow-x-scroll mt-6  text-left text-xl text-black font-body-3-small">
              <div className=" text-xs text-grey-70">
                <Table
                  columns={budgetColumns}
                  dataSource={budgetList}
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

export default OfficeBudget