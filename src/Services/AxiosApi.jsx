// ---------- Import ---------- //
import axios from "axios";
import Cookies from "universal-cookie";

// ---------- Const Variables ---------- //
const baseURL = 'https://yellowgreen-raccoon-480548.hostingersite.com/api';
const cookie = new Cookies();

// ---------- Functions ---------- //
// Set Token
export const setToken = (token) => {
    cookie.set('token', token, { path: '/' });
};
// Get Token
export const getToken = () => {
    return cookie.get('token');
};
export const getMindToken = () => {
    return cookie.get('mind_token');
};
// Delete Token
export const deleteToken = () => {
    cookie.remove('token', { path: '/' });
    localStorage.clear();
    sessionStorage.clear();
};
export const setMindToken = (mind_token) => {
    cookie.set('mind_token', mind_token, { path: '/' });
};

export const RollBackToken = () => {
    setToken(getMindToken());
};
export const setDB = (db_name) => {
    cookie.set('db_name', db_name, { path: '/' });
    axiosInstance.defaults.headers["Database-App"] = db_name;
};

export const getDB = () => {
    return cookie.get('db_name');
};

// Instance From Axios
const axiosInstance = axios.create({
    baseURL: baseURL,
    Accept:'application/json',
    headers:{
    // "Database-App":'community_1',
    "Database-App":getDB(),
    "Content-Type":'multipart/form-data',
    "Accept":'application/json',
    }
});


// Axios Interceptors Request
axiosInstance.interceptors.request.use(
    async config => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers.Accept = 'application/json';
            config.headers["Content-Type"] = 'multipart/form-data';
            config.headers["Database-App"] = getDB(); // Dynamically set db_name on each request

        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Axios Interceptors Response
axiosInstance.interceptors.response.use(
    response => response,
    async error => {      
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry && getToken()) {
            originalRequest._retry = true;
            try {
                // Send the current token in the Authorization header for the refresh request
                const response = await axiosInstance.post('auth/refresh');
                // console.log(response);
                console.log(getToken());
                setToken(response.data.token);
                // console.log(setToken(response.data.token));
                
    
                originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;

                // Update the authorization header and retry the original request
                return axiosInstance(originalRequest);

            } catch (refreshError) {
                console.log(getToken());
                // console.log(refreshError);
            }
        }else if(error.response.status === 460){
            deleteToken();
            localStorage.clear();
            window.location.href = '/login'
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;