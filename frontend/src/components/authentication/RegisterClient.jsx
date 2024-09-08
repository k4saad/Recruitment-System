import React, { useState } from 'react'
import logoImage from "../../assets/images/GlobalSmallLogo.png"
import { Link, useNavigate } from 'react-router-dom'
import { registerClient } from '../utils/apiFunctions'

export function RegisterClient() {

  const [user,setUser] = useState({
    name : "",
    organizationName : "",
    contactNumber : "",
    email : "",
    username : "",
    password : ""
  })

  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const navigate = useNavigate();

  const handleInputChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}

  const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await registerClient(user)
			setSuccessMessage(response)
			setErrorMessage("")
			setUser({ name : "",organizationName : "", contactNumber : "", email : "", username : "", password : "" })
      setTimeout(() => {
        navigate("/login/client")
        window.location.reload()
      }, 2000)
		} catch (error) {
			setSuccessMessage("")
			setErrorMessage(`Registration error : ${error.message}`)
		}		
	}

  return (
    <section >
      <div className="flex items-center justify-center my-10">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
        <div className="mb-2 flex justify-center">
            <img
                src={logoImage}
                alt="Global Logo"
                width="100"
                height="100"
            />
        </div>
          <h2 className="text-center text-2xl font-LakesNeueDemiBold leading-tight text-[#00634D]">
          Sign up to create account
          </h2>
          <p className="mt-2 text-center text-sm font-TypewcondRegular text-gray-600 ">
            Already have an account?{' '}
            <Link
              to="/login/candidate"
              className="font-TypewcondRegular font-semibold text-[#00634D] transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="space-y-5">
                <div>
                    <label htmlFor="" className="text-base font-medium text-[#00634D]">
                    {' '}
                    Full Name{' '}
                    </label>
                    <div className="mt-2">
                    <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        id='name'
                        name='name'
                        type="text"
                        value={user.name}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        required
                    ></input>
                    </div>
              </div>
                <div>
                    <label htmlFor="" className="text-base font-medium text-[#00634D]">
                    {' '}
                    Organization Name{' '}
                    </label>
                    <div className="mt-2">
                    <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        id='organizationName'
                        name='organizationName'
                        type="text"
                        value={user.organizationName}
                        onChange={handleInputChange}
                        placeholder="Organization Name"
                        required
                    ></input>
                    </div>
              </div>
              <div>
                    <label htmlFor="" className="text-base font-medium text-[#00634D]">
                    {' '}
                    Contact Number{' '}
                    </label>
                    <div className="mt-2">
                    <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        id='contactNumber'
                        name='contactNumber'
                        type="tel"
                        value={user.contactNumber}
                        onChange={handleInputChange}
                        placeholder="Contact Number"
                        required
                    ></input>
                    </div>
              </div>
              <div>
                    <label htmlFor="" className="text-base font-medium text-[#00634D]">
                    {' '}
                    Email{' '}
                    </label>
                    <div className="mt-2">
                    <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        id='email'
                        name='email'
                        type="text"
                        value={user.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        required
                    ></input>
                    </div>
              </div>
              <div>
                <label htmlFor="" className="text-base font-medium text-[#00634D]">
                  {' '}
                  Username{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    id="username"
                    name="username" 
                    type="username"
                    value={user.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    required
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-[#00634D]">
                    {' '}
                    Password{' '}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={handleInputChange}
                    type="password"
                    placeholder="Password"
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
                successMessage && 
                <p className="mt-2 text-center text-sm font-TypewcondRegular text-gray-600 ">
                {successMessage}
              </p>
              }
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-[#00634D] hover:bg-[#16473d] focus:bg-[#00634D] px-3.5 py-2.5 font-semibold leading-7 text-[#EFEDE7] "
                >
                  Create Account 
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
