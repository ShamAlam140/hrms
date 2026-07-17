import React from "react";
import { Table, Badge, Space } from "antd";


const dataSource = [
  {
    key: "1",
    memoTitle: "Operations memo",
    sn: "01",
    sentFrom: "Otor John",
    sentTo: "Ibrahim Sadiq",
    status: "Pending",
  },
  {
    key: "2",
    memoTitle: "Operations project memo",
    sn: "02",
    sentFrom: "Fatima Faruk",
    sentTo: "Shola Abiola",
    status: "Approved",
  },
  {
    key: "3",
    memoTitle: "Project onboard notice",
    sn: "03",
    sentFrom: "Otor John",
    sentTo: "James Emeka",
    status: "Approved",
  },
  {
    key: "4",
    memoTitle: "Operations memo",
    sn: "04",
    sentFrom: "Ibrahim Musa",
    sentTo: "Otor John",
    status: "Approved",
  },
];

const columns = [
  {
    title: "S/N",
    dataIndex: "sn",
    key: "sn",
    render: (_, __, index) => index + 1,  
  },
  {
    title: "Memo Title",
    dataIndex: "memoTitle",
    key: "memoTitle",
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
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => (
      <Space size="middle">
        <Badge status={text === "Pending" || text==="Rejected" ? "error" : "success"} />
        {text}
      </Space>
    ),
  },
];

const MemoTable = ({memoList}) => {
  
  return (
   
     
      
      <div className=" bg-white rounded-xl shadow-md ">
      <div className="flex flex-col items-start justify-start gap-4 p-4">
        <div className="font-extrabold">Memo</div>
        <div className=" overflow-y-auto text-xs text-grey-70 h-[300px]">
          <Table columns={columns} dataSource={memoList} pagination={false}
        
           />
        </div>
      </div>
    </div>
   
  );
};

export default MemoTable;
