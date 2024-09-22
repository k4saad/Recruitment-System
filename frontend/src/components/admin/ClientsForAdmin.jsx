import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Paginator from "../common/Paginator";
import { getAllClientsForAdmin } from "../utils/apiFunctions";
import ClientCard from "../admin/ClientCard"



const ClientsForAdmin = () => {

    const [allClients, setAllClients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [currentpage, setCurrentPage] = useState(1);
    const [clientsPerPage] = useState(6);
    const navigate = useNavigate();

    const calculateTotalPages = (clientsPerPage, allClients) =>
      Math.ceil(allClients.length / clientsPerPage);
  
    const indexOfLastClients = currentpage * clientsPerPage;
    const indexOfFirstClients = indexOfLastClients - clientsPerPage;
    const currentClients = allClients.slice(indexOfFirstClients, indexOfLastClients);
  
    const handlePaginationClick = (pageNumber) => {
      setCurrentPage(pageNumber)
    }
  
    const fetchAllClients = async () => {
      setIsLoading(true);
      try {
        const data = await getAllClientsForAdmin();
        setAllClients(data);
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
          fetchAllClients();
    }, [navigate]);

    return (
      <>          
          <section className="flex flex-col relative h-fit w-full " >
            <div className="relative flex justify-around">
              <div className="relative w-full">
                <div className="mx-0 flex flex-col">
                  <div>
                    <h1 className="text-center font-CinzelRegular my-8 text-3xl font-bold tracking-tight text-[#00634D] md:text-4xl lg:text-6xl">
                        Clients
                    </h1>
                  </div>
                  {isLoading ? (
                    <div className="size-fit mx-auto my-56 transform translate-x-1/2 translate-y-1/2 ">
                      <div className="border-t-transparent border-solid animate-spin  rounded-full border-[#00634D] border-8 h-10 w-10 "></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 lg:flex-row justify-around">
                      {currentClients.map((client) => (
                        <ClientCard client={client} key={client.clientId} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Paginator
              currentPage={currentpage}
              totalPages={calculateTotalPages(clientsPerPage, allClients)}
              onPageChange={handlePaginationClick}
            />
          </section>                
    </>
    )
}

export default ClientsForAdmin;