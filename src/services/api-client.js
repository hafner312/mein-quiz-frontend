import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Token wird mitgeschickt");
    }

    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.log("Token ungueltig - Logout erforderlich");
        localStorage.removeItem("authToken");
        window.location.href = "/login";
      }

      if (status === 403) {
        console.log("Keine Berechtigung fuer diese Aktion");
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
