import React, { useEffect, useState } from "react";
import moment from "moment";
import { addRequirement } from "../../utils/apiFunctions";
import CurrencyTypeSelector from "../requirement/CurrencyTypeSelector";
import ErrorNotification from '../../common/ErrorNotification'
import SuccessNotification from '../../common/SuccessNotification'
import SelectionProcessTypeSelector from "../requirement/SelectionProcessTypeSelector"
import { useNavigate } from "react-router-dom";

const AddRequirement = () => {
    
    const [newRequirement, setNewRequirement] = useState({
        title : "",
        description : "",
        status : "OPEN",
        datePosted : moment().format("YYYY-MM-DD"),
        validTill : "",
        minSalary : "",
        maxSalary : "",
        currency : "",
        location : "",
        selectionProcessType : ""
    })

    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate(); 

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
            navigate("/login/client"); 
            window.location.reload();
        }
    }, [navigate]);

    const handleRequirementInputChange = (e) =>{
        const name = e.target.name
        let value = e.target.value
        if(name == "minSalary"){
            if(!isNaN(value)){
                value = parseInt(value)
            }
            else{
                value = ""
            }
        }
        if(name == "maxSalary"){
            if(!isNaN(value)){
                value = parseInt(value)
            }
            else{
                value = ""
            }
        }
        setNewRequirement({...newRequirement,[name] : value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            const success = await addRequirement(localStorage.getItem("username"), newRequirement)
            if(success !== undefined){
                setSuccessMessage("Requirement added successfully")
                setTimeout(() => {
                    setSuccessMessage("")
                }, 5000);
                setNewRequirement({title : "",
                                    description : "",
                                    status : "OPEN",
                                    datePosted : "",
                                    validTill : "",
                                    minSalary : "",
                                    maxSalary : "",
                                    currency : "",
                                    location : "",
                                    selectionProcessType : ""
                                })
                setErrorMessage("")
            }
            else{
                setErrorMessage("Error adding requirement")
                setTimeout(() => {
                    setErrorMessage("")
                }, 5000);
            }
        }
        catch(error){
            setErrorMessage(error.message)
            setTimeout(() => {
                setErrorMessage("")
            }, 5000);
        }
    }

    const handleNotification = () => {
        setErrorMessage("")
        setSuccessMessage("")
    }

    return (
        <>
            <section className="container mx-auto">
            {successMessage && (
                <SuccessNotification successMessage={successMessage}
                handleNotification={handleNotification}/>
            )}
            {errorMessage && (
                <ErrorNotification errorMessage={errorMessage}
                handleNotification={handleNotification}/>
            )}
                <div className="flex flex-col w-2/3 mx-auto">
                    <h2 className="font-CinzelRegular mx-auto text-3xl font-bold text-[#00634D] size-fit mb-5">
                    Add a new requirement
                    </h2>
                    <form onSubmit={handleSubmit}>
                        
                    <div className="mb-4">
                            <label htmlFor="title" 
                            className="block text-gray-700 font-bold mb-2">Job Title</label>
                            <input
                                required
                                type="text"
                                className="shadow appearance-none w-full py-2 px-3 focus:ring-[#00634D] focus:border-[#00634D] placeholder-gray-700 border rounded focus:outline-none focus:shadow-outline"
                                id="title"
                                name="title"
                                placeholder="Enter Job Title"
                                value={newRequirement.title}
                                onChange={handleRequirementInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" 
                            className="block text-gray-700 font-bold mb-2">Job Description</label>
                            <input
                                required
                                type="text"
                                className="shadow appearance-none w-full py-2 px-3 focus:ring-[#00634D] focus:border-[#00634D] placeholder-gray-700 border rounded focus:outline-none focus:shadow-outline"
                                id="description"
                                name="description"
                                placeholder="Enter Job Description"
                                value={newRequirement.description}
                                onChange={handleRequirementInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="validTill" 
                            className="block text-gray-700 font-bold mb-2">Requirement Validity</label>
                            <input
                                type="date"
                                className="shadow p-5 px-10 rounded-xl font-TypewcondRegular text-xl "
                                id="validTill"
                                name="validTill"
                                value={newRequirement.validTill}
                                onChange={handleRequirementInputChange}
                                min={moment().format("YYYY-MM-DD")}
                            />
                        </div>
                        <div className="mb-4">
                            <label  
                            className="block text-gray-700 font-bold mb-2">Salary Range</label>
                            <div className="flex flex-row">
                                <input
                                    required
                                    type="number"
                                    className="shadow appearance-none basis-1/2 py-2 px-3 focus:ring-[#00634D] focus:border-[#00634D] placeholder-gray-700 border rounded focus:outline-none focus:shadow-outline"
                                    id="minSalary"
                                    name="minSalary"
                                    placeholder="Enter Minimum Salary"
                                    value={newRequirement.minSalary}
                                    onChange={handleRequirementInputChange}
                                />
                                <input
                                    required
                                    type="number"
                                    className="shadow appearance-none basis-1/2 py-2  focus:ring-[#00634D] focus:border-[#00634D] placeholder-gray-700 border rounded focus:outline-none focus:shadow-outline"
                                    id="maxSalary"
                                    name="maxSalary"
                                    placeholder="Enter Maximum Salary"
                                    value={newRequirement.maxSalary}
                                    onChange={handleRequirementInputChange}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="location" 
                            className="block text-gray-700 font-bold mb-2">Job Location</label>
                            <input
                                required
                                type="text"
                                className="shadow appearance-none w-full py-2 px-3 focus:ring-[#00634D] focus:border-[#00634D] placeholder-gray-700 border rounded focus:outline-none focus:shadow-outline"
                                id="location"
                                name="location"
                                placeholder="Enter Job Location"
                                value={newRequirement.location}
                                onChange={handleRequirementInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Currency</label>
                            <div>
                                <CurrencyTypeSelector 
                                handleRequirementInputChange={handleRequirementInputChange} 
                                newRequirement={newRequirement}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Selection Process Type</label>
                            <div>
                                <SelectionProcessTypeSelector 
                                handleRequirementInputChange={handleRequirementInputChange} 
                                newRequirement={newRequirement}
                                />
                            </div>
                        </div>
                        <div  className="flex justify-between mt-4">
                            <button type="submit" 
                            className=" bg-[#00634D] rounded-lg hover:bg-[#16473d] focus:bg-[#00634D]
                                text-white font-bold py-2 mb-5 px-4  focus:outline-none mx-auto
                                focus:shadow-outline">Post requirement</button>
                        </div>
                    </form>
                </div>
            </section>
        </>

    )

}

export default AddRequirement