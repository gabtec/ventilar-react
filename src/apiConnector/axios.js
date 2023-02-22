import axios from 'axios';
import { isJwtExpired } from 'jwt-check-expiration';

// import { store } from '../store/index.jsx';

// const token = store.getState().auth.accessToken;

// const controller = new AbortController();

const baseURL = 'http://localhost:3002/api';
const axiosInstance = axios.create({
  baseURL: baseURL,
  // baseURL: 'https://freeapis.gabtec.pt/v1/calendario/feriados',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },

  // signal: controller.abort(),
});

axiosInstance.defaults.withCredentials = true;

export const setAuthorizationHeader = function (accessToken) {
  axiosInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${accessToken}`;
};

// axiosInstance.interceptors.request.use(async (req) => {
//   // console.log('on interceptor');
//   // console.log(req.url);

//   // if (['/auth/login', '/auth/refresh'].includes(req.url)) return req;
//   if (req.url === '/auth/login') return req;

//   // NUNCA intercepta '/auth/refresh') pq e chamado dentro do intercepotr

//   const token = req.headers['Authorization'].replace('Bearer ', ''); // removes bearer word
//   // console.log('Bearer is: ', token);

//   const isExpired = isJwtExpired(token);

//   if (!isExpired) return req;

//   console.log('intercepted: ', req.url);

//   console.log('isExpired is:', isExpired);
//   console.log('Must refresh token...');

//   try {
//     // const acToken = await refresh();
//     const data = await axios.post(
//       `${baseURL}/auth/refresh`,
//       { actionIs: 'refresh' },
//       {
//         withCredentials: true, // como é uma instancia nova do axios nunca recebeu o cookie
//         headers: req.headers,
//       }
//     );

//     console.log(data);
//     console.log('new acess token:', data.accessToken);
//     req.headers.Authorization = `Bearer ${data.accessToken}`;
//     setAuthorizationHeader(data.accessToken);
//     return req;
//   } catch (error) {
//     console.error('refresh falhou');
//     console.log(error);
//     // return req;
//   }

//   // return req;
// });

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const resp = await axios.post(`${baseURL}/auth/refresh`, null, {
        withCredentials: true,
      });
      console.log(resp.data.accessToken);
      console.log(error.config);
      setAuthorizationHeader(resp.data.accessToken);
      // axiosInstance.defaults.Authorization = `Bearer ${resp.data.accessToken}`;
      // error.config.Authorization = `Bearer ${resp.data.accessToken}`;
      error.config.headers.Authorization = `Bearer ${resp.data.accessToken}`;

      return axios(error.config);
    }

    return Promise.reject(error);
  }
);
// async function refresh() {
//   try {
//     const response = await axiosInstance.post('/auth/refresh');

//     // set accessToken on store
//     // store.auth.storeAuthData(response.data.accessToken);
//     // return the token, to proceed with current request
//     return response.data.accessToken;
//   } catch (error) {
//     console.log('error from refresh');
//     // i+on error redirect to login
//     return 401;
//   }
// }

export default axiosInstance;
