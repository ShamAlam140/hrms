import React,{useEffect, useState} from 'react';
import axios from 'axios';
import config from '../configuration/config';
import { toast } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
const AddStaffForm = () => {
  const navigate= useNavigate()
  const [imagePreview, setImagePreview] = useState(null);
  const [depList, setDepList]= useState([])
  const [Data, setFormData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    email: "",
    mobile: "",
    role: "",
    designation: "",
    staffId: "",
    officialEmail: "",
    image: null, // Store the selected image file
    department:''
  });

  useEffect(()=>{
    fetchdepart()
  },[])
  const fetchdepart= async()=>{

    const res = await axios.get(`${config.baseURL}/department/all/departments`);
 
    setDepList(res.data.departments)
  }

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...Data, [id]: value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...Data, image: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('firstname', Data.firstname);
      formData.append('lastname', Data.lastname);
      formData.append('gender', Data.gender);
      formData.append('email', Data.email);
      formData.append('mobile', Data.mobile);
      formData.append('role', Data.role);
      formData.append('designation', Data.designation);
      // formData.append('staffId', formData.staffId);
      formData.append('officialEmail', Data.officialEmail);
      formData.append('image', Data.image);
      formData.append('department', Data.department)
      // Make a POST request to the backend API endpoint
      const response = await axios.post(`${config.baseURL}/api/user/add-staff`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Handle success response
      
      toast.success("staff added successfully..")
      navigate('/admin/staff')
    } catch (error) {
      // Handle error
      console.error('Error adding staff:', error);
      toast.error("something went wrong..")
    }
  };

  return (
    <div className="w-full   mt-16">
        <div className="mt-4 text-xl font-extrabold text-black p-4 mb-4">Add a New Staff</div>
      <div className='grid md:grid-cols-2 md:gap-4 grid-cols-1 w-full  md:auto-cols-max'>

      <div className="  rounded-xl bg-white shadow-md p-8">
        <div className="w-32 h-32 mx-auto mb-6">
        {imagePreview ? (
          <img
            className="w-full h-full object-cover"
            alt="Uploaded photo"
            src={imagePreview}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full border border-gray-300 rounded-lg">
            <img
              className="w-full h-full"
              alt="Add photo"
              src="/images/default.avif"
            />
          </div>
        )}
              <input
        type="file"
        id='image'
        accept="image/*"
        onChange={handleImageChange}
      />
        </div>
        <div className="flex flex-col items-center gap-4 text-sm text-gray-500">
          {/* <div className="flex items-center gap-2">
            <img className="w-4 h-4" alt="Add photo" src="/add-photo.svg" />
            <span>Upload photo</span>
          </div> */}
          <div>
            <p className="m-0">Allowed format: JPG, JPEG, and PNG</p>
            <p className="m-0">Max file size: 2MB</p>
          </div>
        </div>
      </div>



{/* form fileds start */}
<div className='grow'>
<div className='grid grid-cols-1 md:grid-cols-2 md:gap-3 '>
      <div className="mt-4">
        <label htmlFor="firstName" className="block text-sm text-gray-700 text-left">
          Full Name
        </label>
        <input
          type="text"
          id="firstname"
          className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter first name"
          onChange={handleChange}
          value={Data.firstname}
        />
      </div>


      <div className="mt-4">
        <label htmlFor="lastName" className="block text-sm text-gray-700 text-left">
          Last Name
        </label>
        <input
          type="text"
          id="lastname"
          className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter last name"
          onChange={handleChange}
          value={Data.lastname}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="gender" className="block text-sm text-gray-700 text-left">
          Gender
        </label>
        <select
          id="gender"
          className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={handleChange}
          value={Data.gender}
       >
          <option value="" disabled selected>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>


      <div className="mt-4">
        <label htmlFor="email" className="block text-sm text-gray-700 text-left">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter email address"
          onChange={handleChange}
          value={Data.email}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="mobile" className="block text-sm text-gray-700 text-left">
          Phone Number
        </label>
        <input
          type="tel"
          id="mobile"
          className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter phone number"
          onChange={handleChange}
          value={Data.mobile}
        />
      </div>
      
      <div className="mt-4">
        <label htmlFor="role" className="block text-sm text-gray-700 text-left">
          Role
        </label>
        <select
          id="role"
          className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={handleChange}
          value={Data.role}
        >
          <option value="" disabled selected>
            Select role
          </option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="department" className="block text-sm text-gray-700 text-left">
          Department
        </label>
        <select
          id="department"
          className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={handleChange}
          value={Data.department}
        >
          <option value="" disabled selected>
            Select role
          </option>
          {depList?.map((department, index) => (
  <option key={index} value={department._id}>
    {department.name}
  </option>
))}
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="designation" className="block text-sm text-gray-700 text-left">
       Designation
        </label>
        <input
          type="text"
          id="designation"
          className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter Designation"
          onChange={handleChange}
          value={Data.designation}
        />
      </div>
     
{/* 
      <div className="mt-4">
        <label htmlFor="staffId" className="block text-sm text-gray-700 text-left">
       Staff ID
        </label>
        <input
          type="text"
          id="staffId"
          className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter StaffID"
          
        />
      </div> */}
      

      
      <div className="mt-4">
        <label htmlFor="OfficialEmail" className="block text-sm text-gray-700 text-left">
       Official Email
        </label>
        <input
          type="text"
          id="officialEmail"
          className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter Offical Email"
          onChange={handleChange}
          value={Data.officialEmail}
        />
      </div>


      </div>
      </div>

      {/* form fields end */}

      </div>
      <div className="mt-6">
        <button className="w-full h-10 bg-gradient-to-br from-[#14add5] to-[#384295] text-white rounded-md"
         onClick={handleSubmit}>
          Add Staff
        </button>
      </div>
    
    </div>
  );
};

export default AddStaffForm;
