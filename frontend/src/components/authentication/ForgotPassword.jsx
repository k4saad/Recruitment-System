import React, { useState } from 'react'
import logoImage from "../../assets/images/GlobalSmallLogo.png"
import { useNavigate } from 'react-router-dom'
import { getResetLink } from '../utils/apiFunctions'

const ForgotPassword = () => {
    
    const [email, setEmail] = useState();
    const [errorMessage, setErrorMessage] = useState("")
    const [disabled, setDisabled] = useState(false)
    const [message, setMessage] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage('')
        setDisabled(true)
        try{
            const response = await getResetLink(email)
            setMessage(response.data)
            setTimeout(() => {
                setMessage("")
                navigate(-1)
            }, 5000);
        } catch(error) {
            setErrorMessage('Error sending reset link. Please try again.');
        }
    }

  return (
    <section >
      <div className="flex items-center justify-center my-10">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-LakesNeueDemiBold leading-tight text-[#00634D]">
            Forgot Password
          </h2>
          
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="" className="text-base font-medium text-[#00634D]">
                  {' '}
                  Email{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    id="email"
                    name="email" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required                  
                  ></input>
                </div>
              </div>
              {
                errorMessage && 
                <p className="mt-2 text-center text-sm font-TypewcondRegular text-gray-600 ">
                {errorMessage}
              </p>
              }
              {
                message && 
                <p className="mt-2 text-center text-sm font-TypewcondRegular text-gray-600 ">
                {message}
                </p>
              }
              <div>
                <button
                  type="submit"
                  disabled={disabled}
                  className="inline-flex w-full items-center justify-center rounded-md bg-[#00634D] hover:bg-[#16473d] focus:bg-[#00634D] px-3.5 py-2.5 font-semibold leading-7 text-[#EFEDE7] "
                >
                  Get Link 
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword;