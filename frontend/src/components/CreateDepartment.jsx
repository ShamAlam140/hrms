import React,{useState,useEffect} from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import config from "../configuration/config";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {Table,Popconfirm ,Button} from 'antd'
const CreateDepartment= ()=>{
    const navigate = useNavigate();
    const [depList, setDepList]= useState([])
    const [formData, setFormData] = useState({
      name: "",
    });
    const [refreshFlag, setRefreshFlag]=useState(false)
  
    const columns = [
        {
          title: 'S.no',
          dataIndex: 'employee',
          render: (_, __, index) => index + 1,  
        },
        {
          title: "Department Name",
          dataIndex: "name",
         
        },
       {
         title:'Action',
        key:'action',
        render: (_, record) => (
            <Popconfirm
              title="Are you sure you want to delete this department?"
              onConfirm={() => handleDelete(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger>
                Delete
              </Button>
            </Popconfirm>
          ),
    }
        ]

        const handleDelete = async (id) => {
            try {
              const response = await axios.delete(`${config.baseURL}/department/delete/${id}`);
          
              if (response) {
                toast.success("Department deleted successfully..")
                setRefreshFlag(!refreshFlag)
                fetchdepart()
              } else {

                console.error('Error deleting department:', response.statusText);
              }
            } catch (error) {
                toast.error("something went wrong..")
              console.error('Error deleting department:', error);
            }
          };
          
        useEffect(()=>{
            fetchdepart()
          },[])
          const fetchdepart= async()=>{
            const res = await axios.get(`${config.baseURL}/department/all/departments`)
            setDepList(res.data.departments)

          }
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };
  
    const handleSubmit = async () => {
      try {
        await axios.post(`${config.baseURL}/department/create-department`, formData);
        // If successful, navigate to the previous page or any other page
        toast.success("Department created successfully..")
        setRefreshFlag(!refreshFlag)
       setFormData({name:''})
      } catch (error) {
        console.error(error);
        // Handle error
        toast.error("Something went wrong..")
      }
    };
    return(
        <div className="w-full border-2 border-gray-300">
      <div className="flex items-center cursor-pointer">
        <span
          onClick={() => {
            navigate("/admin");
          }}
        >
          <FaLongArrowAltLeft />
          Back
        </span>
      </div>

      <p className="font-semibold text-base"> Create Department</p>
      {/* grid div start below */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-3 ">
        <div className="mt-4">
          <label
            htmlFor="taxType"
            className="block text-sm text-gray-700 text-left"
          >
   Department Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter Name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>

       

        <div className="flex md:items-end items-end mt-4">
          <button className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
                onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </div>
      {/* grid div ends above */}


      <div className=" mt-6 text-left text-xl text-black font-body-3-small">
      <div className=" text-xs text-grey-70 overflow-auto ">
        <Table
          columns={columns}
          dataSource={depList}
          pagination={{ pageSize: 8 }}
          size="middle"
          className='overflow-auto'
        />
      </div>
    </div>
    </div>
    )
}

export default CreateDepartment