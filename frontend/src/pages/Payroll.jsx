import React, { useEffect, useState } from "react";
import { Table, Modal } from "antd";
import { salcolumns, staffDetailsCol } from "../utils/columns";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {

  payrollDummyData,
  dummyStaffDetailsData
} from "../utils/dummyData";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../configuration/config";

const DynamicTable = ({ columns, dataSource }) => {
  return (
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={dataSource}
      pagination={{ pageSize: 7 }}
      size="middle"
    />
  );
};

const Payroll = () => {
  const [currColumn, setCurrColumn] = useState([]);
  const [refreshFlag, setrefreshFlag]= useState(false)
  const [dashsummary, setdashsummary]= useState()
  const [month, setmonth]=useState(null)
  const [year, setyear]=useState(null)
  const [currData, setcurrData] = useState([]);
  const [activeTab, setActiveTab] = useState("salary");
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const [isPayrollModalOpen, setIsPayrollModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currYear = new Date().getFullYear();
    setmonth(currentMonth)
    setyear(currYear)
    // fetchsummary()
  },[])

  useEffect(() => {
    fetchsummary(); // Call fetchSummary whenever month or year changes
  }, [month, year]);
  
  const fetchsummary=async()=>{
    const res= await axios.get(`${config.baseURL}/payslips/totals?month=${month}&year=${year}`)
  setdashsummary(res.data)
  }

  const handlechangemonth=(e)=>{
    
     setmonth(e.target.value)
     fetchsummary()
  }

  const handlechangeyear=(e)=>{
    
     setyear(e.target.value)
     fetchsummary()
  }
  const months = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
];
const currentYear = new Date().getFullYear();
 const taxcolumns=[
    {
        title: "S/N",
        dataIndex: "serialNumber",
        key: "serialNumber", 
        render: (_, __, index) => index + 1,  
        
    },
    {
        title: "Tax Type",
        dataIndex: "taxType",
        key: "taxType",   
    },
    {
        title: "% value ",
        dataIndex: "percentValue",
        key: "percentValue",   
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
]

const salcolumns = [
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
      title: "Level",
      dataIndex: "level",
      key: "level",
  },
  {
    title: "Basic Salary",
    dataIndex: "salaryStructure", // Access the salary structure object
    key: "basicSalary",
    render: (salaryStructure) => salaryStructure?.basicSalary, // Render the basic salary value
    sorter: (record1, record2) => record1.salaryStructure?.basicSalary - record2.salaryStructure?.basicSalary
  },
  // {
  //     title: "Allowance",
  //     dataIndex: "allowance",
  //     key: "allowance",
  //     sorter:(record1, record2)=>{
  //         return record1.allowance > record2.allowance
  //     }
  // },
  {
      title: "Gross Salary",
      dataIndex: "grossSalary",
      key: "grossSalary",
      sorter:(record1, record2)=>{
          return record1.grossSalary > record2.grossSalary
      }
  },
  {
      title: "Deductions",
      dataIndex: "deductions",
      key: "deductions",
      sorter:(record1, record2)=>{
          return record1.deductions > record2.deductions
      }
  },
  {
      title: "Net Salary",
      dataIndex: "netSalary",
      key: "netSalary",
      sorter:(record1, record2)=>{
          return record1.netSalary > record2.netSalary
      }
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
          onClick={() => handleDeletesal(record._id)}
        >
          Delete
        </span>
      </>
    ),
  },
];

const staffDetailsCol=[
  {
      title: "S/N",
      dataIndex: "serialNumber",
      key: "serialNumber",
      render: (_, __, index) => index + 1,
  },
  {
      title: "Staff Name",
      dataIndex: "staffName",
      key: "staffName",
  },
  {
      title: "Title",
      dataIndex: "title",
      key: "title",
  },
  {
      title: "Level",
      dataIndex: "level",
      key: "level",
  },
  {
      title: "Basic Salary",
      dataIndex: ["salaryStructure", "basicSalary"],
      key: "basicSalary",
      render: (basicSalary) => `₹${basicSalary.toFixed(2)}`, // Format the salary as needed
  },
  {
    title: "Allowance",
    dataIndex: "salaryStructure",
    key: "allowance",
    render: (salaryStructure) => {
      const { basicSalary, ...allowances } = salaryStructure; // Exclude basicSalary
      const totalAllowance = Object.values(allowances).reduce((total, allowance) => total + allowance, 0);
      return `₹${totalAllowance.toFixed(2)}`; // Format the total allowance as needed
    },
  },
  {
      title: "Gross Salary",
      dataIndex: "grossSalary",
      key: "grossSalary",
      render: (grossSalary) => `₹${grossSalary}`,
     
  },
  {
    title: "Deductions",
    dataIndex: "deductions",
    key: "deductions",
    render: (deductions) => {
      const { totalDeduction, ...otherDeductions } = deductions; // Exclude totalDeduction
      const totalDeductions = Object.values(otherDeductions).reduce((total, deduction) => total + deduction, 0);
      return `₹${totalDeductions.toFixed(2)}`; // Format the total deductions as needed
    },
  },
  {
      title: "Net Salary",
      dataIndex: "netSalary",
      key: "netSalary",
      render: (netSalary) => `₹${netSalary.toFixed(2)}`, // Format the net salary as needed
  },
  {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        
      <span
              className="text-transparent !bg-clip-text [background:linear-gradient(135deg,_#14add5,_#384295)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] cursor-pointer"
              
            onClick={()=>navigate(`/admin/payroll/created-payslip/${record.employee}/${record.month}/${record.year}`)}
          >
              {}
              View more
          </span>
         
  
      ),
  },
]
const payrollcolumns = [
    {
        title: "S/N",
        dataIndex: "serialNumber",
        key: "serialNumber",
        render: (_, __, index) => index + 1,
    },
    {
        title: "Payment Name",
        dataIndex: "paymentName",
        key: "paymentName",
    },
    {
        title: "Designation",
        dataIndex: "designation",
        key: "designation",
    },
    {
        title: "Date Generated",
        dataIndex: "generatedDate",
        key: "generatedDate",
    },
    {
        title: "Payment Month",
        dataIndex: "month",
        key: "month",
    },
    {
        title: "Payment Year",
        dataIndex: "year",
        key: "year",
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
    },
    {
        title: "Action",
        dataIndex: "action",
        key: "action",
        render: (_, record) => (
            <span
                className="text-transparent !bg-clip-text [background:linear-gradient(135deg,_#14add5,_#384295)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] cursor-pointer font-semibold"
                onClick={() => {
                    setSelectedPayroll(record);
                    setIsPayrollModalOpen(true);
                }}
            >
                View more
            </span>
        ),
    },
];
const handleDeletesal=async(id)=>{
  try {
    await axios.delete(`${config.baseURL}/salarybreakdowns/${id}`);
    toast.success('Successfully deleted..')
    fetchsaldef()
    setrefreshFlag(!refreshFlag)
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong ..")
  }
} 
const fetchtaxdata =async()=>{
  const res=  await axios.get(`${config.baseURL}/taxdefinitions/get`)
  setcurrData(res.data)

}
const handleDelete = async (id) => {
  try {
    await axios.delete(`${config.baseURL}/taxdefinitions/${id}`);
    toast.success('Successfully deleted..')
    fetchtaxdata()
    setrefreshFlag(!refreshFlag)
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong ..")
  }
};


const fetchsaldef=async()=>{
try {
  const res=  await axios.get(`${config.baseURL}/salarybreakdowns/getsalarybreakdown`)
  setcurrData(res.data)
} catch (error) {
  
}
}

  const handleDynamicTable = async(val) => {
    try {
      if (val === "salary") {
      const res=  await axios.get(`${config.baseURL}/salarybreakdowns/getsalarybreakdown`)
        setActiveTab(val);
        setCurrColumn(salcolumns);
        setcurrData(res.data);
      } else if (val === "tax") {
        fetchtaxdata()
        setActiveTab(val);
        setCurrColumn(taxcolumns);
        setcurrData(res.data);
      } else if (val === "payslip") {
        const res=  await axios.get(`${config.baseURL}/payslips/getAllPayslips`)
        setActiveTab(val);
        setCurrColumn(staffDetailsCol);
        setcurrData(res.data);
      } else if (val === "payroll") {
        const res=  await axios.get(`${config.baseURL}/payroll/getAllPayroll`)
        setActiveTab(val);

        setCurrColumn(payrollcolumns);
        setcurrData(res.data);
      }
    } catch (error) {
      
    }

  };

  
  return (
    <div>
      {/* Upper div starts  */}

      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-3  mt-1 ">
      <div className="mt-4">
                        <label htmlFor="month" className="block text-sm text-gray-700 text-left">
                         Month
                        </label>
                        <select
                            id="month"
                            className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            onChange={handlechangemonth}
                            value={month}
                       >
                            <option value="" disabled selected>
                                Select Month
                            </option>
                             {months.map((month, index) => (
                                <option key={index} value={month.value}>{month.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="year" className="block text-sm text-gray-700 text-left">
                          Year
                        </label>
                        <select
                            id="year"
                       
                            className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            onChange={handlechangeyear}
                            value={year}
                       >
                            <option value="" disabled selected>
                                Select Year
                            </option>
                            {[currentYear - 1, currentYear, currentYear + 1].map((year, index) => (
                                <option key={index} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
      </div>
  
      <div className= "mt-5 flex max-xl:flex-col  flex-row gap-3">
        {/* left div starts*/}
        <div>
          <div className="flex  flex-wrap md:flex-wrap gap-1">
            <div className=" rounded-xl shadow-md">
              <div className="flex gap-2 p-5 items-start justify-start ">
                <div>
                  <div className=" font-extrabold text-base">{dashsummary?.totalGrossSalary}</div>
                  <div className=" text-base leading-[24px]">
                    Gross Salary this month
                  </div>
                </div>
                <div>
                  <img
                    className=" w-[50px] h-[50px]"
                    alt=""
                    src="/images/img5.png"
                  />
                </div>
              </div>

              <div className="flex flex-row items-center justify-start text-xs text-grey-70 m-2">
                <div className="">
                  <FaArrowUp className="" />
                  12 more than last quarter
                </div>
              </div>
            </div>

            {/* total application */}

            <div className=" rounded-xl shadow-md">
              <div className="flex gap-2 p-5 items-start justify-start ">
                <div>
                  <div className=" font-extrabold text-base">{dashsummary?.totalNetSalary}</div>
                  <div className=" text-base leading-[24px]">
                    Net salary this month
                  </div>
                </div>
                <div>
                  <img
                    className=" w-[50px] h-[50px]"
                    alt=""
                    src="/images/img6.png"
                  />
                </div>
              </div>

              <div className="flex flex-row items-center justify-start text-xs text-grey-70 m-2">
                <FaArrowUp />
                <div className="relative leading-[20px]">
                  0.2% than last quater
                </div>
              </div>
            </div>

            {/* Total projects */}

            <div className=" rounded-xl shadow-md">
              <div className="flex gap-2 p-5 items-start justify-start ">
                <div>
                  <div className=" font-extrabold text-base">{dashsummary?.totalTax}</div>
                  <div className=" text-base leading-[24px]">
                    Total Tax this month
                  </div>
                </div>
                <div>
                  <img
                    className=" w-[50px] h-[50px]"
                    alt=""
                    src="/images/img7.png"
                  />
                </div>
              </div>

              <div className="flex flex-row items-center justify-start text-xs text-grey-70 m-2">
                <FaArrowDown />
                <div className="relative leading-[20px]">
                  2% more than last quater
                </div>
              </div>
            </div>

            {/* Total departments */}

            <div className=" rounded-xl shadow-md">
              <div className="flex gap-2 p-5 items-start justify-start ">
                <div>
                  <div className=" font-extrabold text-base">9877860</div>
                  <div className=" text-base leading-[24px]">
                    Total Loan this month
                  </div>
                </div>
                <div>
                  <img
                    className=" w-[50px] h-[50px]"
                    alt=""
                    src="/images/img8.png"
                  />
                </div>
              </div>
              <div className="flex flex-row items-center justify-start text-xs text-grey-70 m-2">
                <FaArrowDown />
                <div className="relative leading-[20px]">
                  2% more than last quater
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* left div ends */}
        {/* right div starts  */}
        {/* <div className="bg-white rounded-xl shadow-md md:w-[800px] overflow-auto ">
         <img src="/images/graph.png" alt="" className="md:h-[300px] md:w-[350px] mt-5" />
        </div> */}
        {/* right div ends  */}
      </div>

      {/* upper div ends */}
      {/* center div starts  */}
      <div className="bg-white rounded-xl shadow-md  p-8 ">
        <div className="flex md:flex-wrap flex-wrap gap-7 cursor-pointer">
          <button
            className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
            onClick={() => handleDynamicTable("salary")}
          >
            Salary Breakdown
          </button>
          <button
            className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
            onClick={() => handleDynamicTable("tax")}
          >
            Tax Defination
          </button>
          <button
            className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
            onClick={() => handleDynamicTable("payslip")}
          >
            PaySlips
          </button>
          <button
            className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
            onClick={() => handleDynamicTable("payroll")}
          >
            Payroll
          </button>
        </div>
      </div>
      {/* center div close above */}

      {/* lower div  */}
      {activeTab === "salary" && (
        <div className="flex justify-between  items-center mt-6 p-3 ">
          <div className="font-extrabold">Salary BreakDown</div>
          <button
            className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
            onClick={() => navigate("/admin/payroll/salary-defination")}
          >
            <div className="">Create Salary BreakDown</div>
          </button>
        </div>
      )}

      {activeTab === "tax" && (
        <div className="flex justify-between  items-center mt-6 p-3 ">
          <div className="font-extrabold">Tax Definations</div>
          <button
            className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
            onClick={() => navigate("/admin/payroll/tax-defination")}
          >
            <div className="">Create Tax Defination</div>
          </button>
        </div>
      )}

      {activeTab === "payslip" && (
        <div className="flex justify-between  items-center mt-6 p-3 ">
          <div className="font-extrabold">Employee Payslip History</div>
          <button
            className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
            onClick={() => navigate("/admin/payroll/create-payslip")}
          >
            <div className="">Create PaySlip</div>
          </button>
        </div>
      )}

      {activeTab === "payroll" && (
        <div className="flex justify-between  items-center mt-6 p-3 ">
          <div className="font-extrabold">Employee Payroll History</div>
          <button className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
          onClick={() => navigate("/admin/payroll/create-payroll")}
          >
            <div className="">Create Payroll</div>
          </button>
        </div>
      )}
      <div className="bg-white rounded-xl shadow-md mt-6 p-3">
        <div className="overflow-auto md:overflow-auto  md:overflow-x-scroll   text-left text-xl text-black font-body-3-small">
          <div className=" text-xs text-grey-70">
            <DynamicTable
              columns={currColumn}
              dataSource={currData}
              pagination={{ pageSize: 7 }}
              size="middle"
            />
          </div>
        </div>
      </div>
      {/* lower div close above */}

      <Modal
        title={<span className="text-xl font-bold text-slate-800">{selectedPayroll?.paymentName}</span>}
        open={isPayrollModalOpen}
        onOk={() => setIsPayrollModalOpen(false)}
        onCancel={() => setIsPayrollModalOpen(false)}
        footer={[
          <button 
            key="close" 
            onClick={() => setIsPayrollModalOpen(false)}
            className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition cursor-pointer"
          >
            Close
          </button>
        ]}
      >
        <div className="mt-4 space-y-3 text-slate-700">
          <div className="mb-2">
            <span className="font-semibold text-slate-500">Payment Name: </span>
            <span className="text-slate-800">{selectedPayroll?.paymentName}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-slate-500">Designation: </span>
            <span className="text-slate-800">{selectedPayroll?.designation}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-slate-500">Payment Month: </span>
            <span className="text-slate-800">{selectedPayroll?.month}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-slate-500">Payment Year: </span>
            <span className="text-slate-800">{selectedPayroll?.year}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-slate-500">Generated Date: </span>
            <span className="text-slate-800">{selectedPayroll?.generatedDate}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-slate-500">Status: </span>
            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${selectedPayroll?.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {selectedPayroll?.status}
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default Payroll;
