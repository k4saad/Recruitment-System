import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SuccessNotification from "../common/SuccessNotification";

const ClientDetails = () => {
    const location = useLocation();
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {candidate} = location.state;

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
            navigate("/login/client"); 
            window.location.reload();
        }
    }, [navigate]);

    const handleNotification = () => {
      setErrorMessage("")
      setSuccessMessage("")
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
                          <button
                          onClick={() => navigate(-1)}
                              className=" bg-[#00634D] mr-5 rounded-lg hover:bg-[#16473d] focus:bg-[#00634D]
                                  text-white font-bold py-2 px-4  focus:outline-none mx-auto
                                  focus:shadow-outline">back
                          </button>
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

export default ClientDetails;