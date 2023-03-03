import axios from 'axios';
import { isJwtExpired } from 'jwt-check-expiration';

const baseURL = 'http://localhost:3002/api';

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

axiosInstance.defaults.withCredentials = true;

export const setAuthorizationHeader = function (accessToken) {
  axiosInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${accessToken}`;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      console.log('refreshing token ...');

      const resp = await axios.post(`${baseURL}/auth/refresh`, null, {
        withCredentials: true,
      });

      setAuthorizationHeader(resp.data.accessToken);

      error.config.headers.Authorization = `Bearer ${resp.data.accessToken}`;

      return axios(error.config);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
