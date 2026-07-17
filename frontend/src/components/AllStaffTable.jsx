import React, { useEffect, useState } from "react";
import { Table ,Input } from "antd";
import axios from "axios";
import config from "../configuration/config";
import {SearchOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom";

const AllStaffTable = ({EmpList}) => {
  const navigate = useNavigate()
//  const [EmpList, setEmplist]= useState()
 const [searchText, setSearchText] = useState("");
  // useEffect(()=>{
  //   fetchdata()
  // },[])

  // const fetchdata=async()=>{
  //   try {
  //     const res= await axios.get(`${config.baseURL}/api/user/getAllEmployees`)
  //     setEmplist(res.data.response)
      
  //   } catch (error) {
      
  //   }

  // }

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const onViewMoreTextClick = (record) => {
    // Handle view more click for the specific record
    // record will contain information about the clicked row
    
  };

  const columns = [
    {
      title: "S/N",
      dataIndex: "serialNumber",
      key: "serialNumber",
      render: (_, __, index) => index + 1,  
    },
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "firstname",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search first name"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <button
            type="button"
            onClick={() => handleReset(clearFilters)}
            style={{ width: 90, marginRight: 8 }}
          >
            Reset
          </button>
          <button type="button" onClick={() => handleSearch(selectedKeys, confirm)} style={{ width: 90 }}>
            Search
          </button>
        </div>
      ),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
      onFilter: (value, record) => record.firstname.toLowerCase().includes(value.toLowerCase()),
    
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Staff ID",
      dataIndex: "empId",
      key: "empId",
    },
    {
      title: "Phone Number",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: 'Photo',
      dataIndex: 'photo',
   
      render: (t, r) => <img 
      src={r.photo ? r.photo : '/images/graph.png'} 
       style={{width:'50px', height:'50px'}}
       />
   },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <span
          className="text-transparent !bg-clip-text [background:linear-gradient(135deg,_#14add5,_#384295)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] cursor-pointer"
          onClick={() => navigate(`/admin/staff/staff-profile/${record._id}`)}
        >
          View more
        </span>
      ),
    },
  ];


  return (
    <div className=" text-left text-xl text-black font-body-3-small">
      <div className=" text-xs text-grey-70 overflow-auto ">
        <Table
          columns={columns}
          dataSource={EmpList}
          pagination={{ pageSize: 8 }}
          size="middle"
        />
      </div>
    </div>
  );
};

export default AllStaffTable;
