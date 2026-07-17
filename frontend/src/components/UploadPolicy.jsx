import React, { useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import config from '../configuration/config'
import "react-toastify/dist/ReactToastify.css";
import { storage } from '../firebase';
import {getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
const UploadPolicy = ()=>{
    const [files, setFiles] = useState([]);
    const [policyDocs, setpolicyDocs] = useState([]);

    useEffect(()=>{
        fetchPolicy()
    },[])
    const fetchPolicy= async()=>{
        const res= await axios.get(`${config.baseURL}/policy/get-policy`)
        setpolicyDocs(res.data)
        
    }
    const handleChange = (e) => {
        if (e.target.type === 'file') {
        
          setFiles(Array.from(e.target.files));
        } else {

        }
      };

      const handleSubmit = async (e) => {
        
        try {
          if (files.length === 0) {
            toast.error("Please select files first");
            return;
          }
          toast.info("Uploading documents...");
          const filesFormData = new FormData();
          files.forEach((file) => {
            filesFormData.append('files', file);
          });

          const uploadRes = await axios.post(`${config.baseURL}/api/user/upload-multiple`, filesFormData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          const policyDoc = uploadRes.data.urls;

          const res = await axios.post(`${config.baseURL}/policy/upload-policy`, policyDoc);
          
          toast.success("Document uploaded successfully!");
          fetchPolicy();
        } catch (error) {
          console.error(error); // Handle error
          toast.error("Something went wrong ..")
        }
      };

      
    return(
        <div>
             <div className="mt-4">
                <label
                  htmlFor="docs"
                  className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                >
                  Upload All Documents
                </label>
                <input
                  className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                  type="file"
                  id="docs"
                  multiple // Allow multiple files to be selected
                  onChange={handleChange}
                //  onChange={handleOfferLetterUpload}
                />
              </div>

              <div className="w-full mt-5  flex justify-center">
                <button
                    onClick={handleSubmit}
                  className=" cursor-pointer w-40  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"

                >
              Upload
                </button>
              </div>


              <div className="mt-4 flex">
                {
                    policyDocs && policyDocs?.map((policy, index)=>{
                        return(
                            
                                <div className="flex flex-col">
  
                                 <iframe key={index} src={config.getSecureUrl(policy?.policyDoc)}/>
       
                                 <a className="" href={config.getSecureUrl(policy?.policyDoc)} target="_blank" rel="noopener noreferrer">
          Click here to view
        </a>
                                </div>
                      
                    
                   
                        )
                    })
                }
              </div>
        </div>
    )
}


export default UploadPolicy