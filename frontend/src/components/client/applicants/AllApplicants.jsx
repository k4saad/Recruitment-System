import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllRequirementsForTable } from "../../utils/apiFunctions";
import Paginator from "../../common/Paginator";
import RequirementApplicationCard from "./RequirementApplicationCard";


const AllApplicants = () => {

    const [allApplicants, setAllApplicants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [currentpage, setCurrentPage] = useState(1);
    const [applicantsPerPage] = useState(6);
    const navigate = useNavigate();

    const calculateTotalPages = (applicantsPerPage, allApplicants) =>
      Math.ceil(allApplicants.length / applicantsPerPage);
  
    const indexOfLastApplicants = currentpage * applicantsPerPage;
    const indexOfFirstApplicants = indexOfLastApplicants - applicantsPerPage;
    const currentApplicants = allApplicants.slice(indexOfFirstApplicants, indexOfLastApplicants);
  
    const handlePaginationClick = (pageNumber) => {
      setCurrentPage(pageNumber)
    }
  
    const fetchAllApplicant = async () => {
      setIsLoading(true);
      try {
        const data = await getAllRequirementsForTable(localStorage.getItem("username"));
        const filteredApplicants = data.filter(requirement => requirement.numberOfApplicants > 0);
        setAllApplicants(filteredApplicants);
        setIsLoading(false);
      } catch (error) {
        console.error(error)
      }
    };

    useEffect(() => {
      const token = localStorage.getItem("jwtToken");
          if (!token) {
              navigate("/login/client"); 
              window.location.reload();
          }
          fetchAllApplicant();
    }, [navigate]);

    return (
      <>          
          <section className="flex flex-col relative h-fit w-full " >
            <div className="relative flex justify-around">
              <div className="relative w-full">
                <div className="mx-0 flex flex-col">
                  <div>
                    <h1 className="text-center font-CinzelRegular my-8 text-3xl font-bold tracking-tight text-[#00634D] md:text-4xl lg:text-6xl">
                        All Applicants
                    </h1>
                  </div>
                  {isLoading ? (
                    <div className="size-fit mx-auto my-56 transform translate-x-1/2 translate-y-1/2 ">
                      <div className="border-t-transparent border-solid animate-spin  rounded-full border-[#00634D] border-8 h-10 w-10 "></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 lg:flex-row justify-around">
                      {currentApplicants.map((requirement) => (
                        <RequirementApplicationCard requirement={requirement} key={requirement.requirementId} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Paginator
              currentPage={currentpage}
              totalPages={calculateTotalPages(applicantsPerPage, allApplicants)}
              onPageChange={handlePaginationClick}
            />
          </section>
          
      
    </>
    )
}

export default AllApplicants;