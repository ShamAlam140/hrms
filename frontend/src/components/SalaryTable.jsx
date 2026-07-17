
import React from "react";
import { Table } from "antd";


const SalaryTable = ({payslip}) => {

  // 
  // const { salaryStructure, deductions, grossSalary, netSalary } = payslip;
  // const totalGrossSalary = data.reduce((total, item) => total + item.amount, 0);

  const columns = [
  {
    title: "Salary Structure",
    dataIndex: "allowanceType",
    key: "allowanceType",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (text) => <div>{text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>,
  },
];

const data = [
  { key: "1", allowanceType: "Basic Salary", amount: 445331 },
  { key: "2", allowanceType: "Housing Allowance", amount: 222666 },
  { key: "3", allowanceType: "Transport Allowance", amount: 89066 },
  { key: "4", allowanceType: "Utility Allowance", amount: 44533 },
  { key: "5", allowanceType: "Productivity Allowance", amount: 89066 },
  { key: "6", allowanceType: "Communication Allowance", amount: 66800 },
  { key: "7", allowanceType: "Inconvenience Allowance", amount: 66800 },
];

  const taxColumns = [
    {
      title: "Deductions",
      dataIndex: "allowanceType",
      key: "allowanceType",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => <div>{text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>,
    },
  ];

  const taxData = [
    { key: "1", allowanceType: "Tax/PAYE", amount: 163696 },
    { key: "2", allowanceType: "Employee Pension", amount: 60565 },
  ];

  const totalDeductions = taxData.reduce((total, item) => total + item.amount, 0);
  // const netsalary = totalGrossSalary - totalDeductions;

  return (
    <div>
      <h2 className="font-bold text-lg mb-2 flex">Salary PaySlip</h2>
      <div className="flex gap-5">
        <span>Month: <span>January</span>
        </span>
        <span>Year: <span>2024</span></span>
        
        </div>

      <div className="grid md:grid-cols-2  grid-cols-1 md:gap-4 mt-5">

        <div className="overflow-auto">
        <Table columns={columns} dataSource={data} pagination={false} />
      <div className="mt-4">
        {/* <b className="mr-4">Gross Salary: {totalGrossSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b> */}
        {/* <b>Net Salary: {netsalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b> */}
      </div>
        </div>

        <div className="overflow-auto">
        {/* <h2 className="font-bold text-lg mt-4 mb-2">Deductions</h2> */}
      <Table columns={taxColumns} dataSource={taxData} pagination={false} />
      <div className="mt-4">
        <b>Total Deductions: {totalDeductions.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b>
      </div>
      <div className="mt-4">
        {/* <b>Net Salary in Words: {convertToWords(netsalary)} Rupees Only</b> */}
      </div>
        </div>
     
     
      </div>
    </div>
  );
};


const convertToWords = (number) => {

  return "Placeholder Words";
};

export default SalaryTable;
