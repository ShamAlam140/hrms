import React from 'react';
import { Table, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';

const columns = [
  {
    title: 'S/N',
    dataIndex: 'serialNumber',
    key: 'serialNumber',
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
    key: 'subject',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Prepared By',
    dataIndex: 'preparedBy',
    key: 'preparedBy',
  },
  {
    title: 'Send To',
    dataIndex: 'sendTo',
    key: 'sendTo',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: () => <a href="#">View more</a>, // You can customize the action column as needed
  },
];

const data = [
  {
    key: '1',
    serialNumber: '01',
    subject: 'Request for FARS for October 2022',
    date: '05/12/2022',
    preparedBy: 'Otor John',
    sendTo: 'Abubakar Sadiq',
  },
  {
    key: '2',
    serialNumber: '01',
    subject: 'Request for FARS for October 2022',
    date: '05/12/2022',
    preparedBy: 'Otor John',
    sendTo: 'Abubakar Sadiq',
  },
  {
    key: '3',
    serialNumber: '01',
    subject: 'Request for FARS for October 2022',
    date: '05/12/2022',
    preparedBy: 'Otor John',
    sendTo: 'Abubakar',
  },
  {
    key: '4',
    serialNumber: '01',
    subject: 'Request for FARS for October 2022',
    date: '05/12/2022',
    preparedBy: 'Otor John',
    sendTo: 'Abubakar',
  },
  {
    key: '5',
    serialNumber: '01',
    subject: 'Request for FARS for October 2022',
    date: '05/12/2022',
    preparedBy: 'Otor John',
    sendTo: 'Abubakar',
  },
  {
    key: '6',
    serialNumber: '01',
    subject: 'Request for FARS for October 2022',
    date: '05/12/2022',
    preparedBy: 'Otor John',
    sendTo: 'Abubakar',
  },


  // Add more data as needed
];

const PaymentVoucherTable = () => {

    const navigate = useNavigate();
  return (
    <div className='w-full'>
 


    <div className=" grid w-full justify-start items-end gap-[20px_7px] md:grid-cols-3 sm:grid-cols-2  md:auto-cols-auto">

{/* <div className="w-[350px] col-span-1 flex flex-col items-start justify-start gap-[8px_0px]">
        <div className="">
            Quick search a Circular
        </div>
        <div className="  h-[50px] text-grey-50">
            <input className=" h-[102%] w-[100.29%] p-2 rounded-3xs box-border border-[1px] border-solid border-grey-40" placeholder="Enter search word" />

        </div>
    </div> */}

    <div className="flex flex-col  justify-start items-baseline text-5xl text-relia-energy-black">
        <div className=" font-extrabold text-3xl">25</div>
        <div className=" text-sm leading-[24px] text-grey-70">
            Total Payment Voucher
        </div>
    </div>


  



    <div className="flex flex-col items-start justify-start">
        <div className="flex flex-col items-start justify-start gap-[8px_0px]">
            <div className=" leading-[24px]">Filter payment voucher</div>

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
    </div>
<div className="flex items-baseline">
<button className="w-[180px] rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
       onClick={()=>{navigate('/admin/paymentvoucher/create')}}
>
        <div className=" leading-[24px]">Create payment voucher</div>
    </button>
</div>
   



</div>

<div className="mt-20">
                
                <div className="bg-white rounded-xl shadow-md mt-6 p-3">
                <div className="font-bold md:text-base flex mt-3">All Payment Voucher</div>
                <div className="overflow-auto md:overflow-auto  md:overflow-x-scroll mt-6  text-left text-xl text-black font-body-3-small">
              <div className=" text-xs text-grey-70">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={{ pageSize: 4 }}
                  size="middle"
                />
              </div>
            </div>
                </div>
                </div>
    

      {/* <Pagination className="mt-4" defaultCurrent={1} total={6} pageSize={2} /> */}



    </div>
  );
};

export default PaymentVoucherTable;
