import React, { useEffect, useState } from "react";
import { deleteRequirementById, getAllRequirementsForTable } from "../../utils/apiFunctions";
import Paginator from "../../common/Paginator";
import { Link, useNavigate } from "react-router-dom";
import ErrorNotification from '../../common/ErrorNotification'
import SuccessNotification from '../../common/SuccessNotification'

const AllRequirement = () => {
  
  const [currentpage, setCurrentPage] = useState(1);
  const [requirementsPerPage] = useState(5);
  
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [requirements, setRequirements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 

    const fetchAllRequirements = async () => {
        setIsLoading(true);
        try {
          const data = await getAllRequirementsForTable(localStorage.getItem("username"));
          setRequirements(data);
          setIsLoading(false);
        } catch (error) {
          setErrorMessage(error.message);
          setTimeout(() => {
            setErrorMessage("")
           }, 5000);
        }
      };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
        if (!token) {
            navigate("/login/client"); 
            window.location.reload();
        }
    fetchAllRequirements();
  }, [navigate]);

  const calculateTotalPages = (requirementsPerPage, requirements) =>
    Math.ceil(requirements.length / requirementsPerPage);

  const indexOfLastRequirement = currentpage * requirementsPerPage;
  const indexOfFirstRequirement = indexOfLastRequirement - requirementsPerPage;
  const currentRequirements = requirements.slice(indexOfFirstRequirement, indexOfLastRequirement);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleRequirementDelete = async (id) =>{
    try {
      const data = await deleteRequirementById(id)
      if(data === true){
        setSuccessMessage(`Requirement with id ${id} deleted`)
        setTimeout(() => {
          setSuccessMessage("")
      }, 5000);
        fetchAllRequirements()
      }
      else{
        console.error("Error : Deleting requirement")
      }
    } catch (error) {
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage("")
    }, 5000);
    }
    
  }

  const handleNotification = () => {
    setErrorMessage("")
    setSuccessMessage("")
}

  return (
    <>
      {successMessage && (
        <SuccessNotification successMessage={successMessage}
        handleNotification={handleNotification}/>
      )}
      {errorMessage && (
        <ErrorNotification errorMessage={errorMessage}
        handleNotification={handleNotification}/>
      )}
      <div className="flex flex-col mx-auto">
        <h2 className="font-CinzelRegular mx-auto text-3xl font-bold text-[#00634D] size-fit">
          Existing Requirements
        </h2>

        {isLoading ? (
          <div className="size-fit mx-auto transform translate-x-1/2 translate-y-1/2 ">
            <div className="border-t-transparent border-solid animate-spin  rounded-full border-[#00634D] border-8 h-10 w-10"></div>
          </div>
        ) : (
          <div className="m-5 overflow-hidden rounded-lg border border-gray-200 shadow-md pb-1">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                    Job Title
                  </th>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                    Salary Range
                  </th>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                    Applicants
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  ></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {currentRequirements.map((requirement) => (
                  <tr key={requirement.requirementId} className="hover:bg-gray-50">
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="text-sm">
                        <div className="font-medium text-gray-700">
                          {requirement.title}
                        </div>
                        <div className="text-gray-400">Id : {requirement.requirementId}</div>
                      </div>
                    </th>
                    {requirement.status === "OPEN" ? (
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                          Open
                        </span>
                      </td>
                    ) : (
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-red-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                          Closed
                        </span>
                      </td>
                    )}
                    <td className="px-6 py-4">{requirement.minSalary} - {requirement.maxSalary} {requirement.currency}</td>
                    <td className="px-6 py-4">{requirement.numberOfApplicants}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-4">
                        <button onClick={() => handleRequirementDelete(requirement.requirementId)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={"1.5"}
                            stroke="currentColor"
                            className="h-6 w-6"
                            x-tooltip="tooltip"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                        <button>
                          {/* TODO - Add view requirement details and history fuctionality */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={"1.5"}
                            stroke="currentColor"
                            className="h-6 w-6"
                            x-tooltip="tooltip"
                          >
                            <path
                              d="M3 14C3 9.02944 7.02944 5 12 5C16.9706 5 21 9.02944 21 14M17 14C17 16.7614 14.7614 19 12 19C9.23858 19 7 16.7614 7 14C7 11.2386 9.23858 9 12 9C14.7614 9 17 11.2386 17 14Z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Paginator
              currentPage={currentpage}
              totalPages={calculateTotalPages(requirementsPerPage, requirements)}
              onPageChange={handlePaginationClick}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AllRequirement
