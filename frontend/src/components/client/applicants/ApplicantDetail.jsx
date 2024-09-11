import React, { useEffect, useState } from "react";
import ErrorNotification from "../../common/ErrorNotification";
import { Link, useNavigate, useParams } from "react-router-dom";
import { candidateFit, candidateUnfit, getApplicantDetailForClient, rejectApplicant, updateAppliedStatus } from "../../utils/apiFunctions";
import SuccessNotification from "../../common/SuccessNotification";

const ApplicantDetail = () => {
    const [applicant, setApplicant] = useState();
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const {applicationId} = useParams();
    const navigate = useNavigate();

    (async () => {
        if(applicant && applicant.candidateApplicationStatus === "APPLIED"){
            updateAppliedStatus(applicationId)
        }
      })();
    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
            navigate("/login/client"); 
            window.location.reload();
        }
        fetchApplicantDetails();
    }, [navigate]);
    
    const fetchApplicantDetails = async () => {
        setIsLoading(true);
        try {
          const data = await getApplicantDetailForClient(applicationId);
          setApplicant(data);
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
    
    const handleRejectApplicant = async () => {
        try{
            const success = await rejectApplicant(applicationId)
            if(success !== undefined){
                setSuccessMessage("Applicant rejected")
                setTimeout(() => {
                    setSuccessMessage("")
                }, 5000);
                getApplicationDetail()
            }
            else{
                setErrorMessage("Error rejecting offer")
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

    const handleFit = async () => {
        try{
            const success = await candidateFit(applicationId)
            if(success !== undefined){
                setSuccessMessage("Applicant marked as fit")
                setTimeout(() => {
                    setSuccessMessage("")
                }, 5000);
                getApplicationDetail()
            }
            else{
                setErrorMessage("Error marking as fit")
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
    
    const handleUnfit = async () => {
        try{
            const success = await candidateUnfit(applicationId)
            if(success !== undefined){
                setSuccessMessage("Applicant marked as unfit")
                setTimeout(() => {
                    setSuccessMessage("")
                }, 5000);
                getApplicationDetail()
            }
            else{
                setErrorMessage("Error marking as unfit")
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

    return(
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
              Applicant Details
            </h2>
    
            {isLoading ? (
              <div className="size-fit mx-auto transform translate-x-1/2 translate-y-1/2 ">
                <div className="border-t-transparent border-solid animate-spin  rounded-full border-[#00634D] border-8 h-10 w-10"></div>
              </div>
            ) : (
              <>
              {applicant ? (
                <div className="m-5 font-LakesNeueRegular overflow-hidden rounded-lg border border-gray-200 shadow-md pb-1">
                  <div className="p-5">
                      <h3 className="text-xl font-semibold">Name: {applicant.candidateName}</h3>
                      <p className="my-5"><strong>Application Id: </strong>{applicant.applicationId}</p>
                      <p className="my-5"><strong>Date Applied: </strong>{applicant.dateApplied}</p>
                      <p className="my-5"><strong>Applied for: </strong>{applicant.clientRequirementTitle}</p>
                      <p className="my-5"><strong>Salary: </strong>{applicant.clientRequirementMinSalary} - {applicant.clientRequirementMaxSalary} {applicant.clientRequirementCurrency}</p>
                      <p className="my-5"><strong>Location: </strong>{applicant.clientRequirementLocation}</p>
                      <p className="my-5"><strong>Interview: </strong>{applicant.interview !== null ? (
                        <>Scheduled for {
                            applicant.interview.interviewTimestamp
                        }
                        </>
                      ) : (
                        <>
                            Not Scheduled
                        </>
                      )}
                      <p className="my-5"><strong>Status:</strong> {applicant.candidateApplicationStatus}</p>
                      </p>
                      <p className="my-5"><strong>Resume:</strong></p>
                      {applicant.resume && (
                            <embed
                                src={`data:application/pdf;base64,${applicant.resume}`}
                                width="600"
                                height="500"
                                type="application/pdf"
                            />
                        )}
                        <p className="my-5"><strong>Medical Report:</strong></p>
                        {applicant.medicalDocument && (
                            <embed
                                src={`data:application/pdf;base64,${applicant.medicalDocument}`}
                                width="600"
                                height="500"
                                type="application/pdf"
                            />
                        )}
                         <p className="my-5"><strong>Medical Validity:</strong> {applicant.medicalValidity}</p>
                         <p className="my-5"><strong>Medical Status:</strong> {applicant.medicalSatus}</p>
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

                        {
                            (applicant.candidateApplicationStatus === "UNDER_REVIEW" ||
                            applicant.candidateApplicationStatus === "SELECTED_FOR_INTERVIEW" ||
                            applicant.candidateApplicationStatus === "MEDICAL_REPORT_REQUESTED" 
                            ) 
                            &&
                            <div>
                            <button
                              onClick={handleRejectApplicant}
                                className=" bg-[#00634D] mr-5 rounded-lg hover:bg-[#16473d] focus:bg-[#00634D]
                                    text-white font-bold py-2 px-4  focus:outline-none mx-auto
                                    focus:shadow-outline">Reject
                                </button>
                            </div>
                        }
                        
                        {
                            applicant.candidateApplicationStatus === "MEDICAL_REPORT_RECEIVED" 
                             
                            &&
                            <>
                            <div>
                            <button
                              onClick={handleFit}
                                className=" bg-[#00634D] mr-5 rounded-lg hover:bg-[#16473d] focus:bg-[#00634D]
                                    text-white font-bold py-2 px-4  focus:outline-none mx-auto
                                    focus:shadow-outline">fit
                                </button>
                            </div>
                            <div>
                            <button
                              onClick={handleUnfit}
                                className=" bg-[#00634D] mr-5 rounded-lg hover:bg-[#16473d] focus:bg-[#00634D]
                                    text-white font-bold py-2 px-4  focus:outline-none mx-auto
                                    focus:shadow-outline">Unfit
                                </button>
                            </div>
                            </>
                        }

                        {
                            applicant.candidateApplicationStatus === "UNDER_REVIEW" 
                            &&
                            <div>
                            <Link to={`/client/interview/schedule/${applicationId}`}>
                            <button
                                className=" bg-[#00634D] mr-5 rounded-lg hover:bg-[#16473d] focus:bg-[#00634D]
                                    text-white font-bold py-2 px-4  focus:outline-none mx-auto
                                    focus:shadow-outline">Schedule Interview
                                </button>
                            </Link>
                            </div>
                        }
                  </div>
                </div>
              ) : (
                <div className="m-5 font-LakesNeueRegular overflow-hidden rounded-lg border border-gray-200 shadow-md pb-1">
                  Application not found
                </div>
              )}
            </>
            )}
          </div>
        </>
    )
}

export default ApplicantDetail