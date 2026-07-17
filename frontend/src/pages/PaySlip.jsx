import React, { useEffect, useState , useRef} from "react";
import SalaryTable from "../components/SalaryTable";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import './payslip.css'
import axios from "axios";
import config from "../configuration/config";
import generatePDF from 'react-to-pdf';
const PaySlip = ({ payslip }) => {
  const navigate = useNavigate();
  const targetRef = useRef();

  const { employeeId, month, year } = useParams();
  const [empData, setEmpData]= useState()
  const [empAttendData, setEmpAttendData]= useState()
  const [payslipdata, setpayslipdata]= useState()
  const [leavesdata, setleavesdata]= useState()

  const[totalGrossSalary, setTotalGrossSalary]= useState();
  const[totalNetSalary, setTotalNetSalary]= useState();
  
  useEffect(()=>{
    fetchpayslipdata()
    fetchattendance()
    fetchleavesdata()
  },[])
  const fetchpayslipdata = async()=>{
    const res = await axios.get(`${config.baseURL}/payslips/pay-slip/${employeeId}/${month}/${year}`)
    const{employee, deductions, salaryStructure}= res.data.paySlip
    setEmpData(employee);
    setpayslipdata(res.data.paySlip)
    // setSalStructure(salaryStructure)
      

      let totalGrossSal = 0;
for (const key in salaryStructure) {
    if (Object.hasOwnProperty.call(salaryStructure, key)) {
        totalGrossSal += salaryStructure[key];
    }

}

setTotalNetSalary(totalGrossSal - (deductions?.totalDeduction || 0))

// let totaldeduct= 0;
// for(const key in deductions){
//   if(Object.hasOwnProperty.call(deductions, key)){
//     totaldeduct +=deductions[key]
//   }
// }
// 
setTotalGrossSalary(totalGrossSal)
   
  }

  const fetchattendance= async()=>{
    try {
      const res = await axios.get(`${config.baseURL}/attendance/attendance-monthwise/${employeeId}?month=${month}&&year=${year}`)
      
      setEmpAttendData(res.data)
    } catch (error) {
      
    }
  }


  const fetchleavesdata= async()=>{
    try {
      const res = await axios.get(`${config.baseURL}/api/leave/unpaid-leaves/${employeeId}?month=${month}&&year=${year}`)
      setleavesdata(res.data)
    } catch (error) {
      
    }
  

  }

  const getMonthName = (month) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month - 1]; // Month index starts from 0
  };

  const getFinalAmount = () => {
    const basic = payslipdata?.salaryStructure?.basicSalary;
    const workingDays = empAttendData?.totalWorkingDays;
    const daysAttended = empAttendData?.totalDaysAttended;
    const paidLeaves = leavesdata?.totalPaidLeaves;

    if (
      basic === undefined || 
      workingDays === undefined || 
      daysAttended === undefined || 
      paidLeaves === undefined ||
      workingDays === 0
    ) {
      return 0;
    }

    const finalAmount = Math.floor((basic / workingDays) * (daysAttended + paidLeaves) * 100) / 100;
    return isNaN(finalAmount) ? 0 : finalAmount;
  }
  
  return (
    //         <div classNameName="w-full">
    //             <div>
    //             <div classNameName="flex items-center cursor-pointer">
    //                 <span onClick={()=>{navigate('/admin/payroll')}}>
    //                 <FaLongArrowAltLeft/>Back
    //                 </span>

    //             </div>

    //             <div classNameName="shadow-md mt-5 p-4  flex justify-between">
    // <div>
    // <div>
    //    <div classNameName="font-extrabold"> Ajay Gawli</div>
    //    <div classNameName="mt-4 text-center">Full Stack Deveopler</div>
    // </div>
    // </div>

    // <div>
    // <div classNameName="flex md:items-end items-end mt-4">
    //                       <button classNameName="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white" 
    //                     //   onClick={()=>navigate('/admin/payroll/created-payslip')} 
    //                       >Edit PaySlip</button>

    //                   </div>
    // </div>
    //             </div>
    //             </div>
    //             <SalaryTable payslip={payslip}/>

    //         </div>

    <div className="salary-slip">
      <table className="empDetail"  ref={targetRef} >
        <tbody>
        <tr height="100px" style={{ backgroundColor: "#c2d69b" }}>
          <td colSpan='4'>
            <img height="90px" src='/images/logo.png' /></td>
          <td colSpan='4' className="companyName"> Susalabs Pvt Ltd.  </td>
        </tr>
        <tr>
          <th>
            Name
          </th>
          <td className="capitalize">
         {empData?.firstname} &nbsp; {empData?.lastname}
          </td>
          <td></td>
          <th>
            Bank Code
          </th>
          <td>
            {empData?.accountDetails?.bankCode}
          </td>
          <td></td>
          <th>
            Branch Name
          </th>
          <td>
          {empData?.accountDetails?.branchName}
          </td>
        </tr>
        <tr>
          <th>
            Employee Code
          </th>
          <td>
          {empData?.empId}
          </td>
          <td></td>
          <th>
            Bank Name
          </th>
          <td>
          {empData?.accountDetails?.bankName}
          </td>
          <td></td>
          <th>
            Payslip no.
          </th>
          <td>
            {/* XXXXXXXXXX */}
            {payslipdata?.payslipNo}
            {}
          </td>
        </tr>
        <tr>
          
          <th>
            Bank Branch
          </th>
          <td>
          {empData?.accountDetails?.branchName}
          </td><td></td>
          <th>
            Pay Period
          </th>
          <td>
          {getMonthName(payslipdata?.month)}
          </td>
        </tr>
        <tr>
      
          <th>
            Bank A/C no.
          </th>
          <td>
          {empData?.accountDetails?.accountNumber}
          </td>
       
        </tr>
        <tr>
       
         
          <th>
            PAN No:
          </th>
          <td>
          {empData?.pan_number}
          </td>
        </tr>
        <tr className="myBackground">
          <th colSpan="2">
            Payments
          </th>
          <th >
            Particular
          </th>
          <th className="table-border-right">
            Amount (Rs.)
          </th>
          <th colSpan="2">
            Deductions
          </th>
          <th >
            Particular
          </th>
          <th >
            Amount (Rs.)
          </th>
        </tr>
        <tr>
          <th colSpan="2">
            Basic Salary
          </th>
          <td></td>
          <td className="myAlign">
         {payslipdata?.salaryStructure?.basicSalary}
          </td>
          <th colSpan="2" >
            Provident Fund
          </th >
          <td></td>

          <td className="myAlign">
          {payslipdata?.deductions?.employeePension}
          </td>
        </tr >
        <tr>
          <th colSpan="2">
            House Allowance
          </th>
          <td></td>

          <td className="myAlign">
          {payslipdata?.salaryStructure?.houseAllowance}
          </td>
          <th colSpan="2" >
            Tax
          </th >
          <td></td>

          <td className="myAlign">
          {payslipdata?.deductions?.tax}
          </td>
        </tr >
        <tr>
          <th colSpan="2">
            Transport Allowance
          </th>
          <td></td>

          <td className="myAlign">
          
          {payslipdata?.salaryStructure?.transportAllowance}
          </td>
          {/* <th colSpan="2" >
            Unpaid Leaves Deduction
          </th >
          <td></td>
          <td className="myAlign">
          {payslipdata?.deductions?.tax}
          </td> */}
        </tr >
        <tr>
          <th colSpan="2">
            Utility Allowance
          </th>
          <td></td>
          <td className="myAlign">
          {payslipdata?.salaryStructure?.utilityAllowance}
          </td>
       
        </tr >
        <tr>
          <th colSpan="2">
          Productivity Allowance
          </th>
          <td></td>


          <td className="myAlign">
          {payslipdata?.salaryStructure?.productivityAllowance}
          </td>
        </tr >
        <tr>
          <th colSpan="2">
           Communication Allowance
          </th> <td></td>
          <td className="myAlign">
          {payslipdata?.salaryStructure?.communicationAllowance}
          </td>
       
        </tr >
     
        <tr>
          <th colSpan="2">
            Inconvenience Allowance
          </th>
          <td></td>
          <td className="myAlign">
          {payslipdata?.salaryStructure?.inconvenienceAllowance}
          </td>
      
        </tr >
        <tr>
          <td colSpan="4" className="table-border-right"></td>
       
        </tr >
        <tr>
          <td colSpan="4" className="table-border-right"></td>
        
        </tr >
        <tr>
          <td colSpan="4" className="table-border-right"></td>
       
        </tr >
        <tr className="myBackground">
          <th colSpan="3">
            Total Payments
          </th>
          <td className="myAlign">
          {totalGrossSalary && totalGrossSalary}
          </td>
          <th colSpan="3" >
            Total Deductions
          </th >
          <td className="myAlign">
        {payslipdata?.deductions?.totalDeduction}
          </td>
        </tr >
        <tr height="40px">
          <th colSpan="2"  className="table-border-bottom">
          Gross Salary
          </th>
          <th   className="table-border-bottom" >
         
          </th>
          
          <td  id="gross salary" className="table-border-right  table-border-bottom myAlign">
          {totalGrossSalary && totalGrossSalary}
          </td>
          <th colSpan="2" className="table-border-bottom" >
            Net Salary
          </th >
          <td  className="  table-border-bottom">
          </td>
          <td  className="table-border-right  table-border-bottom myAlign">
          {totalNetSalary && totalNetSalary }
          </td>
        </tr >
        <tr>
          <td colSpan="2" >
            {/* Total Income */} &nbsp;
          </td> <td></td>
          <td className="myAlign">
            {/* 00.00 */}
          </td>
          <td colSpan="4"></td>
        </tr >
        <tr className="border-center">
          <th>
            Attend
          </th>
          <th>
            Days in Month
          </th>
          <th>
            Paid Leaves
          </th>
          <th>
            UnPaid Leaves
          </th>
          <td colSpan="4"></td>
        </tr>
        <tr className="border-center">
          <td>{empAttendData?.totalDaysAttended}</td>
          <td>{empAttendData?.totalDaysInMonth}</td>
          <td>{leavesdata?.totalPaidLeaves}</td>
          <td>{leavesdata?.totalUnpaidLeaves}</td>
          <th colSpan="2" className="table-border-bottom">
            Final Amount
          </th>
          <td className="table-border-bottom"></td>
          <td className="table-border-right table-border-bottom myAlign">
            {getFinalAmount()}
          </td>
        </tr>
      </tbody>
      </table >
      <div className="mt-3 w-full flex content-center justify-center">
        <button 
        className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
        onClick={() => generatePDF(targetRef, {filename: 'payslip.pdf'})}>Download PDF</button>
        </div>
    </div >

  )
}

export default PaySlip;