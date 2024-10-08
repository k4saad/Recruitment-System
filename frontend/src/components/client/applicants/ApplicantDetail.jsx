import React, { useEffect, useState } from "react";
import ErrorNotification from "../../common/ErrorNotification";
import { Link, useNavigate, useParams } from "react-router-dom";
import { candidateFit, candidateUnfit, getApplicantDetailForClient, rejectApplicant, updateAppliedStatus, uploadTicket, uploadVisa } from "../../utils/apiFunctions";
import SuccessNotification from "../../common/SuccessNotification";
import moment from 'moment';

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
            window.location.reload()
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

    const handleTicketUpload = async (e) => {
        const ticket = e.target.files[0]; 
    if (!ticket) {
        setErrorMessage("Please select a file to upload");
        return;
    }
        try{
            const success = await uploadTicket(applicationId, ticket)
            if(success !== undefined){
                setSuccessMessage("Ticket uploaded")
                setTimeout(() => {
                    setSuccessMessage("")
                }, 5000);
                fetchApplicantDetails()
            }
            else{
                setErrorMessage("Error uploading ticket")
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

    const handleVisaUpload = async (e) => {
        const visa = e.target.files[0];
        if (!visa) {
            setErrorMessage("Please select a file to upload");
            return;
        }
        try{
            const success = await uploadVisa(applicationId, visa)
            if(success !== undefined){
                setSuccessMessage("Visa uploaded")
                setTimeout(() => {
                    setSuccessMessage("")
                }, 5000);
                fetchApplicantDetails()
            }
            else{
                setErrorMessage("Error uploading visa")
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
              {applicant.candidateApplicationStatus === "SELECTED" ? (
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
                            <p className="my-5">
                                <strong>Interview: </strong>
                                {applicant.interview && applicant.interview.interviewTimestamp ? (
                                    applicant.interview.status === 'SCHEDULED' ? (
                                        <>Scheduled for: {moment(applicant.interview.interviewTimestamp).format('MMMM Do YYYY, h:mm A')}</>
                                    ) : applicant.interview.status === 'COMPLETED' ? (
                                        <>Completed</>
                                    ) : applicant.interview.status === 'CANCELLED' ? (
                                        <>Cancelled</>
                                    ) : (
                                        <>Status Unknown</>
                                    )
                                ) : (
                                    <>Not Scheduled</>
                                )}
                            </p>

                            <p className="my-5"><strong>Status:</strong> {applicant.candidateApplicationStatus}</p>

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
                            <p className="my-5"><strong>Medical Status:</strong> {applicant.medicalStatus}</p>

                            <p className="my-5"><strong>Visa:</strong></p>
                            <div className="mt-2">
                                <input
                                    type="file"
                                    name="visa"
                                    id="visa"
                                    className="shadow focus:ring-[#00634D] focus:border-[#00634D] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    onChange={handleVisaUpload}
                                />
                                {applicant.candidateVisaDocument && (
                                    <embed
                                        src={`data:application/pdf;base64,${applicant.candidateVisaDocument.visaDocument}`}
                                        width="600"
                                        height="500"
                                        type="application/pdf"
                                    />
                                )}
                            </div>

                            <p className="my-5"><strong>Ticket:</strong></p>
                            <div className="mt-2">
                                <input
                                    type="file"
                                    name="ticket"
                                    id="ticket"
                                    className="shadow focus:ring-[#00634D] focus:border-[#00634D] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    onChange={handleTicketUpload}
                                />
                                {applicant.ticket && (
                                    <embed
                                        src={`data:application/pdf;base64,${applicant.ticket.ticket}`}
                                        width="600"
                                        height="500"
                                        type="application/pdf"
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex justify-center my-4">
                            <div>
                                <button
                                    onClick={() => navigate(-1)}
                                    className="bg-[#00634D] mr-5 rounded-lg hover:bg-[#16473d] focus:bg-[#00634D]
                                        text-white font-bold py-2 px-4 focus:outline-none mx-auto focus:shadow-outline"
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="m-5 font-LakesNeueRegular overflow-hidden rounded-lg border border-gray-200 shadow-md pb-1">
                        Application not found
                    </div>
                )}
            </>

              ) : (
                                <div className="m-5 font-LakesNeueRegular overflow-hidden rounded-lg border border-gray-200 shadow-md pb-1">
                  <div className="p-5">
                      <h3 className="text-xl font-semibold">Name: {applicant.candidateName}</h3>
                      <p className="my-5"><strong>Application Id: </strong>{applicant.applicationId}</p>
                      <p className="my-5"><strong>Date Applied: </strong>{applicant.dateApplied}</p>
                      <p className="my-5"><strong>Applied for: </strong>{applicant.clientRequirementTitle}</p>
                      <p className="my-5"><strong>Salary: </strong>{applicant.clientRequirementMinSalary} - {applicant.clientRequirementMaxSalary} {applicant.clientRequirementCurrency}</p>
                      <p className="my-5"><strong>Location: </strong>{applicant.clientRequirementLocation}</p>
                      <p className="my-5">
                        <strong>Interview: </strong>
                        {applicant.interview && applicant.interview.interviewTimestamp ? (
                            applicant.interview.status === 'SCHEDULED' ? (
                            <>Scheduled for: {moment(applicant.interview.interviewTimestamp).format('MMMM Do YYYY, h:mm A')}</>
                            ) : applicant.interview.status === 'COMPLETED' ? (
                            <>Completed</>
                            ) : applicant.interview.status === 'CANCELLED' ? (
                            <>Cancelled</>
                            ) : (
                            <>Status Unknown</>
                            )
                        ) : (
                            <>Not Scheduled</>
                        )}
                        </p>

                      <p className="my-5"><strong>Status:</strong> {applicant.candidateApplicationStatus}</p>
                      
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
                            applicant.candidateApplicationStatus !== "SELECTED" 
                            &&
                            <>
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
                                (applicant.candidateApplicationStatus === "UNDER_REVIEW" && !applicant.interview)
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
                            <div>
                            <Link to={`/client/pay/${applicationId}`}>
                            <button
                                className=" bg-[#00634D] mr-5 rounded-lg hover:bg-[#16473d] focus:bg-[#00634D]
                                    text-white font-bold py-2 px-4  focus:outline-none mx-auto
                                    focus:shadow-outline">Select Candidate
                                </button>
                            </Link>
                            </div>
                        </>
                        }


                        
                  </div>
                </div>
              
              )}
              </>
            )}
          </div>
        </>
    )
}

export default ApplicantDetail