import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Paginator from "../../common/Paginator";
import ApplicationCard from "../application/ApplicationCard"
import { getAllApplication } from "../../utils/apiFunctions";


const AllApplication = () => {

    const [allApplication, setAllApplication] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [currentpage, setCurrentPage] = useState(1);
    const [applicationPerPage] = useState(6);
    const navigate = useNavigate();

    const calculateTotalPages = (applicationPerPage, allApplication) =>
      Math.ceil(allApplication.length / applicationPerPage);
  
    const indexOfLastApplication = currentpage * applicationPerPage;
    const indexOfFirstApplication = indexOfLastApplication - applicationPerPage;
    const currentApplications = allApplication.slice(indexOfFirstApplication, indexOfLastApplication);
  
    const handlePaginationClick = (pageNumber) => {
      setCurrentPage(pageNumber)
    }
  
    const fetchAllApplication = async () => {
      setIsLoading(true);
      try {
        const data = await getAllApplication(localStorage.getItem("username"));
        setAllApplication(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error)
      }
    };

    useEffect(() => {
      const token = localStorage.getItem("jwtToken");
          if (!token) {
              navigate("/login/candidate"); 
              window.location.reload();
          }
          fetchAllApplication();
          console.log("fetch done")
    }, [navigate]);

    return (
      <>          
          <section className="flex flex-col relative h-fit w-full " >
            <div className="relative flex justify-around">
              <div className="relative w-full">
                <div className="mx-0 flex flex-col">
                  <div>
                    <h1 className="text-center font-CinzelRegular my-8 text-3xl font-bold tracking-tight text-[#00634D] md:text-4xl lg:text-6xl">
                        Applications
                    </h1>
                  </div>
                  {isLoading ? (
                    <div className="size-fit mx-auto my-56 transform translate-x-1/2 translate-y-1/2 ">
                      <div className="border-t-transparent border-solid animate-spin  rounded-full border-[#00634D] border-8 h-10 w-10 "></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 lg:flex-row justify-around">
                      {currentApplications.map((application) => (
                        <ApplicationCard application={application} key={application.applicationId} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Paginator
              currentPage={currentpage}
              totalPages={calculateTotalPages(applicationPerPage, allApplication)}
              onPageChange={handlePaginationClick}
            />
          </section>
          
      
    </>
    )
}

export default AllApplication