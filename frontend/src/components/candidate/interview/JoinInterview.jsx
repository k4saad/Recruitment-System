import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUpcommingInterviewsForCandidate } from "../../utils/apiFunctions";
import Paginator from "../../common/Paginator";
import JoinInterviewCard from "../interview/JoinInterviewCard"


const JoinInterview = () => {

    const [allInterviews, setAllInterviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [currentpage, setCurrentPage] = useState(1);
    const [interviewsPerPage] = useState(6);
    const navigate = useNavigate();

    const calculateTotalPages = (interviewsPerPage, allInterviews) =>
      Math.ceil(allInterviews.length / interviewsPerPage);
  
    const indexOfLastInterviews = currentpage * interviewsPerPage;
    const indexOfFirstInterviews = indexOfLastInterviews - interviewsPerPage;
    const currentInterviews = allInterviews.slice(indexOfFirstInterviews, indexOfLastInterviews);
  
    const handlePaginationClick = (pageNumber) => {
      setCurrentPage(pageNumber)
    }
  
    const fetchUpcommingInterviews = async () => {
      setIsLoading(true);
      try {
        const data = await getUpcommingInterviewsForCandidate(localStorage.getItem("username"));
        setAllInterviews(data);
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
          fetchUpcommingInterviews();
    }, [navigate]);

    return (
      <>          
          <section className="flex flex-col relative h-fit w-full " >
            <div className="relative flex justify-around">
              <div className="relative w-full">
                <div className="mx-0 flex flex-col">
                  <div>
                    <h1 className="text-center font-CinzelRegular my-8 text-3xl font-bold tracking-tight text-[#00634D] md:text-4xl lg:text-6xl">
                        Upcomming Interviews
                    </h1>
                  </div>
                  {isLoading ? (
                    <div className="size-fit mx-auto my-56 transform translate-x-1/2 translate-y-1/2 ">
                      <div className="border-t-transparent border-solid animate-spin  rounded-full border-[#00634D] border-8 h-10 w-10 "></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 lg:flex-row justify-around">
                      {currentInterviews.map((interview) => (
                        <JoinInterviewCard interview={interview} key={interview.interviewId} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Paginator
              currentPage={currentpage}
              totalPages={calculateTotalPages(interviewsPerPage, allInterviews)}
              onPageChange={handlePaginationClick}
            />
          </section>
          
      
    </>
    )
}

export default JoinInterview;