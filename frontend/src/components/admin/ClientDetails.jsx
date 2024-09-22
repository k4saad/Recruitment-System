import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ClientDetails = () => {
    const location = useLocation();
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate();
    const {client} = location.state;

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
            navigate("/login/client"); 
            window.location.reload();
        }
    }, [navigate]);

    

    return(
        <>
          <div className="flex flex-col mx-auto">
            <h2 className="font-CinzelRegular mx-auto text-3xl font-bold text-[#00634D] size-fit">
              Client Details
            </h2>
              <>
              {client ? (
                <div className="m-5 font-LakesNeueRegular overflow-hidden rounded-lg border border-gray-200 shadow-md pb-1">
                  <div className="p-5">
                      <h3 className="text-xl font-semibold">Name : {client.name}</h3>
                      <p className="my-5"><strong>Organization Name:</strong> {client.organizationName}</p>
                      <p className="my-5"><strong>Contact Number:</strong> {client.contactNumber}</p>
                      <p className="my-5"><strong>Username:</strong> {client.username}</p>                  
                      <p className="my-5"><strong>Email Id :</strong> {client.email}</p>                  
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
                  </div>
                </div>
              ) : (
                <div className="m-5 font-LakesNeueRegular overflow-hidden rounded-lg border border-gray-200 shadow-md pb-1">
                  Client not found
                </div>
              )}
            </>
          </div>
        </>
    )
}

export default ClientDetails;