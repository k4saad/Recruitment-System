import React, { useEffect, useState } from "react";
import ErrorNotification from "../common/ErrorNotification";
import { Link, useNavigate } from "react-router-dom";
import { getAdminDetails } from "../utils/apiFunctions";

const AdminProfile = () => {
    const [admin, setAdmin] = useState();
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
            navigate("/login/admin"); 
            window.location.reload();
        }
        fetchAdminDetails();
    }, [navigate]);
    
    const fetchAdminDetails = async () => {
        setIsLoading(true);
        try {
          const data = await getAdminDetails();
          setAdmin(data);
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

    const handleLogout = () =>{
      localStorage.removeItem("jwtToken")
      localStorage.removeItem("username")
      navigate("/")
      window.location.reload()
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
              {admin ? (
                <div className="m-5 font-LakesNeueRegular overflow-hidden rounded-lg border border-gray-200 shadow-md pb-1">
                  <div className="p-5">
                      <h3 className="text-xl font-semibold">Name : {admin.name}</h3>
                      <p className="my-5"><strong>Username:</strong> {admin.username}</p>                  
                      <p className="my-5"><strong>Email Id :</strong> {admin.email}</p>                  
                </div>
                  <div  className="flex justify-center my-4">
                        <div>
                            <button
                              onClick={handleLogout}
                                className=" bg-[#00634D] mr-5 rounded-lg hover:bg-[#16473d] focus:bg-[#00634D]
                                    text-white font-bold py-2 px-4  focus:outline-none mx-auto
                                    focus:shadow-outline">Logout
                                </button>
                        </div>
                  </div>
                </div>
              ) : (
                <div className="m-5 font-LakesNeueRegular overflow-hidden rounded-lg border border-gray-200 shadow-md pb-1">
                  Admin not found
                </div>
              )}
            </>
            )}
          </div>
        </>
    )
}

export default AdminProfile;