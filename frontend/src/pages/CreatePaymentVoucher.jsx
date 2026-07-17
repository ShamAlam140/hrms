import EditableTable from "../components/EditableTable";

const CreatePaymentVoucher = () => {
    return (
      <div className="w-full text-left text-xl text-relia-energy-black font-body-3-small">
        <div className=" rounded-xl bg-white " />
        <div className="flex flex-col items-start justify-start gap-[20px_0px]">
          <div className="relative font-extrabold">Payment Voucher</div>
          <div className="relative leading-[24px]">Subject</div>
        <input className=" relative h-[50px] md:w-[300px] w-[200px] rounded-3xs box-border border-[1px] border-solid border-grey-40" placeholder="Enter the subject" type="text" />
          
          <div className="w-full md:overflow-x-auto ">
          <EditableTable/>
          </div>
        
         
        </div>

        <div className="flex flex-col items-start justify-start gap-[20px_0px]">
        <div className="relative font-extrabold">Beneficiary Payment Details </div>

        <div className="flex flex-wrap md:flex-wrap gap-4 md:items-end ">
        <div className="mt-4">
        <label htmlFor="accountName" className="block text-sm text-gray-700 text-left">
         Account Name
        </label>
        <input
          type="text"
          id="accountName"
          className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter  name"
        />
      </div>


      <div className="mt-4">
        <label htmlFor="accountNo" className="block text-sm text-gray-700 text-left">
        Account No.
        </label>
        <input
          type="text"
          id="accountNo"
          className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter number"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="bankName" className="block text-sm text-gray-700 text-left">
         Bank Name
        </label>
        <input
          type="text"
          id="bankName"
          className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter bank name"
        />
      </div>

      <button className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
        >
          <div className="">Submit  Payment Voucher</div>
        </button>



        </div>
        </div>
      </div>
    );
  };
  
  export default CreatePaymentVoucher;
  