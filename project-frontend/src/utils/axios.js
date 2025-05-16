import axios from "axios";
import { commonLoader } from "./commonEnum";

const axiosServices = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || "localhost:8080/api/",
});

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosServices.interceptors.request.use(
  async (config) => {
    const accessToken = sessionStorage.getItem("serviceToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      !window.location.pathname.includes('/login')
    ) {
      window.location = '/';
    }

    return Promise.reject(
      (error.response && error.response.data) || "Wrong Services"
    );
  }
);

export default axiosServices;


export const fetcherPost = async (args) => {
  commonLoader("show");
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.post(url, { ...config });
  commonLoader("hide");
  return res.data;
};

