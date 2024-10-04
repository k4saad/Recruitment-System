import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Paginator from "../common/Paginator";
import { deleteCandidateById, getAllCandidatesForAdmin } from "../utils/apiFunctions";
import CandidateCard from "../admin/CandidateCard"



const CandidatesForAdmin = () => {

    const [allCandidates, setAllCandidates] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [currentpage, setCurrentPage] = useState(1);
    const [candidatesPerPage] = useState(6);
    const navigate = useNavigate();

    const calculateTotalPages = (candidatesPerPage, allCandidates) =>
      Math.ceil(allCandidates.length / candidatesPerPage);
  
    const indexOfLastCandidates = currentpage * candidatesPerPage;
    const indexOfFirstCandidates = indexOfLastCandidates - candidatesPerPage;
    const currentCandidates = allCandidates.slice(indexOfFirstCandidates, indexOfLastCandidates);
  
    const handlePaginationClick = (pageNumber) => {
      setCurrentPage(pageNumber)
    }

    const deleteCandidate = (CandidateId) => {
      deleteCandidateById(CandidateId);
      fetchAllCandidates();
    }
  
    const fetchAllCandidates = async () => {
      setIsLoading(true);
      try {
        const data = await getAllCandidatesForAdmin();
        setAllCandidates(data);
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
          fetchAllCandidates();
    }, [navigate]);

    return (
      <>          
          <section className="flex flex-col relative h-fit w-full " >
            <div className="relative flex justify-around">
              <div className="relative w-full">
                <div className="mx-0 flex flex-col">
                  <div>
                    <h1 className="text-center font-CinzelRegular my-8 text-3xl font-bold tracking-tight text-[#00634D] md:text-4xl lg:text-6xl">
                        Candidates
                    </h1>
                  </div>
                  {isLoading ? (
                    <div className="size-fit mx-auto my-56 transform translate-x-1/2 translate-y-1/2 ">
                      <div className="border-t-transparent border-solid animate-spin  rounded-full border-[#00634D] border-8 h-10 w-10 "></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 lg:flex-row justify-around">
                      {currentCandidates.map((candidate) => (
                        <CandidateCard candidate={candidate} 
                        deleteCandidate={() => deleteCandidate(candidate.candidateId)}
                        key={candidate.candidateId} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Paginator
              currentPage={currentpage}
              totalPages={calculateTotalPages(candidatesPerPage, allCandidates)}
              onPageChange={handlePaginationClick}
            />
          </section>                
    </>
    )
}

export default CandidatesForAdmin;