import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ErrorNotification from "../../common/ErrorNotification";
import SuccessNotification from "../../common/SuccessNotification"
import { getApplicationDetail, withdrawApplication } from "../../utils/apiFunctions";
import moment from "moment";

const ApplicationDetail = ({}) => {
    const [application, setApplication] = useState();
    const {applicationId} = useParams();
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
        fetchApplicationDetail();
    }, [navigate, applicationId]);

    const fetchApplicationDetail = async () => {
        setIsLoading(true);
        try {
          const data = await getApplicationDetail(applicationId);
          setApplication(data);
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


    const handleWithdraw = async () => {
        try{
            const success = await withdrawApplication(applicationId)
            if(success !== undefined){
                setSuccessMessage("Withdrawn Successfully")
                setTimeout(() => {
                    setSuccessMessage("")
                }, 5000);
                getApplicationDetail()
            }
            else{
                setErrorMessage("Error withdrawing")
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

    const handleAcceptOffer = async () => {
        try{
            const success = await acceptOffer(applicationId)
            if(success !== undefined){
                setSuccessMessage("Offer accepted")
                setTimeout(() => {
                    setSuccessMessage("")
                }, 5000);
                getApplicationDetail()
            }
            else{
                setErrorMessage("Error accepting offer")
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
    

    const handleRejectOffer = async () => {
        try{
            const success = await rejectOffer(applicationId)
            if(success !== undefined){
                setSuccessMessage("Offer rejected")
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
              Application
            </h2>
    
            {isLoading ? (
              <div className="size-fit mx-auto transform translate-x-1/2 translate-y-1/2 ">
                <div className="border-t-transparent border-solid animate-spin  rounded-full border-[#00634D] border-8 h-10 w-10"></div>
              </div>
            ) : (
              <>
                <div className="m-5 font-LakesNeueRegular overflow-hidden rounded-lg border border-gray-200 shadow-md pb-1">
                  <div className="p-5">
                      <h3 className="text-xl font-semibold">Job Title : {application.clientRequirementTitle}</h3>
                      <p className="my-5"><strong>Client Name:</strong> {application.clientName}</p>
                      <p className="my-5"><strong>Client Organization:</strong> {application.clientRequirementOrganizationName}</p>
                      <p className="my-5"><strong>Description:</strong> {application.clientRequirementDescription}</p>
                      <p className="my-5"><strong>Date Applied:</strong> {application.dateApplied}</p>
                      <p className="my-5"><strong>Salary Range:</strong> {application.clientRequirementMinSalary} - {application.clientRequirementMaxSalary} {application.clientRequirementCurrency}</p>
                      <p className="my-5"><strong>Location:</strong> {application.clientRequirementLocation}</p>
                      <p className="my-5"><strong>Status:</strong> {application.candidateApplicationStatus}</p>
                      {
                        application.interview 
                        &&
                        (
                            <>
                                <p className="my-5"><strong>Interview:</strong> {application.interview.status}</p>
                                <p className="my-5"><strong>Interview Timing:</strong> {moment(application.interview.interviewTimestamp).format('MMMM Do YYYY, h:mm A')}</p>
                            </>
                        )
                      }
                      {
                        application.candidateVisaDocument
                        &&
                        (
                            <>
                            {
                                application.candidateVisaDocument.visaDocument
                                &&
                                (
                                    <>
                                      <p className="my-5"><strong>Visa document:</strong> </p>
                                        <embed
                                            src={`data:application/pdf;base64,${application.candidateVisaDocument.visaDocument}`}
                                            width="600"
                                            height="500"
                                            type="application/pdf"
                                        />
                                    </>
                                )

                            }
                            </>
                        )
                      }
                      {
                        application.ticket
                        &&
                        (
                            <>
                            {
                                application.ticket.ticket
                                &&
                                (
                                    <>
                                      <p className="my-5"><strong>Ticket:</strong> </p>
                                        <embed
                                            src={`data:application/pdf;base64,${application.ticket.ticket}`}
                                            width="600"
                                            height="500"
                                            type="application/pdf"
                                        />
                                    </>
                                )

                            }
                            </>
                        )
                      }
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
                        {(application.candidateApplicationStatus === "APPLIED" || 
                            application.candidateApplicationStatus === "UNDER_REVIEW" || 
                            application.candidateApplicationStatus === "SELECTED_FOR_INTERVIEW" || 
                            application.candidateApplicationStatus === "MEDICAL_REPORT_REQUESTED" || 
                            application.candidateApplicationStatus === "MEDICAL_REPORT_RECEIVED") 
                            && 
                             (
                                <div>
                                    <button type="button" 
                                    onClick={handleWithdraw}
                                    disabled={isSubmitting}
                                    className=" bg-[#00634D] rounded-lg hover:bg-[#16473d] focus:bg-[#00634D]
                                    text-white font-bold py-2 px-4  focus:outline-none mx-auto
                                    focus:shadow-outline">Withdraw Application</button>
                                </div>

                             )
                            }
                            {application.candidateApplicationStatus === "OFFER_EXTENDED" 

                                &&
                                
                                (
                                    <>
                                        <div>
                                            <button type="button" 
                                            onClick={handleAcceptOffer}
                                            className=" bg-[#00634D] rounded-lg hover:bg-[#16473d] focus:bg-[#00634D]
                                            text-white font-bold py-2 px-4  focus:outline-none mx-auto
                                            focus:shadow-outline">Accept Offer</button>
                                        </div>
                                        <div>
                                        <button type="button" 
                                            onClick={handleRejectOffer}
                                            className=" bg-[#00634D] rounded-lg hover:bg-[#16473d] focus:bg-[#00634D]
                                            text-white font-bold py-2 px-4  focus:outline-none mx-auto
                                            focus:shadow-outline">Reject Offer</button>
                                        </div>
                                    </>
                                )
                                
                            }
                  </div>
                </div>
            </>
            )}
          </div>
        </>
      );
}

export default ApplicationDetail;