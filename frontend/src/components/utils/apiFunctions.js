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
