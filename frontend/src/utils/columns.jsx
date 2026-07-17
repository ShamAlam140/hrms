import { Image } from "antd";
import { Table , Space, Badge} from "antd";
import { NavLink } from "react-router-dom";


export const taxcolumns=[
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
        dataIndex: "percent",
        key: "percent",   
    },

    {
        title: "Action ",
        dataIndex: "action",
        key: "action",
        render: (_, record) => (
            <>
             <span
                className="text-transparent !bg-clip-text [background:linear-gradient(135deg,_#14add5,_#384295)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] cursor-pointer"
                // onClick={() => onViewMoreTextClick(record)}
            >
                Edit
            </span>
            <span
                className="text-transparent !bg-clip-text [background:linear-gradient(135deg,_#14add5,_#384295)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] cursor-pointer"
                // onClick={() => onViewMoreTextClick(record)}
            >
                Delete
            </span>
            </>
           
            
        ),   
    },
]

export const staffDetailsCol=[
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
        dataIndex: "salaryStructure", // Display all allowance fields together
        key: "allowance",
        render: (salaryStructure) => {
            const allowances = Object.values(salaryStructure).reduce((total, allowance) => total + allowance, 0);
            return `₹${allowances.toFixed(2)}`; // Format the total allowance as needed
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
        dataIndex: "deductions", // Display all deduction fields together
        key: "deductions",
        render: (deductions) => {
            const totalDeductions = Object.values(deductions).reduce((total, deduction) => total + deduction, 0);
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
            <NavLink to='/created-payslip'>
        <span
                className="text-transparent !bg-clip-text [background:linear-gradient(135deg,_#14add5,_#384295)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] cursor-pointer"
                

            >
                {}
                View more
            </span>
            </NavLink>
    
        ),
    },
]

export  const salcolumns = [
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
        dataIndex: "basicSalary",
        key: "basicSalary",
        sorter:(record1, record2)=>{
            return record1.basicSalary > record2.basicSalary
        }
    },
    {
        title: "Allowance",
        dataIndex: "allowance",
        key: "allowance",
        sorter:(record1, record2)=>{
            return record1.allowance > record2.allowance
        }
    },
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
        title: "Action",
        dataIndex: "action",
        key: "action",
        render: (_, record) => (
            <span
                className="text-transparent !bg-clip-text [background:linear-gradient(135deg,_#14add5,_#384295)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] cursor-pointer"
                // onClick={() => onViewMoreTextClick(record)}
            >
                View more
            </span>
        ),
    },
];


export  const memoColumns = [
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
        title: "Action",
        dataIndex: "action",
        key: "action",
        render: (_, record) => (
            <span
                className="text-transparent !bg-clip-text [background:linear-gradient(135deg,_#14add5,_#384295)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] cursor-pointer"
                // onClick={() => onViewMoreTextClick(record)}
            >
                View more
            </span>
        ),
    },
];



export  const trainingColumns = [
    {
        title: "S/N",
        dataIndex: "serialNumber",
        key: "serialNumber",
        render: (_, __, index) => index + 1,
    },
    {
        title: "Training Description ",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "Sent From",
        dataIndex: "sentFrom",
        key: "sentFrom",
    },
    {
        title: "Start Date",
        dataIndex: "startDate",
        key: "startDate",
    },
    {
        title: "Training Type",
        dataIndex: "trainingType",
        key: "trainingType",
    },
    {
        title: "Duration",
        dataIndex: "duration",
        key: "duration",
    },
    {
        title: "Training Mode",
        dataIndex: "mode",
        key: "mode",
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
                className="text-transparent !bg-clip-text [background:linear-gradient(135deg,_#14add5,_#384295)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] cursor-pointer"
                // onClick={() => onViewMoreTextClick(record)}
            >
                View more
            </span>
        ),
    },
];

export  const procurementColumns = [
    {
        title: "S/N",
        dataIndex: "serialNumber",
        key: "serialNumber",
        render: (_, __, index) => index + 1,
    },
    {
        title: "Items",
        dataIndex: "item",
        key: "item",
    },
    {
        title: "Qty",
        dataIndex: "quantity",
        key: "quantity",
    },
    {
        title: "Amount",
        dataIndex: "totalPrice",
        key: "totalPrice",
    },
    {
        title: "Requested By",
        dataIndex: "requestedBy",
        key: "requestedBy",
    },
    {
        title: "Send to",
        dataIndex: "sentTo",
        key: "sentTo",
    },
    {
        title: "Date",
        dataIndex: "date",
        key: "date",
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
                className="text-transparent !bg-clip-text [background:linear-gradient(135deg,_#14add5,_#384295)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] cursor-pointer"
                // onClick={() => onViewMoreTextClick(record)}
            >
                View more
            </span>
        ),
    },
];
export  const logisticColumns = [
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
    },
    {
        title: "Action",
        dataIndex: "action",
        key: "action",
        render: (_, record) => (
            <span
                className="text-transparent !bg-clip-text [background:linear-gradient(135deg,_#14add5,_#384295)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] cursor-pointer"
                // onClick={() => onViewMoreTextClick(record)}
            >
                View more
            </span>
        ),
    },
];

export  const budgetColumns = [
    {
        title: "S/N",
        dataIndex: "serialNumber",
        key: "serialNumber",
        render: (_, __, index) => index + 1,
    },
    {
        title: "Budget No.",
        dataIndex: "budgetNo",
        key: "budgetNo",
    },
    {
        title: "Budget Description",
        dataIndex: "budgetDescription",
        key: "description",
    },
    // {
    //     title: "Amount",
    //     dataIndex: "amount",
    //     key: "amount",
    // },
    {
        title: "Budgeted Amount",
        dataIndex: "budgetedAmount",
        key: "budgetAmount",
    },

    {
        title: "Actual Amount",
        dataIndex: "actualAmount",
        key: "actualAmount",
    },
    {
        title: "Variance",
        dataIndex: "variance",
        key: "variance",
    },
    {
        title: "Date",
        dataIndex: "generatedDate",
        key: "date",
    },
    
];

export  const stockColumns = [
    {
        title: "S/N",
        dataIndex: "serialNumber",
        key: "serialNumber",
        render: (_, __, index) => index + 1,
    },
    {
        title: 'Image',
        dataIndex: 'image',
     
        render: (t, r) => <img src={`${r.image}`} style={{width:'50px', height:'50px'}}/>
     },

    {
        title: "Product Name",
        dataIndex: "productName",
        key: "productName",
    },
    {
        title: "Product ID",
        dataIndex: "productId",
        key: "productId",
    },
    {
        title: "Category",
        dataIndex: "category",
        key: "category",
    },
    {
        title: "QTY Purchased",
        dataIndex: "quantityPurchased",
        key: "quantityPurchased",
    },
    {
        title: "Unit Price",
        dataIndex: "unitPrice",
        key: "unitPrice",
    },
    {
        title: "Total Amount",
        dataIndex: "totalAmount",
        key: "totalAmount",
    },
    {
        title: "Supplier",
        dataIndex: "supplier",
        key: "supplier",
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (text) => (
            <Space size="middle">
              <Badge status={text === "Out of Stock" || text==="Rejected" ? "error" : "success"} />
              {text}
            </Space>
          ),
    },
];

export  const circularColumns = [
    {
        title: "S/N",
        dataIndex: "serialNumber",
        key: "serialNumber",
        render: (_, __, index) => index + 1,
    },
    {
        title: "Cirular Title",
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
    // {
    //     title: "Attachment?",
    //     dataIndex: "attachment",
    //     key: "attachment",
    // },
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
                className="text-transparent !bg-clip-text [background:linear-gradient(135deg,_#14add5,_#384295)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] cursor-pointer"
                // onClick={() => onViewMoreTextClick(record)}
            >
                View more
            </span>
        ),
    },
];
export  const payrollcolumns = [
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
                className="text-transparent !bg-clip-text [background:linear-gradient(135deg,_#14add5,_#384295)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] cursor-pointer"
                // onClick={() => onViewMoreTextClick(record)}
            >
                View more
            </span>
        ),
    },
];
