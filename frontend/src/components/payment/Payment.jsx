import React, { useEffect, useState } from "react";
import SuccessNotification from "../common/SuccessNotification";
import { Link, useNavigate, useParams } from "react-router-dom";
import ErrorNotification from "../common/ErrorNotification";
import { pay } from "../utils/apiFunctions";

const Payment = () => {
    const [payment, setPayment] = useState({
        name : "",
        cardNumber : "",
        cvv : "",
        expiry : ""
        
    })

    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const {applicationId} = useParams();
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value
        setPayment({...payment, [name] : value})
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await pay(applicationId)
                setSuccessMessage("Payment processed successfully")
                setTimeout(() => {
                    setSuccessMessage("")
                    navigate("/client/applicants")
                }, 5000);
                setErrorMessage("")                
        } catch (error) {
            console.error(error)
            setErrorMessage(error.message)
            setTimeout(() => {
              setErrorMessage("Payment Failed")
              window.location.href("/client/applicants")
            }, 5000);                    
        }
    }

    return (
        <>
        {errorMessage && (
          <ErrorNotification errorMessage={errorMessage}
          handleNotification={handleNotification}/>
        )}
        {successMessage && (
            <SuccessNotification successMessage={successMessage}
            handleNotification={handleInputChange}/>
        )}
        <div className="flex flex-col mx-auto">
          <h2 className="font-CinzelRegular mx-auto text-3xl font-bold text-[#00634D] size-fit">
            Payment
          </h2>
          {isLoading ? (
            <div className="size-fit mx-auto transform translate-x-1/2 translate-y-1/2 ">
              <div className="border-t-transparent border-solid animate-spin  rounded-full border-[#00634D] border-8 h-10 w-10"></div>
            </div>
          ) : (
            <>
              <div className="m-5 font-LakesNeueRegular overflow-hidden rounded-lg border border-gray-200 shadow-md pb-1">
                <form onSubmit={handleSubmit} className="mt-8">
            <div className="space-y-5">
                <div>
                    <label htmlFor="" className="text-base font-medium text-[#00634D]">
                    {' '}
                    Card Number{' '}
                    </label>
                    <div className="mt-2">
                    <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        id='cardNumber'
                        name='cardNumber'
                        type="number"
                        value={payment.cardNumber}
                        onChange={handleInputChange}
                        placeholder="Card Number"
                        required
                    ></input>
                    </div>
              </div>
              <div>
                    <label htmlFor="" className="text-base font-medium text-[#00634D]">
                    {' '}
                    Cvv{' '}
                    </label>
                    <div className="mt-2">
                    <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        id='cvv'
                        name='cvv'
                        type="password"
                        value={payment.cvv}
                        onChange={handleInputChange}
                        placeholder="CVV"
                        required
                    ></input>
                    </div>
              </div>
              <div>
                    <label htmlFor="" className="text-base font-medium text-[#00634D]">
                    {' '}
                    Expiry{' '}
                    </label>
                    <div className="mt-2">
                    <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        id='expiry'
                        name='expiry'
                        type="date"
                        value={payment.expiry}
                        onChange={handleInputChange}
                        placeholder="Contact Number"
                        required
                    ></input>
                    </div>
              </div>
              <div>
                    <label htmlFor="" className="text-base font-medium text-[#00634D]">
                    {' '}
                    Name on Card{' '}
                    </label>
                    <div className="mt-2">
                    <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        id='name'
                        name='name'
                        type="text"
                        value={payment.name}
                        onChange={handleInputChange}
                        placeholder="Name on Card"
                        required
                    ></input>
                    </div>
              </div>
              <div>
                    <label htmlFor="" className="text-base font-medium text-[#00634D]">
                    {' '}
                    Amount{' '}
                    </label>
                    <div className="mt-2">
                    <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="number"
                        placeholder="5000 Rs"
                        disabled={true}
                    ></input>
                    </div>
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
                        <div>
                        <button type="submit" 
                        className=" bg-[#00634D] rounded-lg hover:bg-[#16473d] focus:bg-[#00634D]
                          text-white font-bold py-2 px-4  focus:outline-none mx-auto
                          focus:shadow-outline">Pay</button>
                    </div>
                  </div>
            </div>
          </form>
              </div>
          </>
          )}
        </div>
      </>
    )
}

export default Payment;