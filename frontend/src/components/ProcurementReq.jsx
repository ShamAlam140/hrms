import React ,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { DatePicker,Table } from "antd";
import { FaLongArrowAltLeft } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import config from "../configuration/config";
const ProcurementReq = () => {
    const navigate = useNavigate()
    const [tableData , settableData]= useState()
    const [formData, setFormData] = useState({
        item: "",
        quantity: "",
        date: null,
        unitPrice: "",
        totalPrice: "",
        requestedBy: "",
        sentTo: "",
        attachmentType: "",
        status:"Pending",
        paymentDetails: {
            accountName: "",
            accountNo: "",
            bankName: ""
        },
        memoActivities: {
            initiatedBy: "",
            verifiedBy: "",
            approvedBy: ""
        }
    });
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handlePaymentDetails = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            paymentDetails: {
                ...formData.paymentDetails,
                [id]: value,
            },
        });
    };

    const handleMemoAcitivities = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            memoActivities: {
                ...formData.memoActivities,
                [id]: value,
            },
        });
    };

    const handleDateChange = (date, dateString) => {
        setFormData({ ...formData, date: dateString });
      };

   const procurementColumns = [
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
      
    ];

    const handleSubmit = async () => {
        try {
            
            const response = await axios.post(`{${config.baseURL}/procurement/create`, formData);
            
            toast.success("Request sent ")
            // Redirect or show success message
        } catch (error) {
            toast.error("Something went Wrong.. ")
            console.error("Error creating request:", error);
            // Handle error (show error message, log, etc.)
        }
    };

    const handleAttachVoucher =()=>{
        const {item, date , quantity ,unitPrice, totalPrice , requestedBy, sentTo}=formData

        const tbdata={
            item, date , quantity ,unitPrice, totalPrice , requestedBy, sentTo , statsu:"Pending"
        }

        
        settableData([tbdata])
    
    }
    return (
        <div className="w-full overflow-auto">

            <div className="shadow-md  p-4 ">
                <div className="flex items-center cursor-pointer">
                    <span onClick={() => { navigate('/admin/procurement') }}>
                        <FaLongArrowAltLeft />Back
                    </span>

                </div>
                <div className="font-bold md:text-base flex mt-5">Training Request</div>
                <div className='grid grid-cols-1 md:grid-cols-3 md:gap-3 '>






                    <div className="mt-4">
                        <label htmlFor="item" className="block text-sm text-gray-700 text-left">
                            Item
                        </label>
                        <input
                            type="text"
                            id="item"
                            className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter item name"
                            onChange={handleChange}
                            value={formData.item}
                        />
                    </div>


                    <div className="mt-4">
                        <label htmlFor="quantity" className="block text-sm text-gray-700 text-left">
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter quantity"
                            onChange={handleChange}
                            value={formData.quantity}
                        />
                    </div>


                    <div className="mt-4">
                        <label htmlFor="date" className="block text-sm text-gray-700 text-left">
                            Date
                        </label>
                        <DatePicker
                            id="date"
                            className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Select Date"
                            onChange={handleDateChange}
                            value={formData.date ? moment(formData.date, 'YYYY-MM-DD') : null}
                        />
                    </div>


                    <div className="mt-4">
                        <label htmlFor="unitPrice" className="block text-sm text-gray-700 text-left">
                            Unit Price
                        </label>
                        <input
                            type="Number"
                            id="unitPrice"
                            className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter amount"
                            onChange={handleChange}
                            value={formData.unitPrice}
                        />
                    </div>


                    <div className="mt-4">
                        <label htmlFor="totalPrice" className="block text-sm text-gray-700 text-left">
                            Total Price
                        </label>
                        <input
                            type="Number"
                            id="totalPrice"
                            className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter amount"
                            onChange={handleChange}
                            value={formData.totalPrice}
                        />
                    </div>


                    <div className="mt-4">
                        <label htmlFor="requestBy" className="block text-sm text-gray-700 text-left">
                            Requested By
                        </label>
                        <input
                            type="text"
                            id="requestedBy"
                            className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter name"
                            onChange={handleChange}
                            value={formData.requestedBy}
                        />
                    </div>

                  

                    <div className="mt-4">
                        <label htmlFor="sentTo" className="block text-sm text-gray-700 text-left">
                            Sent to
                        </label>
                        <select
                            id="sentTo"
                            className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            onChange={handleChange}
                            value={formData.sentTo}
                       >
                            <option value="" disabled selected>
                                Select
                            </option>
                            <option value="HR">HR </option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="addAttachment" className="block text-sm text-gray-700 text-left">
                            Add Attachement
                        </label>
                        <select
                            id="addAttachment"
                            className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            onChange={handleChange}
                            value={formData.addAttachment}
                       >
                            <option value="" disabled selected>
                                Select
                            </option>
                            <option value="Yes">Yes </option>
                            <option value="NO">NO</option>
                        </select>
                    </div>

                    {/* <div className="mt-4">
                        <label htmlFor="attachmentType" className="block text-sm text-gray-700 text-left">
                            Attachement Type
                        </label>
                        <select
                            id="attachmentType"
                            className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                       
                       >
                            <option value="" disabled selected>
                                Select
                            </option>
             
                        </select>
                    </div> */}


                </div>

                <div>

                    <div className="flex md:items-end items-end mt-4 flex-wrap gap-4">
                        <button className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white" 
                        onClick={handleAttachVoucher}
                        >Attach Payment Voucher</button>

                    </div>
                </div>
            </div>

            <div className="font-bold md:text-base flex mt-3"> Procurement Request </div>
                <div className="overflow-auto md:overflow-auto  md:overflow-x-scroll mt-6  text-left text-xl text-black font-body-3-small">
              <div className=" text-xs text-grey-70">
                <Table
                  columns={procurementColumns}
                  dataSource={tableData}
                  pagination={{ pageSize: 7 }}
                  size="middle"
                />
              </div>
            </div>


        <div className="  flex flex-col items-start justify-start gap-[20px_0px] mt-10 shadow-md w-full ">
        <div className=" font-extrabold">Beneficiary Payment Details </div>

        <div className="flex flex-wrap md:flex-wrap gap-4 md:items-end w-full" >
        <div className="mt-4 flex-auto">
        <label htmlFor="accountName" className="block text-sm text-gray-700 text-left">
         Account Name
        </label>
        <input
          type="text"
          id="accountName"
          className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter  name"
          onChange={handlePaymentDetails}
          value={formData.paymentDetails.accountName}
        />
      </div>


      <div className="mt-4 flex-auto">
        <label htmlFor="accountNo" className="block text-sm text-gray-700 text-left">
        Account No.
        </label>
        <input
          type="text"
          id="accountNo"
          className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter number"
          onChange={handlePaymentDetails}
          value={formData.paymentDetails.accountNo}
        />
      </div>

      <div className="mt-4 flex-auto">
        <label htmlFor="bankName" className="block text-sm text-gray-700 text-left">
         Bank Name
        </label>
        <input
          type="text"
          id="bankName"
          className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter bank name"
          onChange={handlePaymentDetails}
          value={formData.paymentDetails.bankName}
        />
      </div>

      {/* <button className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
        >
          <div className="">Submit  Payment Voucher</div>
        </button> */}



        </div>
        </div>


        <div className="  flex flex-col items-start justify-start gap-[20px_0px] mt-10 shadow-md w-full mb-4 ">
        <div className=" font-extrabold">Memo Activities</div>

        <div className="flex flex-wrap md:flex-wrap gap-4 md:items-end w-full" >
        <div className="mt-4 flex-auto">
        <label htmlFor="initiatedBy" className="block text-sm text-gray-700 text-left">
        Initiated by
        </label>
        <input
          type="text"
          id="initiatedBy"
          className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter  name"
          onChange={handleMemoAcitivities}
          value={formData.memoActivities.initiatedBy}
        />
      </div>


      <div className="mt-4 flex-auto">
        <label htmlFor="verifiedby" className="block text-sm text-gray-700 text-left">
        Verified by
        </label>
        <input
          type="text"
          id="verifiedBy"
          className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter name"
          onChange={handleMemoAcitivities}
          value={formData.memoActivities.verifiedBy}
        />
      </div>

      <div className="mt-4 flex-auto">
        <label htmlFor="approvedBy" className="block text-sm text-gray-700 text-left">
       Approved by
        </label>
        <input
          type="text"
          id="approvedBy"
          className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter  name"
          onChange={handleMemoAcitivities}
          value={formData.memoActivities.approvedBy}
        />
      </div>

      {/* <button className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
        >
          <div className="">Submit  Payment Voucher</div>
        </button> */}



        </div>
        </div>
        <div className="flex md:items-end items-end  flex-wrap gap-4 mb-4 mt-4">
                        <button className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
                            onClick={handleSubmit}
                        >Save and Send for Approval</button>
                        {/* <button className="w-[205px] cursor-pointer text-blue-300 focus:outline-none focus:ring border-purple-500  rounded-3xs  h-[46px] flex flex-row items-center justify-center p-2.5 box-border " >Save</button> */}

                    </div>
        </div>
    )
}

export default ProcurementReq