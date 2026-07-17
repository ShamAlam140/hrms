import React, { useEffect, useState } from 'react';

const ProfileView=() =>{
  const[currUser, setCurrUser]=useState();

  useEffect(()=>{
    setCurrUser(JSON.parse(localStorage.getItem('user')))
  },[])
  return (
    <div className="container mx-auto">
    <div className="grid grid-row-1 md:grid-row-2 gap-4">
      <div className=" bg-white rounded-lg shadow-md">
        <div className="">
          <div className=" text-center">
            <div className="">
              <img src={currUser?.photo? currUser?.photo: "https://bootdey.com/img/Content/avatar/avatar7.png"} alt="Maxwell Admin" className="w-24 h-24 rounded-full mx-auto" />
            </div>
            <span className="capitalize text-base font-semibold">{currUser?.firstname}</span><span className='capitalize text-base font-semibold'> {currUser?.lastname}</span>
            <h6 className=" text-gray-600 text-sm">{currUser?.email}</h6>
          </div>
          {/* <div className=" mt-4 text-center">
            <h5 className="text-blue-500">About</h5>
            <p className="text-sm">I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful and human experiences.</p>
          </div> */}
        </div>
      </div>
      <div className=" bg-white rounded-lg shadow-md">
        <div className="p-3">
          <h6 className="mb-5 text-primary text-[22px]">Personal Details</h6>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="d-flex">
              <label htmlFor="fullName">First Name</label>
              <input type="text" className="mt-2  capitalize w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500" id="fullName" placeholder={currUser?.firstname}  readOnly />
            </div>
            <div className="d-flex">
              <label htmlFor="fullName">Last Name</label>
              <input type="text" className="mt-2 capitalize w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500" id="fullName" placeholder={currUser?.lastname} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="eMail">Email</label>
              <input type="email" className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500" id="eMail" placeholder={currUser?.email} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="text" className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500" id="phone" placeholder={currUser?.mobile}  readOnly/>
            </div>
            <div className="form-group">
              <label htmlFor="website">Employee Id</label>
              <input type="text" className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500" id="website" placeholder={currUser?.empId} readOnly/>
            </div>
          </div>

          <h6 className="mb-5 text-primary text-[22px]">Account Details</h6>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="d-flex">
              <label htmlFor="accountNumber.">Account No.</label>
              <input type="text" className="mt-2  capitalize w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500" id="fullName" placeholder={currUser?.accountDetails?.accountNumber}  readOnly />
            </div>
            <div className="d-flex">
              <label htmlFor="bankName">Bank Name</label>
              <input type="text" className="mt-2 capitalize w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500" id="fullName" placeholder={currUser?.accountDetails?.bankName} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="branchName">Branch Name</label>
              <input type="text" className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500" id="eMail" placeholder={currUser?.accountDetails?.branchName}readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="bankCode">IFSC code</label>
              <input type="text" className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500" id="phone" placeholder={currUser?.accountDetails?.bankCode}  readOnly/>
            </div>
        
          </div>
          <h6 className="mt-3 mb-2 text-primary text-[22px]">Address</h6>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="Street">Street</label>
              <input type="text" className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500" id="Street" placeholder="Enter Street" />
            </div>
            <div className="form-group">
              <label htmlFor="ciTy">City</label>
              <input type="text" className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500" id="ciTy" placeholder="Enter City" />
            </div>
            <div className="form-group">
              <label htmlFor="sTate">State</label>
              <input type="text" className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500" id="sTate" placeholder="Enter State" />
            </div>
            <div className="form-group">
              <label htmlFor="zIp">Zip Code</label>
              <input type="text" className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500" id="zIp" placeholder="Zip Code" />
            </div>
          </div>
          <div className="mt-2 p-3 flex gap-3">
            <button type="button" className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white">Cancel</button>
            <button type="button" className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white">Update</button>
          </div>
        </div>

        <div>
        <h6 className="mb-5 text-primary text-[22px]">Documents</h6>
        <div className="mt-2 grid md:grid-cols-3 grid-cols-2 mb-2">
                {
                    currUser && currUser?.documents?.docs?.map((doc, index)=>{
                        return(
                            
                                <div className="flex flex-col m-3">
  
                                 <iframe  className ="" key={index} src={doc}/>
       
                                 <a className="mt-6" href={doc} target="_blank" rel="noopener noreferrer">
          Click here to view
        </a>
                                </div>
                      
                    
                   
                        )
                    })
                }
              </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default ProfileView;
