import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://lsp-micro-spoofout-dashboard-api.btqclk.easypanel.host', // Replace with your Laravel API URL
  timeout: 5000, // Set a timeout if needed
});

export default axiosInstance;