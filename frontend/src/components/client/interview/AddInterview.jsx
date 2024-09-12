import React, { useEffect, useState } from "react";
import moment from "moment";
import { scheduleInterview } from "../../utils/apiFunctions";
import ErrorNotification from '../../common/ErrorNotification'
import SuccessNotification from '../../common/SuccessNotification'
import { useNavigate, useParams } from "react-router-dom";

const AddInterview = () => {
    const [interviewTime , setInterviewTime] = useState()
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const {applicationId} = useParams();
    const navigate = useNavigate(); 

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
            navigate("/login/client"); 
            window.location.reload();
        }
    }, [navigate]);

    const handleInputChange = (e) =>{
        setInterviewTime(e.target.value)
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            const success = await scheduleInterview(applicationId, interviewTime)
            if(success !== undefined){
                setSuccessMessage("Interview scheduled successfully")
                setTimeout(() => {
                    setSuccessMessage("")
                    navigate("/client/interview/upcoming")
                }, 5000);
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
                    Schedule An Interview
                    </h2>
                    <form onSubmit={handleSubmit}>
                        
                    <div className="mb-4">
                            <label htmlFor="interviewTime" 
                            className="block text-gray-700 font-bold mb-2">Interview Time</label>
                            <input
                                type="datetime-local"
                                className="shadow p-5 px-10 rounded-xl font-TypewcondRegular text-xl placeholder-gray-700 focus:ring-[#00634D]  focus:border-[#00634D] border focus:outline-none focus:shadow-outline"
                                id="interviewTime"
                                name="interviewTime"
                                value={interviewTime}
                                onChange={handleInputChange}
                                min={moment().format("YYYY-MM-DDTHH:mm")}
                            />
                        </div>
                        <div  className="flex justify-center my-4">
                            <div>
                                <button
                                onClick={() => navigate(-1)}
                                    className=" bg-[#00634D] mr-5 rounded-lg hover:bg-[#16473d] focus:bg-[#00634D]
                                        text-white font-bold py-2 px-4  focus:outline-none mx-auto
                                        focus:shadow-outline">Back
                                </button>
                            </div>
                            <div  className="flex justify-between mt-4">
                                <button type="submit" 
                                className=" bg-[#00634D] rounded-lg hover:bg-[#16473d] focus:bg-[#00634D]
                                    text-white font-bold py-2 mb-5 px-4  focus:outline-none mx-auto
                                    focus:shadow-outline">Schedule Interview</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>

    )

}

export default AddInterview