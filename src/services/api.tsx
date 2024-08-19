import axios from "axios";
import qs from "qs";

export const rootURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: rootURL,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

export default api;
