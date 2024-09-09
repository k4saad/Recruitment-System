import React, { useEffect, useState } from "react";
import ErrorNotification from "../../common/ErrorNotification";
import { Link, useNavigate } from "react-router-dom";
import { getCandidateDetails } from "../../utils/apiFunctions";

const CandidateProfile = () => {
    const [candidate, setCandidate] = useState();
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
            navigate("/login/candidate"); 
            window.location.reload();
        }
        fetchCandidateDetails();
    }, [navigate]);
    
    const fetchCandidateDetails = async () => {
        setIsLoading(true);
        try {
          const data = await getCandidateDetails(localStorage.getItem("username"));
          setCandidate(data);
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

    
    

    return(
        <>
          {errorMessage && (
            <ErrorNotification errorMessage={errorMessage}
            handleNotification={handleNotification}/>
          )}
          <div className="flex flex-col mx-auto">
            <h2 className="font-CinzelRegular mx-auto text-3xl font-bold text-[#00634D] size-fit">
              Profile
            </h2>
    
            {isLoading ? (
              <div className="size-fit mx-auto transform translate-x-1/2 translate-y-1/2 ">
                <div className="border-t-transparent border-solid animate-spin  rounded-full border-[#00634D] border-8 h-10 w-10"></div>
              </div>
            ) : (
              <>
              {candidate ? (
                <div className="m-5 font-LakesNeueRegular overflow-hidden rounded-lg border border-gray-200 shadow-md pb-1">
                  <div className="p-5">
                      <h3 className="text-xl font-semibold">Name : {candidate.name}</h3>
                      <p className="my-5"><strong>Contact Number:</strong> {candidate.contactNumber}</p>
                      <p className="my-5"><strong>Username:</strong> {candidate.username}</p>
                      <p className="my-5"><strong>Resume:</strong></p>
                      {candidate.resume && (
                            <embed
                                src={`data:application/pdf;base64,${candidate.resume}`}
                                width="600"
                                height="500"
                                type="application/pdf"
                            />
                        )}
                        <p className="my-5"><strong>Medical Report:</strong></p>
                        {candidate.medicalReport && (
                            <embed
                                src={`data:application/pdf;base64,${candidate.medicalReport}`}
                                width="600"
                                height="500"
                                type="application/pdf"
                            />
                        )}
                         <p className="my-5"><strong>Medical Validity:</strong> {candidate.medicalValidity}</p>
                         <p className="my-5"><strong>Medical Status:</strong> {candidate.medicalSatus}</p>
                  </div>
                  <div  className="flex justify-center my-4">
                        <div>
                            <Link to={"/candidate/profile/edit"}>
                            <button
                                className=" bg-[#00634D] mr-5 rounded-lg hover:bg-[#16473d] focus:bg-[#00634D]
                                    text-white font-bold py-2 px-4  focus:outline-none mx-auto
                                    focus:shadow-outline">Edit
                                </button>
                            </Link>
                        </div>
                        <div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="m-5 font-LakesNeueRegular overflow-hidden rounded-lg border border-gray-200 shadow-md pb-1">
                  Candidate not found
                </div>
              )}
            </>
            )}
          </div>
        </>
    )
}

export default CandidateProfile