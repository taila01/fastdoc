import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const axios: AxiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.method === "put" || config.method === "patch") {
    config.url = config.url?.includes("?") 
      ? `${config.url}&_method=${config.method}` 
      : `${config.url}?_method=${config.method}`;
    config.method = "post";
  }
  return config;
});

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => Promise.reject(error)
);

export default axios;