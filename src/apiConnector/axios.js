import axios from 'axios';
import { isJwtExpired } from 'jwt-check-expiration';

import { store } from '../store/index.jsx';

const token = store.getState().auth.accessToken;

// const controller = new AbortController();

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3002/api',
  // baseURL: 'https://freeapis.gabtec.pt/v1/calendario/feriados',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  // signal: controller.abort(),
});

export const setAuthorizationHeader = function (accessToken) {
  axiosInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${accessToken}`;
};

axiosInstance.interceptors.request.use(async (config) => {
  if (['/auth/login', '/auth/refresh'].includes(config.url)) return config;

  console.log(config);
  console.log(config.headers);
  const token = config.headers['Authorization'].replace('Bearer ', ''); // removes bearer word

  console.log('isExpired is:', isJwtExpired(token));
  // console.log('old token:', token);

  if (isJwtExpired) {
    const acToken = await refresh();
    config.headers.Authorization = `Bearer ${acToken}}`;
    // axios.defaults.headers.common[
    //   'Authorization'
    // ] = `Bearer ${acToken}`;
    console.log('new token:', acToken);
  }

  return config;
});

axiosInstance;

async function refresh() {
  const response = await axiosInstance.get('/auth/refresh', {
    withCredentials: true, // because refresToken is on a httpOnly cookie
  });

  // set accessToken on store
  // store.auth.storeAuthData(response.data.accessToken);
  // return the token, to proceed with current request
  return response.data.accessToken;
}

export default axiosInstance;
