import React, { useEffect, useState } from "react";
import axios from 'axios'
import config from "../configuration/config";
const EmployeePolicyView = ()=>{
    const [policyDocs, setpolicyDocs] = useState([]);

    useEffect(()=>{
        fetchPolicy()
    },[])
    const fetchPolicy= async()=>{
        const res= await axios.get(`${config.baseURL}/policy/get-policy`)
    
        setpolicyDocs(res.data)
        
    }
    return(
        <div className="mt-4 flex">
        {
            policyDocs && policyDocs?.map((policy, index)=>{
                return(
                    
                        <div className="flex flex-col">

                         <iframe key={index} src={policy?.policyDoc}/>

                         <a className="" href={policy?.policyDoc} target="_blank" rel="noopener noreferrer">
  Click here to view
</a>
                        </div>
              
            
           
                )
            })
        }
      </div>
    )
}

export default EmployeePolicyView;