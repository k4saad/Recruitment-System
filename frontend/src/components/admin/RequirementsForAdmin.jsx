import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteRequirementById, getAllRequirements } from "../utils/apiFunctions";
import RequirementForAdminCard from '../admin/RequirementForAdminCard'
import Paginator from "../common/Paginator";


const RequirementsForAdmin = () => {

    const [availableRequirements, setAvailableRequirements] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [currentpage, setCurrentPage] = useState(1);
    const [requirementsPerPage] = useState(6);
    const navigate = useNavigate();

    const calculateTotalPages = (requirementsPerPage, availableRequirements) =>
      Math.ceil(availableRequirements.length / requirementsPerPage);
  
    const indexOfLastRequirement = currentpage * requirementsPerPage;
    const indexOfFirstRequirement = indexOfLastRequirement - requirementsPerPage;
    const currentRequirements = availableRequirements.slice(indexOfFirstRequirement, indexOfLastRequirement);
  
    const handlePaginationClick = (pageNumber) => {
      setCurrentPage(pageNumber)
    }
  
    const fetchAvailableRequirements = async () => {
      setIsLoading(true);
      try {
        const data = await getAllRequirements();
        setAvailableRequirements(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error)
      }
    };

    useEffect(() => {
      const token = localStorage.getItem("jwtToken");
          if (!token) {
              navigate("/login/admin"); 
              window.location.reload();
          }
          fetchAvailableRequirements();
    }, [navigate]);

    const deleteRequirement = (requirementId) => {
        deleteRequirementById(requirementId);
        fetchAllClients();
      }

    return (
      <>          
          <section className="flex flex-col relative h-fit w-full " >
            <div className="relative flex justify-around">
              <div className="relative w-full">
                <div className="mx-0 flex flex-col">
                  <div>
                    <h1 className="text-center font-CinzelRegular my-8 text-3xl font-bold tracking-tight text-[#00634D] md:text-4xl lg:text-6xl">
                        Requirements
                    </h1>
                  </div>
                  {isLoading ? (
                    <div className="size-fit mx-auto my-56 transform translate-x-1/2 translate-y-1/2 ">
                      <div className="border-t-transparent border-solid animate-spin  rounded-full border-[#00634D] border-8 h-10 w-10 "></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 lg:flex-row justify-around">
                      {currentRequirements.map((requirement) => (
                        <RequirementForAdminCard requirement={requirement}
                        deleteRequirement={() => deleteRequirement(requirement.requirementId)}
                        key={requirement.requirementId} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Paginator
              currentPage={currentpage}
              totalPages={calculateTotalPages(requirementsPerPage, availableRequirements)}
              onPageChange={handlePaginationClick}
            />
          </section>
          
      
    </>
    )
}

export default RequirementsForAdmin