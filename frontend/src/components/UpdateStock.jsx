import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";
import axios from 'axios';
import config from '../configuration/config';
import { toast } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";
const UpdateStock = () => {
    const navigate=useNavigate();
    const [imagePreview, setImagePreview] = useState(null);
    const [Data, setFormData] = useState({
      productName: "",
      productId: "",
      category: "",
      quantityPurchased: null,
      unitPrice: null,
      totalAmount: "",
      supplier: "",
      status: "",
      image: null // Store the selected image file
    });
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
        formData.append('productName', Data.productName);
        formData.append('productId', Data.productId);
        formData.append('category', Data.category);
        formData.append('quantityPurchased', Data.quantityPurchased);
        formData.append('unitPrice', Data.unitPrice);
        formData.append('totalAmount', Data.totalAmount);
        formData.append('supplier', Data.supplier);
        // formData.append('staffId', formData.staffId);
        formData.append('status', Data.status);
        formData.append('image', Data.image);
  
        // Make a POST request to the backend API endpoint
        const response = await axios.post(`${config.baseURL}/stocks/add-stock`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        // Handle success response
        
        toast.success("Stock added successfully..")
        navigate('/admin/stock')
      } catch (error) {
        // Handle error
        console.error('Error adding staff:', error);
        toast.error("something went wrong..")
      }
    };

  return (
    <div className="w-full   mt-7">
 <div className="flex items-center cursor-pointer">
                <span onClick={() => { navigate('/admin/stock') }}>
                    <FaLongArrowAltLeft />Back
                </span>

            </div>
        <div className=" flex mt-4 text-xl font-extrabold text-black p-4 mb-4">Add a New Item</div>
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
              src="/images/defaultStock.jpg"
            />
          </div>
        )}
                     <input
        type="file"
        id='image'
        accept="image/*"
        className='mt-5'
        onChange={handleImageChange}
      />
        </div>
        <div className="flex flex-col items-center gap-4 text-sm text-gray-500">
          <div className="mt-5 flex items-center gap-2">
            {/* <img className="mt-5 w-4 h-4" alt="Add photo" src="/add-photo.svg" /> */}
            <span>Upload photo</span>
          </div>
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
        <label htmlFor="productName" className="block text-sm text-gray-700 text-left">
         Product Name
        </label>
        <input
          type="text"
          id="productName"
          className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter product name"
          onChange={handleChange}
          value={Data.productName}
        />
      </div>


      <div className="mt-4">
        <label htmlFor="productId" className="block text-sm text-gray-700 text-left">
        Product ID
        </label>
        <input
          type="text"
          id="productId"
          className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter product id"
          onChange={handleChange}
          value={Data.productId}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="Category" className="block text-sm text-gray-700 text-left">
         Category
        </label>
        <select
          id="category"
       
          className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={handleChange}
          value={Data.category}
       >
          <option value="" disabled selected>
            Select category
          </option>
          <option value="Laptops">Laptops</option>
          <option value="Stationary">Stationary</option>
          <option value="IT product">IT product</option>
        </select>
      </div>


      <div className="mt-4">
        <label htmlFor="quantityPurchased" className="block text-sm text-gray-700 text-left">
         QTY Purchased
        </label>
        <input
          type="Number"
          id="quantityPurchased"
          className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter quantity"
          onChange={handleChange}
          value={Data.quantityPurchased}
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
          value={Data.unitPrice}

        />
      </div>
      
   
      <div className="mt-4">
        <label htmlFor="totalAmount" className="block text-sm text-gray-700 text-left">
       Total Amount
        </label>
        <input
          type="text"
          id="totalAmount"
          className="mt-2 md:w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter amount"
          onChange={handleChange}
          value={Data.totalAmount}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="supplier" className="block text-sm text-gray-700 text-left">
       Supplier
        </label>
        <input
          type="text"
          id="supplier"
          className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter supplier"
          onChange={handleChange}
          value={Data.supplier}
        />
      </div>
      

      
     


      </div>
      </div>

      {/* form fields end */}

      </div>
      <div className="mt-6">
        <button className="w-full h-10 bg-gradient-to-br from-[#14add5] to-[#384295] text-white rounded-md"
        onClick={handleSubmit}
        >
        Add item
        </button>
      </div>
    
    </div>
  );
};

export default UpdateStock;
