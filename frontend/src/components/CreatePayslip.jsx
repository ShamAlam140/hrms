import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import config from "../configuration/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreatePayslip = ({setpayslip}) => {
    const navigate = useNavigate();
    const [EmployeesList, setEmployeesList] = useState([]);
    const [titledata, settitledata] = useState();
    const [formData, setFormData] = useState({
        employee:'',
        staffName: "",
        title: "",
        level: "",
        month:null,
        year:null,
        salaryStructure: {
            basicSalary: "",
            houseAllowance: "",
            transportAllowance: "",
            utilityAllowance: "",
            productivityAllowance: "",
            communicationAllowance: "",
            inconvenienceAllowance: "",
        },
        grossSalary:null,
        deductions: {
            tax: "",
            employeePension: "",
            totalDeduction: "",
        },
        netSalary: null,
    });

    useEffect(() => {
        fetchEmployeeList();
        // fetchtitledata()
    }, []);

    const fetchEmployeeList = async () => {
        try {
            const res = await axios.get(`${config.baseURL}/api/user/getAllEmployees`);
            setEmployeesList(res.data.response);
        } catch (error) {
            console.error("Error fetching employee list:", error);
        }
    };

  const   fetchtitledata = async(e)=>{
    try {
        setFormData({
            ...formData,
            title:e.target.value
        })
        const titleforsearch= e.target.value
        const res= await axios.get(`${config.baseURL}/salarybreakdowns/searchbytitle/${titleforsearch}`)
        
        settitledata(res.data.data)

        // setFormData({
        //     ...formData,
        //     grossSalary:titledata?.grossSalary,
        //     netSalary:titledata?.netSalary,
        //     salaryStructure: {
        //         ...titledata?.salaryStructure,
               
        //     },
        // });
    } catch (error) {
        
    }
  }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            grossSalary:titledata?.grossSalary,
            netSalary:titledata?.netSalary,
            salaryStructure: {
                ...titledata?.salaryStructure,
               
            },
            [id]: value,
            
        });
    };

    const handlesal = (e) => {
        const { id, value } = e.target;
        // setFormData({
        //     ...formData,
        //     salaryStructure: {
        //         ...formData.salaryStructure,
        //         [id]: value,
        //     },
        // });
    };

    const handlededuction = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            deductions: {
                ...formData.deductions,
                [id]: value,
            },
        });
    };
    
    const handleStaffNameChange = (e) => {
        const staffId = e.target.value; // Assuming the value of the option is the employee's ID
        const selectedEmployee = EmployeesList.find(emp => emp._id === staffId);
        const staffName = selectedEmployee ? selectedEmployee.firstname + ' ' + selectedEmployee.lastname : ''; // Assuming employee object has firstname and lastname fields
        setFormData({
            ...formData,
            staffName: staffName,
            employee:staffId
        });
    };

    const handleSubmit = async () => {
        try {
       

            
            const res = await axios.post(`${config.baseURL}/payslips/create-payslip`, formData);
            // 
            toast.success("Salary slip created successfully")

                setpayslip(res.data)
            // Optionally, you can navigate to another page after successful submission
            navigate('/admin/payroll');
        } catch (error) {
            console.error("Error creating pay slip:", error);
            toast.error("Something went wrong.")
            toast.error("Please fill all the fields")
        }
    };

    const months = [
        { value: 1, label: 'January' },
        { value: 2, label: 'February' },
        { value: 3, label: 'March' },
        { value: 4, label: 'April' },
        { value: 5, label: 'May' },
        { value: 6, label: 'June' },
        { value: 7, label: 'July' },
        { value: 8, label: 'August' },
        { value: 9, label: 'September' },
        { value: 10, label: 'October' },
        { value: 11, label: 'November' },
        { value: 12, label: 'December' },
    ];

    const currentYear = new Date().getFullYear();

    // 
    return (
        <div className="w-full">
            <div className="flex items-center cursor-pointer">
                <span onClick={() => { navigate('/admin/payroll') }}>
                    <FaLongArrowAltLeft />Back
                </span>

            </div>
            {/* div 1st start below */}

            <div className="shadow-md mt-5 p-4">
                <div className="font-bold md:text-xl flex"> Create Pay Slip</div>
                <div className="font-bold md:text-base flex mt-5">Basic Information</div>
                <div className='grid grid-cols-1 md:grid-cols-3 md:gap-3  mt-4'>

                    <div className="mt-4">
                        <label htmlFor="staffName" className="block text-sm text-gray-700 text-left">
                            Staff Name
                        </label>
                        <select
                            id="staffName"
                            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            onChange={handleStaffNameChange}
                       >
                            <option value="" disabled selected>
                                Select Name
                            </option>
                            {EmployeesList &&  EmployeesList.map((staff, index) => (
                                <option key={index} value={staff._id}>
                                    {staff.firstname} {staff.lastname}

                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="title" className="block text-sm text-gray-700 text-left">
                            Title
                        </label>
                        <select
                            id="title"
                            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            onChange={(e)=>{
                                handleChange(e)
                            fetchtitledata(e)
                            }} // Add onChange event handler
                            value={titledata?.title} 
                        >
                            <option value="" disabled selected>
                                Select Title
                            </option>
                            <option value="Manager">Manager</option>
                            <option value="Asst. Manager">Asst. Manager</option>
                            <option value="HR">HR</option>
                            <option value="Developer">Developer</option>
                        </select>
                    </div>


                    <div className="mt-4">
                        <label htmlFor="level" className="block text-sm text-gray-700 text-left">
                            Level
                        </label>
                        <select
                            id="level"
                            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            onChange={handleChange} // Add onChange event handler
                            value={formData.level} 
                       >
                            <option value="" disabled selected>
                                Select Level
                            </option>
                            <option value="level0">level 0</option>
                            <option value="level1">level 1</option>
                            <option value="level2">level 2</option>
                            <option value="level3">level 3</option>

                        </select>
                    </div>


                    <div className="mt-4">
                        <label htmlFor="month" className="block text-sm text-gray-700 text-left">
                         Month
                        </label>
                        <select
                            id="month"
                            className="mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            onChange={handleChange}
                            value={formData.month}
                       >
                            <option value="" disabled selected>
                                Select Month
                            </option>
                             {months.map((month, index) => (
                                <option key={index} value={month.value}>{month.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="year" className="block text-sm text-gray-700 text-left">
                          Year
                        </label>
                        <select
                            id="year"
                            
                            className=" mt-2 w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            onChange={handleChange}
                            value={formData.year}
                       >
                            <option value="" disabled selected>
                                Select Year
                            </option>
                            {[currentYear - 1, currentYear, currentYear + 1].map((year, index) => (
                                <option key={index} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>


                </div>

            </div>
            {/* div 1st end above */}

            {/* second div start  */}
            <div className="shadow-md  p-4 ">
                <div className="font-bold md:text-base flex mt-5">Salary Structure</div>
                <div className='grid grid-cols-1 md:grid-cols-3 md:gap-3 '>






                    <div className="mt-4">
                        <label htmlFor="basicSalary" className="block text-sm text-gray-700 text-left">
                            Basic Salary
                        </label>
                        <input
                            type="Number"
                            id="basicSalary"
                            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder={ titledata ? titledata?.salaryStructure?.basicSalary : "Enter Amount"} 
                            onChange={handlesal} // Add onChange event handler
                            value={titledata?.salaryStructure?.basicSalary} 
                        />
                       
                    </div>


                    <div className="mt-4">
                        <label htmlFor="houseAllowance" className="block text-sm text-gray-700 text-left">
                            House  Allowance
                        </label>
                        <input
                            type="Number"
                            id="houseAllowance"
                            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder={ titledata ? titledata?.salaryStructure?.houseAllowance : "Enter Amount"} 
                            onChange={handlesal} // Add onChange event handler
                            value={titledata?.salaryStructure?.houseAllowance} 
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="transportAllowance" className="block text-sm text-gray-700 text-left">
                            Transport Allowance
                        </label>
                        <input
                            type="Number"
                            id="transportAllowance"
                            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder={ titledata ? titledata?.salaryStructure?.transportAllowance : "Enter Amount"} 
                            onChange={handlesal} // Add onChange event handler
                            value={titledata?.salaryStructure?.transportAllowance} 
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="utilityAllowance" className="block text-sm text-gray-700 text-left">
                            Utility Allowance
                        </label>
                        <input
                            type="Number"
                            id="utilityAllowance"
                            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder={ titledata ? titledata?.salaryStructure?.utilityAllowance : "Enter Amount"} 
                            onChange={handlesal} // Add onChange event handler
                            value={titledata?.salaryStructure?.utilityAllowance} 
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="productivityAllowance" className="block text-sm text-gray-700 text-left">
                            Productivity Allowance
                        </label>
                        <input
                            type="Number"
                            id="productivityAllowance"
                            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder={ titledata ? titledata?.salaryStructure?.productivityAllowance : "Enter Amount"} 
                            onChange={handlesal} // Add onChange event handler
                            value={titledata?.salaryStructure?.productivityAllowance} 
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="communicationAllowance" className="block text-sm text-gray-700 text-left">
                            Communication Allowance
                        </label>
                        <input
                            type="Number"
                            id="communicationAllowance"
                            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder={ titledata ? titledata?.salaryStructure?.communicationAllowance : "Enter Amount"} 
                            onChange={handlesal} // Add onChange event handler
                            value={titledata?.salaryStructure?.communicationAllowance} 
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="inconvenienceAllowance" className="block text-sm text-gray-700 text-left">
                            Inconvenience Allowance
                        </label>
                        <input
                            type="Number"
                            id="inconvenienceAllowance"
                            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder={ titledata ? titledata?.salaryStructure?.inconvenienceAllowance : "Enter Amount"} 
                            onChange={handlesal} // Add onChange event handler
                            value={titledata?.salaryStructure?.inconvenienceAllowance} 
                        />
                    </div>


                    <div className="mt-4">
                        <label htmlFor="grossSalary" className="block text-sm text-gray-700 text-left">
                            Gross Salary
                        </label>
                        <input
                            type="Number"
                            id="grossSalary"
                            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder={titledata ? titledata?.grossSalary : "Enter Amount"}
                            onChange={handleChange} // Add onChange event handler
                            value={titledata?.grossSalary} 
                        />
                    </div>




                    {/* 
                    <div className="flex md:items-end items-end mt-4">
                        <button className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white" >Create</button>

                    </div> */}






                </div>
            </div>
            {/* second div end  above*/}
            {/* third div start below  */}
            <div className="shadow-md  p-4">
                <div className="font-bold md:text-base flex mt-5">Deductions</div>
                <div className='grid grid-cols-1 md:grid-cols-3 md:gap-3 '>






                    <div className="mt-4">
                        <label htmlFor="tax/paye" className="block text-sm text-gray-700 text-left">
                            TAX/PAYE
                        </label>
                        <input
                            type="Number"
                            id="tax"
                            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter amount"
                            onChange={handlededuction} // Add onChange event handler
                            value={formData.deductions.tax} 
                        />
                    </div>


                    <div className="mt-4">
                        <label htmlFor="employeePension" className="block text-sm text-gray-700 text-left">
                            Employee Pension
                        </label>
                        <input
                            type="Number"
                            id="employeePension"
                            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter amount"
                            onChange={handlededuction} // Add onChange event handler
                            value={formData.deductions.employeePension} 
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="totalDeduction" className="block text-sm text-gray-700 text-left">
                            Total Deduction
                        </label>
                        <input
                            type="Number"
                            id="totalDeduction"
                            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter amount"
                            onChange={handlededuction} // Add onChange event handler
                            value={formData.deductions.totalDeduction} 
                        />
                    </div>


















                </div>
            </div>
            {/* third div end below  */}
            {/* last div */}
            <div className="shadow-md  p-4">
                <div className="font-bold md:text-base flex mt-5">Net Salary</div>
                <div className='grid grid-cols-1 md:grid-cols-3 md:gap-3 '>





                    <div className="mt-4">
                        <label htmlFor="netSalary" className="block text-sm text-gray-700 text-left">
                            Net Salary
                        </label>
                        <input
                            type="number"
                            id="netSalary"
                            className="w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter amount"
                            onChange={handleChange} // Add onChange event handler
                            value={titledata?.netSalary} 
                        />
                    </div>
                </div>


                <div className="flex md:items-end items-end mt-4">
                    <button className="w-[205px] cursor-pointer  focus:outline-none focus:ring focus:ring-violet-300 md:hover:bg-sky-700 rounded-3xs [background:linear-gradient(135deg,_#14add5,_#384295)] h-[46px] flex flex-row items-center justify-center p-2.5 box-border text-white"
                        onClick={handleSubmit} >Create</button>

                </div>
            </div>
        </div>
    )
}

export default CreatePayslip;