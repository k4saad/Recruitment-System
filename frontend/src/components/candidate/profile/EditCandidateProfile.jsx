import React, { useEffect, useState } from "react";
import SuccessNotification from "../../common/SuccessNotification";
import { Link, useNavigate } from "react-router-dom";
import { getCandidateDetails, updateCandidateProfile } from "../../utils/apiFunctions";
import ErrorNotification from "../../common/ErrorNotification";

const EditCandidateProfile = () => {
    const [candidate, setCandidate] = useState({
        name : "",
        contactNumber : "",
        resume : null,
        medicalReport : null
    })

    const [resumePreview, setResumePreview] = useState("")
    const [medicalReportPreview, setMedicalReportPreview] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const handleResumeChange = (e) =>{
        const selectedFile = e.target.files[0]
        setCandidate({...candidate, resume : selectedFile})
        setResumePreview(URL.createObjectURL(selectedFile))
    }

    const handleMedicalReportChange = (e) =>{
        const selectedFile = e.target.files[0]
        setCandidate({...candidate, medicalReport : selectedFile})
        setMedicalReportPreview(URL.createObjectURL(selectedFile))
    }

    const handleInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value
        setCandidate({...candidate, [name] : value})
    }

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
            navigate("/login/candidate"); 
            window.location.reload();
        }
        fetchCandidateDetails();
    }, [navigate]);

    const fetchCandidateDetails = async () => {
        setIsLoading(true);
        try {
          const data = await getCandidateDetails(localStorage.getItem("username"));
          setCandidate(data);
          if (data.resume) {
            setResumePreview(`data:application/pdf;base64,${data.resume}`);
        }
        if (data.medicalReport) {
            setMedicalReportPreview(`data:application/pdf;base64,${data.medicalReport}`);
        }
          setIsLoading(false);
        } catch (error) {
          setErrorMessage(error.message);
          setTimeout(() => {
            setErrorMessage("")
           }, 5000);
        }
    };

    const handleNotification = () => {
        setErrorMessage("")
        setSuccessMessage("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await updateCandidateProfile(localStorage.getItem("username"), candidate.name,candidate.contactNumber,candidate.resume,candidate.medicalReport)
            if(response.status === 200){
                setSuccessMessage("Profile updated sucessfully")
                setTimeout(() => {
                    setSuccessMessage("")
                }, 5000);
                const updatedCandidateProfile = await getCandidateDetails(localStorage.getItem("username"));
                setCandidate(updatedCandidateProfile)
                if (data.resume) {
                    setResumePreview(`data:application/pdf;base64,${data.resume}`);
                }
                if (data.medicalReport) {
                    setMedicalReportPreview(`data:application/pdf;base64,${data.medicalReport}`);
                }
                setErrorMessage("")                
            }else{
                setErrorMessage("Error updating profile")
                setTimeout(() => {
                    setErrorMessage("")
                }, 5000);
            }
        } catch (error) {
            console.error(error)
            setErrorMessage(error.message)
            setTimeout(() => {
                setErrorMessage("")
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
            Edit Profile
          </h2>
  
          {isLoading ? (
            <div className="size-fit mx-auto transform translate-x-1/2 translate-y-1/2 ">
              <div className="border-t-transparent border-solid animate-spin  rounded-full border-[#00634D] border-8 h-10 w-10"></div>
            </div>
          ) : (
            <>
            {candidate ? (
              <div className="m-5 font-LakesNeueRegular overflow-hidden rounded-lg border border-gray-200 shadow-md pb-1">
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
                        value={candidate.name}
                        onChange={handleInputChange}
                        placeholder="Full Name"
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
                        value={candidate.contactNumber}
                        onChange={handleInputChange}
                        placeholder="Contact Number"
                        required
                    ></input>
                    </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-[#00634D]">
                    {' '}
                    Resume{' '}
                  </label>
                </div>
                <div className="mt-2">
                    <input 
                        type="file" 
                        name="resume" 
                        id="resume" 
                        className="shadow focus:ring-[#00634D] focus:border-[#00634D] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleResumeChange}
                        />
                    {candidate.resume && (
                            <embed
                                src={resumePreview}
                                width="600"
                                height="500"
                                type="application/pdf"
                            />
                    )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-[#00634D]">
                    {' '}
                    Medical Report{' '}
                  </label>
                </div>
                <div className="mt-2">
                    <input 
                        type="file" 
                        name="medicalReport" 
                        id="medicalReport" 
                        className="shadow focus:ring-[#00634D] focus:border-[#00634D] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleMedicalReportChange}
                        />
                    {candidate.medicalReport && (
                            <embed
                                src={medicalReportPreview}
                                width="600"
                                height="500"
                                type="application/pdf"
                            />
                    )}
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
                          focus:shadow-outline">Update Profile</button>
                    </div>
                  </div>
            </div>
          </form>
              </div>
            ) : (
              <div className="m-5 font-LakesNeueRegular overflow-hidden rounded-lg border border-gray-200 shadow-md pb-1">
                Candidate not found
              </div>
            )}
          </>
          )}
        </div>
      </>
    )
}

export default EditCandidateProfile;