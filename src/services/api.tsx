import { notifications } from "@mantine/notifications";
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

api.interceptors.response.use((res) => {
  const errors = res.data?.errors;
  validateResponse(errors)
  return res
},(err) => {
  const errors = err.response.data?.errors;
  validateResponse(errors)
  return err
} );


const validateResponse = (errors) => {
  if (errors.length) {
    const message = errors.map(i => typeof i === 'string' ? i : i.message).join(', ')
    notifications.show({
      title: "Erro ao salvar",
      message,
      position: "bottom-left",
      color: "red",
    });
    throw new Error(message)
  }
}

export default api;
