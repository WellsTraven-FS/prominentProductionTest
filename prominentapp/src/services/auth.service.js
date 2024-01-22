import axios from "axios";

// const API_BASE =
//     process.env.NODE_ENV === "development"
//         ? "http://localhost:4000/api/v1"
//         : process.env.REACT_APP_BASE_URL;

// const API_BASE = process.env.REACT_APP_MY_URL;

const SCHEME = process.env.REACT_APP_SCHEME;
const SERVER = process.env.REACT_APP_SERVER;
const PORT = process.env.NODE_ENV === "development" ? "4000" : process.env.PORT;
const API_URL = process.env.REACT_APP_API_URL + "/auth";

const API_BASE = SCHEME + SERVER + PORT + API_URL;
console.log(API_BASE);
console.log(process.env.NODE_ENV);
const signup = (email, password) => {
    return axios
        .post(`${API_BASE}/`, {
            email,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const login = (email, password) => {
    return axios
        .post(`${API_BASE}/signin`, {
            email,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const authService = {
    signup,
    login,
    logout,
    getCurrentUser,
};

export default authService;
