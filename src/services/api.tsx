import axios from "axios";
import qs from "qs";

export const rootURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: rootURL,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

api.interceptors.request.use(
  (config) => {
      const accessToken = localStorage.getItem('@namedida:accessToken');
      
      if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
      }
      
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

export default api;
