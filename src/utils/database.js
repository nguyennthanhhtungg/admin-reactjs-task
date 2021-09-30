import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  timeout: 5000,
  withCredentials: true
});

export default axiosInstance;
