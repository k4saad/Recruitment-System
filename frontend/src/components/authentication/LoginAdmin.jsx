import React, { useState } from 'react'
import logoImage from "../../assets/images/GlobalSmallLogo.png"
import { Link, useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { loginAdmin } from '../utils/apiFunctions'

const  LoginAdmin = () => {

    const [user,setUser] = useState({
        username : "",
        password : ""
    })
    
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate();

  const handleInputChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await loginAdmin(user)
		if (response) {
			const token = response.token
      const decodedUser = jwtDecode(token)
			localStorage.setItem("username", decodedUser.sub)
      localStorage.setItem("jwtToken", token)

            navigate("/admin/client")
            window.location.reload()
        } else {
			setErrorMessage("Invalid username or password. Please try again.")
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
            Sign in to your account
          </h2>
          
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="space-y-5">
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
                  <Link className="text-sm font-TypewcondRegular text-[#00634D] hover:underline"
                    to="/reset-password" >{' '}
                    Forgot password?{' '}
                  </Link>
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
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-[#00634D] hover:bg-[#16473d] focus:bg-[#00634D] px-3.5 py-2.5 font-semibold leading-7 text-[#EFEDE7] "
                >
                  Login 
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default LoginAdmin;