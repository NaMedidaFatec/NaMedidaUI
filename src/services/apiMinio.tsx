import axios from "axios";
import qs from "qs";

export const rootURL = process.env.NEXT_PUBLIC_API_URL;

const apiMinio = axios.create({
  baseURL: `${rootURL}/minio`,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
  headers: {
    'Content-Type': 'multipart/form-data;',
    'Access-Control-Allow-Origin': '*',
    'Accept': '*/*'
  },
});

apiMinio.interceptors.request.use(
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

export default apiMinio;
