import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ErrorNotification from "../../common/ErrorNotification";
import SuccessNotification from "../../common/SuccessNotification"
import { applyToRequirement, getRequirementDetail } from "../../utils/apiFunctions";

const RequirementDetail = ({}) => {
    const [requirement, setRequirement] = useState();
    const {requirementId} = useParams();
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
            navigate("/login/candidate"); 
            window.location.reload();
        }
        fetchRequirementDetail();
    }, [navigate, requirementId]);

    const fetchRequirementDetail = async () => {
        setIsLoading(true);
        try {
          const data = await getRequirementDetail(requirementId);
          setRequirement(data);
          setIsLoading(false);
        } catch (error) {
          setErrorMessage(error.message);
          setTimeout(() => {
            setErrorMessage("")
           }, 5000);
        }
      };

    const handleNotification = () => {
        setErrorMessage("")
    }
    
    const handleOnClick = async (e) => {
      setIsSubmitting(true)
        try{
            const success = await applyToRequirement(localStorage.getItem("username"), requirement.requirementId)
            if(success !== undefined){
                setSuccessMessage("Applied successfully")
                setTimeout(() => {
                    setSuccessMessage("")
                    navigate("/candidate/requirement")
                }, 2000)
                setErrorMessage("")
            }
            else{
                setErrorMessage("Error applying to requirement")
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

    return (
        <>
          
          {errorMessage && (
            <ErrorNotification errorMessage={errorMessage}
            handleNotification={handleNotification}/>
          )}
          {successMessage && (
            <SuccessNotification successMessage={successMessage}
            handleNotification={handleNotification}/>
          )}
          
          <div className="flex flex-col mx-auto">
            <h2 className="font-CinzelRegular mx-auto text-3xl font-bold text-[#00634D] size-fit">
              Requirement Details
            </h2>
    
            {isLoading ? (
              <div className="size-fit mx-auto transform translate-x-1/2 translate-y-1/2 ">
                <div className="border-t-transparent border-solid animate-spin  rounded-full border-[#00634D] border-8 h-10 w-10"></div>
              </div>
            ) : (
              <>
              {requirement && requirement.status === "OPEN" ? (
                <div className="m-5 font-LakesNeueRegular overflow-hidden rounded-lg border border-gray-200 shadow-md pb-1">
                  <div className="p-5">
                      <h3 className="text-xl font-semibold">Job Title : {requirement.title}</h3>
                      <p className="my-5"><strong>Client Name:</strong> {requirement.clientName}</p>
                      <p className="my-5"><strong>Client Organization:</strong> {requirement.clientOrganizationName}</p>
                      <p className="my-5"><strong>Description:</strong> {requirement.description}</p>
                      <p className="my-5"><strong>Date Posted:</strong> {requirement.datePosted}</p>
                      <p className="my-5"><strong>Valid Till:</strong> {requirement.validTill}</p>
                      <p className="my-5"><strong>Salary Range:</strong> {requirement.minSalary} - {requirement.maxSalary} {requirement.currency}</p>
                      <p className="my-5"><strong>Location:</strong> {requirement.location}</p>
                  </div>
                  <div  className="flex justify-center my-4">
                        <div>
                        <div>
                            <button
                            onClick={() => navigate(-1)}
                                className=" bg-[#00634D] mr-5 rounded-lg hover:bg-[#16473d] focus:bg-[#00634D]
                                    text-white font-bold py-2 px-4  focus:outline-none mx-auto
                                    focus:shadow-outline">Back
                            </button>
                        </div>
                        </div>
                        <div>
                        <button type="button" 
                        onClick={handleOnClick}
                        disabled={isSubmitting}
                        className=" bg-[#00634D] rounded-lg hover:bg-[#16473d] focus:bg-[#00634D]
                          text-white font-bold py-2 px-4  focus:outline-none mx-auto
                          focus:shadow-outline">Apply</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="m-5 font-LakesNeueRegular overflow-hidden rounded-lg border border-gray-200 shadow-md pb-1">
                  Requirement is not Open
                </div>
              )}
            </>
            )}
          </div>
        </>
      );
}

export default RequirementDetail;