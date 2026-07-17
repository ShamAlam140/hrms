
import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../configuration/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UploadHoliday = ()=>{
    const [file, setFile] = useState(null);
    const[refresflag, setrefreshflag]= useState(false)
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        try {
            const formData = new FormData();
            
            formData.append('file', file);

            const response = await axios.post(`${config.baseURL}/upload/upload-holidayCsv`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
                toast.success("file Uploaded successfully")
                setrefreshflag(!refresflag)
             // Output success message
        } catch (error) {
            console.error('Error:', error);

            toast.error("Something went wrong")
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
                   id="file_input" 
                   multiple // Allow multiple files to be selected
                   onChange={handleFileChange}
                 //  onChange={handleOfferLetterUpload}
                 />
               </div>

               <div className="w-full mt-5  flex justify-center">
                 <button
                     onClick={handleUpload}
                   className=" cursor-pointer w-40  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"

                 >
               Upload
                 </button>
               </div>
        </div>
    )
}

export default UploadHoliday