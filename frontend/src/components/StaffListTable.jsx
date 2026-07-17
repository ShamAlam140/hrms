import React, { useState } from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const StaffListTable = ({stafflist}) => {

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex, placeholder) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          id="search-input"
          placeholder={placeholder}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (open) => {
      if (open) {
        setTimeout(() => document.getElementById("search-input").select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "S/N",
      dataIndex: "serialNumber",
      key: "serialNumber",
      render: (_, __, index) => index + 1,  
    },
    {
      title: "Staff Name",
      dataIndex: "firstname",
      key: "firstname",
      ...getColumnSearchProps("firstname", "Search by Staff Name"),
      
    },
    {
      title: "Staff Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Employee ID",
      dataIndex: "empId",
      key: "empId",
    },
  ];

  const data = [
    {
      key: "1",
      serialNumber: "01",
      staffName: "Abubakar Ismaila Goje",
      staffRole: "Admin",
      designation: "Human Resource Dept.",
    },
    {
      key: "2",
      serialNumber: "02",
      staffName: "Ifeanyi Obinna",
      staffRole: "Admin",
      designation: "Management",
    },
    {
      key: "3",
      serialNumber: "03",
      staffName: "Bankole Olanrewaju",
      staffRole: "HOD I.T",
      designation: "Peoples and Operation",
    },
    {
      key: "4",
      serialNumber: "04",
      staffName: "Chidinma Ebere",
      staffRole: "HOD Account",
      designation: "Accounts",
    },
    // Add more data as needed
  ];

  return (
    <div className=" overflow-y-auto bg-white rounded-xl shadow-md">
      <div className="flex flex-col items-start justify-start gap-4 p-4">
        <div className="font-extrabold">Staff List</div>
        <div className=" overflow-y-auto text-xs text-grey-70 h-[300px]">
          <Table columns={columns} 
          
          dataSource={stafflist} pagination={false} 
          />
        </div>
      </div>
    </div>
  );
};

export default StaffListTable;
