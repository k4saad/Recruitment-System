import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080"
});


// Function to get the JWT token from local storage
const getToken = () => {
    return localStorage.getItem("jwtToken");
};

/* This function login a registered user */
export const loginCandidate = async (user) => {
	try {
		const response = await api.post("/auth/login/candidate", user)
		if (response.status >= 200 && response.status < 300) {
			return response.data
		} else {
			return null
		}
	} catch (error) {
        if(error.response && error.response.data){
            console.error(error.response.data)
        }
        else{
            console.error(error)
        }
		return null
	}
}

/* This function login a registered user */
export const loginClient = async (user) => {
	try {
		const response = await api.post("/auth/login/client", user)
		if (response.status >= 200 && response.status < 300) {
			return response.data
		} else {
			return null
		}
	} catch (error) {
        if(error.response && error.response.data){
            console.error(error.response.data)
        }
        else{
            console.error(error)
        }
		return null
	}
}

export const registerCandidate = async (candidateData) => {
    try {
        const response = await api.post("/auth/register/candidate", candidateData);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            // Extract and return the specific error message from the response body
            throw new Error(error.response.data);
        } else {
            console.error("Registration failed:", error);
            throw error;
        }
    }
};


export const registerClient = async (clientData) => {
    try {
        const response = await api.post("/auth/register/client", clientData);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            // Extract and return the specific error message from the response body
            throw new Error(error.response.data);
        } else {
            console.error("Registration failed:", error);
            throw error;
        }
    }
};


// Function to get the user profile, using the saved JWT token for authorization
export const getUserProfile = async () => {
    try {
        const token = getToken();
        const response = await api.get("/user/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user profile:", error);
        throw error;
    }
};


export const addRequirement = async (username, newRequirement) => {
    try {
        const token = getToken();
        const response = await api.post(`/requirements/${username}`, newRequirement, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to add requirement:", error);
        throw error;
    }
};

// Function to delete room by id
export async function deleteRequirementById(requirementId){
    try {
        const token = getToken();
        const response = await api.delete(`/requirements/${requirementId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Deleting requirement")
    }
}


export async function getAllRequirementsForTable(username){
    try {
        const token = getToken();
        const response = await api.get(`/requirements/table/${username}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Fetching requirements")
    }
}

export async function getAvailableRequirements(username){
    try {
        const token = getToken();
        const response = await api.get(`/requirements/available/${username}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Fetching requirements")
    }
}

export async function getRequirementDetail(requirementId){
    try {
        const token = getToken();
        const response = await api.get(`/requirements/detail/${requirementId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Fetching requirement")
    }
}

export const applyToRequirement = async (username, requirementId) => {
    try {
        const token = getToken();
        const response = await api.post(`/applications/${username}?requirementId=${requirementId}`,{},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Failed to apply:", error.response.data);
            throw new Error(error.response.data); 
        } else {
            console.error("Failed to apply:", error);
            throw error;
        }
    }
};

export async function getCandidateDetails(username){
    try {
        const token = getToken();
        const response = await api.get(`/candidate/${username}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Fetching details")
    }
}

export async function updateCandidateProfile(username, name, contactNumber, resume, medicalReport){
    const formData = new FormData()
    formData.append("name", name)
    formData.append("contactNumber", contactNumber)
    formData.append("resume", resume)
    formData.append("medicalReport", medicalReport)
    try{
        const token = getToken();
        const response = await api.put(`/candidate/${username}`,formData,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    }
    catch (error){
        throw new Error("Error : Updateing profile")
    }
}

export async function getAppliedRequirements(username){
    try {
        const token = getToken();
        const response = await api.get(`/requirements/applied/${username}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Fetching requirements")
    }
}


export async function getAllApplication(username){
    try {
        const token = getToken();
        const response = await api.get(`/applications/${username}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Fetching applications")
    }
}

export async function getApplicationDetail(applicationId){
    try {
        const token = getToken();
        const response = await api.get(`/applications/detail/${applicationId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Fetching application detail")
    }
}

export async function withdrawApplication(applicationId){
    try {
        const token = getToken();
        const response = await api.put(`/applications/withdraw/${applicationId}`,{},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Withdrawing application")
    }
}

export async function acceptOffer(applicationId){
    try {
        const token = getToken();
        const response = await api.put(`/applications/accept/${applicationId}`,{},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Withdrawing application")
    }
}

export async function rejectOffer(applicationId){
    try {
        const token = getToken();
        const response = await api.put(`/applications/reject/${applicationId}`,{},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Rejecting offer")
    }
}

export async function updateAppliedStatus(applicationId){
    try {
        const token = getToken();
        const response = await api.put(`/applications/status/underreview/${applicationId}`,{},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : updating status")
    }
}

export async function getApplicantsByRequirement(requirementId){
    try {
        const token = getToken();
        const response = await api.get(`/applications/requirements/${requirementId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Fetching applications")
    }
}

export async function rejectApplicant(applicationId){
    try {
        const token = getToken();
        const response = await api.put(`/applications/reject/applicant/${applicationId}`,{},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Rejecting application")
    }
}

export async function candidateFit(applicationId){
    try {
        const token = getToken();
        const response = await api.put(`/applications/fit/${applicationId}`,{},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Rejecting application")
    }
}

export async function candidateUnfit(applicationId){
    try {
        const token = getToken();
        const response = await api.put(`/applications/unfit/${applicationId}`,{},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Rejecting application")
    }
}

export async function getApplicantDetailForClient(applicationId){
    try {
        const token = getToken();
        const response = await api.get(`/applications/detail/client/${applicationId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Fetching application detail")
    }
}