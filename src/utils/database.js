import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  timeout: 15000,
  withCredentials: true
});

export default axiosInstance;
