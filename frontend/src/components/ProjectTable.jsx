import React from "react";
import { Table , Space, Badge} from "antd";

const ProjectTable = ({data}) => {
  const projectColumns = [
    {
        title: "S/N",
        dataIndex: "serialNumber",
        key: "serialNumber",
        render: (_, __, index) => index + 1,
    },
    // {
    //     title: "Title",
    //     dataIndex: "projectTitle",
    //     key: "projectTitle",
    // },
    {
        title: "Project Name",
        dataIndex: "projectName",
        key: "projectName",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "Manager Assigned",
        dataIndex: "manager",
        key: "firstname",
        render: (manager) => manager?.firstname,
    },

    // {
    //     title: "Sent To",
    //     dataIndex: "sentTo",
    //     key: "sentTo",
    // },
    // {
    //     title: "Date",
    //     dataIndex: "generatedDate",
    //     key: "generatedDate",
    // },
    {
        title: "Status",
        dataIndex: "projectStatus",
        key: "projectStatus",
        render: (text) => (
            <Space size="middle">
              <Badge status={text === "Pending" || text==="Rejected" ? "error" : "success"} />
              {text}
            </Space>
          ),
    },
    // {
    //     title: "Reason",
    //     dataIndex: "reject_reason",
    //     key: "reject_reason",
    // },
    // {
    //     title: 'Action',
    //     key: 'action',
    //     render: (_, record) => (
    //         <div>
    //             {record.status === "Rejected" ?
    //                 <Button type="primary" onClick={() => handleApprove(record)}>Approve</Button>
    //                 : <>
    //                     {record.status === "Approved" ? '' :
    //                         <Button type="primary" onClick={() => handleApprove(record)}>Approve</Button>
    //                     }
    //                     <Button type="danger" className='bg-red-500' onClick={() => handleReject(record)}>Reject</Button>
    //                 </>}

    //         </div>
    //     )
    // }
];



  return (
    <div className=" overflow-y-auto bg-white rounded-xl shadow-md">
      <div className="flex flex-col items-start justify-start gap-4 p-4">
        <div className="font-extrabold">Projects</div>
        <div className="overflow-y-auto h-[300px] text-xs text-grey-70">
          <Table columns={projectColumns} dataSource={data} pagination={false} />
        </div>
      </div>
    </div>
  );
};

export default ProjectTable;
