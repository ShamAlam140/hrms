import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import {
  Form,
  Upload,
  Breadcrumb,
  Statistic,
  Table,
 Space,
  Badge,
  Tag,
  Input,
  Col,
  Select,
  Row,
  Button,
  DatePicker,
} from 'antd';


const dateFormat = 'DD/MM/YYYY';
const InputGroup = Input.Group;
const { TextArea } = Input;

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from '../configuration/config';

const ApplyLeave = () => {
  // State variables using useState hook
  const [leaveType, setLeaveType] = useState([]);
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reason, setReason] = useState('');
  const [numberOfDays, setnumberOfDays] = useState(null);
  const [currUser, setCurrUser] = useState();


  // Function to fetch leave types
  const refreshgetAllLeaveType = () => {
    // Your logic to fetch leave types and setLeaveType
  };

  // useEffect hook to run side effects (like data fetching) when the component mounts
  useEffect(() => {
  
    setCurrUser(JSON.parse(localStorage.getItem('user')))
   
  }, []);
  useEffect(() => {
    fetchleaveHistory()
  }, []);

  const fetchleaveHistory =async()=>{

    const user =JSON.parse(localStorage.getItem('user'))
     const  response = await axios.get(`${config.baseURL}/api/leave/empleave/${user?._id}`)
     
     setData(response.data)
    //  
  }

  const handleStartDateChange = (date) => {
    
    // Convert the date to a string with the desired format
    const formattedDate = date ? date.format(dateFormat) : null;
    setStartDate(date.toDate() );
    // calculateNumberOfDays(dateString, endDate);
  };
  const handleEndDateChange = (date) => {
    // Convert the date to a string with the desired format
    const formattedDate = date ? date.format(dateFormat) : null;
    setEndDate(date.toDate() );
    // calculateNumberOfDays(startDate, endDate)
    // calculateNumberOfDays(startDate, dateString);
  };
  // Columns configuration for the leave history table
  const columns = [
   
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      render: (startDate) => new Date(startDate).toLocaleDateString()
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      render: (endDate) => new Date(endDate).toLocaleDateString()
    },
    {
      title: 'Number of Days',
      dataIndex: 'numberOfDays',
    },
    {
      title: 'Leave Type',
      dataIndex: 'leaveType',
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text) => (
        <Space size="middle">
          <Badge status={text === "Pending" || text==="Rejected" ? "error" : "success"} />
          {text}
        </Space>
      ),
    },
  ];
  // 

  const handleRequestLeave = async () => {
  
    try {
    

      const leavedata = {
        numberOfDays,
        reason,
         startDate,
         endDate,
         leaveType,
         employeeId: currUser?._id,
      }
   
      
      const response = await axios.post(`${config.baseURL}/api/leave/apply`, leavedata);
      toast.success("Leave requested successfully")
      // Optionally, you can update the UI or show a success message
      
      setEndDate(null)
      setStartDate(null)
      setnumberOfDays(null)
      setReason('')
      fetchleaveHistory()
    } catch (error) {
      toast.error("something went wrong")
      console.error('Error requesting leave:', error);
     
    }
  };

  const calculateNumberOfDays = (start, end) => {
    if (start && end) {
      const startMoment = moment(start, dateFormat);
      const endMoment = moment(end, dateFormat);
      const days = endMoment.diff(startMoment, 'days') + 1; // Adding 1 to include the end date
      setnumberOfDays(days);
    } else {
      setnumberOfDays(null); // Reset number of days if either start or end date is not selected
    }
  };

  return (
    <React.Fragment>
      <Row>
        {/* First column */}
        <Col id="responsive-div1" span={16}>
  {/* Your JSX for applying leave */}
  <Breadcrumb style={{ margin: '16px 0' }}>
    {/* <Breadcrumb.Item>Leave Managment</Breadcrumb.Item> */}
    <Breadcrumb.Item>Apply Leave</Breadcrumb.Item>
  </Breadcrumb>
  <div style={{ padding: 24, background: '#fff', minHeight: 360, marginRight: '20px' }}>
    {/* Your JSX for applying leave */}
    <Row>
      <Col span={24}>
        {/* Your JSX for applying leave */}
        <InputGroup>
          <Row gutter={24}>
            <Col id="responsive-input1" span={6}>
              {/* Date picker for From Date */}
              <Form.Item hasFeedback label="From Date" layout="inline">
                <div>
                  <DatePicker format={dateFormat} 
                  //  onChange={(date) =>{setStartDate(date)
                  //   
                  // } }
                  value={startDate ? moment(startDate, dateFormat) : null} 
                  onChange={handleStartDateChange}
                  showTime={false}
                   
                  />
                </div>
              </Form.Item>
            </Col>
            <Col id="responsive-input2" span={6}>
              {/* Date picker for To Date */}
              <Form.Item hasFeedback label="To Date" layout="vertical">
                <div>
                  <DatePicker  format={dateFormat}
             
                  // onChange={(date) => setEndDate(date)}
                  onChange={handleEndDateChange}
                  value={endDate ? moment(endDate, dateFormat) : null}
                  />
                </div>
              </Form.Item>
            </Col>
            <Col id="responsive-input3" span={6}>
              {/* Your JSX for applying leave */}
              <Form.Item hasFeedback label="Number of Days" layout="vertical">
              <input
                            type="Number"
                            id="numberOfDays"
                            className=" w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter number"
                            onChange={(e) => setnumberOfDays(e.target.value)}
                            value={numberOfDays}
                        />
                </Form.Item>
            </Col>

            <Col id="responsive-input3" span={6}>
  <Form.Item hasFeedback label="Type of Leave" layout="vertical">
    <Select
      placeholder="Select type of leave"
      onChange={value => setLeaveType(value)}
      value={leaveType}
    >
      <Option value="annualLeaves">Annual Leave</Option>
      <Option value="casualLeaves">Casual Leave</Option>
      <Option value="sickLeaves">Sick Leave</Option>
      <Option value="UnPaidLeaves">Unpaid Leave</Option>
    </Select>
  </Form.Item>
</Col>
          </Row>
        </InputGroup>
        {/* Your JSX for applying leave */}
        <InputGroup>
          <Row gutter={24}>
            <Col id="responsive-input4" span={12}>
              {/* Your JSX for applying leave */}
            </Col>
            <Col id="responsive-input5" span={12}>
              {/* Your JSX for applying leave */}
            </Col>
          </Row>
        </InputGroup>
        {/* Your JSX for applying leave */}
        <Form.Item hasFeedback label="Reason" layout="vertical">
          <div style={{ margin: '24px 0' }}>
            <TextArea
              placeholder="Reason"
              autosize={{ minRows: 2, maxRows: 8 }}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </Form.Item>
        {/* Your JSX for applying leave */}
        <Button type="primary" style={{ float: 'right' }}  onClick={handleRequestLeave} >
          Request
        </Button>
        <Button type="danger" style={{ float: 'right', marginRight: '10px' }}
         onClick={()=>{
          setEndDate(null)
          setStartDate(null)
          setnumberOfDays(null)
          setReason('')
         }}
        >
          Clear
        </Button>
        {/* Your JSX for applying leave */}
      </Col>
    </Row>
  </div>
</Col>

        {/* Second column */}
        <Col id="responsive-div2" span={8}>
          {/* Your JSX for available leave and carry forward leave request */}
          <Breadcrumb style={{ margin: '1px 0' }}>
            <Breadcrumb.Item>Available Leave</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 50 }}>
            {/* Your JSX for available leave and carry forward leave request */}
            {/* <Row>
              <Col span={8}>
                <Statistic title="Annual" value={10} suffix="/ 10" />
              </Col>
              <Col span={8}>
                <Statistic title="Casual" value={5} suffix="/ 5" />
              </Col>
              <Col span={8}>
                <Statistic title="Medical" value={7} suffix="/ 7" />
              </Col>
            </Row> */}
          </div>
        
          <div style={{ padding:1, background: '#fff', minHeight: 50, marginTop: '1px' }}>
            {/* Your JSX for available leave and carry forward leave request */}
            <Row>
              <Col span={24}>
                {/* Your JSX for available leave and carry forward leave request */}
                <Form.Item layout="vertical" label="Remaining days of Annual Leave">
                  <div>
                    <input
                     className="mt-2 w-full w- h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                    defaultValue={currUser?.leaveQuota?.annualLeaves} disabled />
                  </div>
                </Form.Item>
                <Form.Item layout="vertical" label="Remaining days of Casual Leave">
                  <div>
                    <input 
                    className="mt-2 w-full w- h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                    defaultValue={currUser?.leaveQuota?.casualLeaves}  disabled />
                  </div>
                </Form.Item>
                <Form.Item layout="vertical" label="Remaining days of Medical Leave">
                  <div>
                    <input
                    className="mt-2 w-full w- h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                    defaultValue={currUser?.leaveQuota?.sickLeaves}  disabled />
                  </div>
                </Form.Item>
                
                {/* Your JSX for available leave and carry forward leave request */}
            
                {/* Your JSX for available leave and carry forward leave request */}
              
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Leave History</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ padding: 24, background: '#fff', minHeight: 360, marginTop: '20px' }}>
        {/* Table component for leave history */}
        <Row>
          <Col span={24}>
            <Table columns={columns} dataSource={data} />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default ApplyLeave;
