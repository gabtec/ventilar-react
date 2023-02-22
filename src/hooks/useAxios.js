// creadits: https://github.com/gitdagray/react_hooks_axios/blob/main/src/hooks/useAxios.js

import axios from 'axios';

import { store } from '../store/index.jsx';
import { useState, useEffect } from 'react';

const useAxios = (configObj) => {
  // create custoim instance
  const token = store.getState().auth.accessToken;
  console.log('in useAxios');
  console.log(token);
  const axiosInstance = axios.create({
    baseUrl: 'http://localhost:3002/api',
    // baseUrl: `https://freeapis.gabtec.pt/v1/calendario/feriados/${url}`,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Accept: 'application/json; charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
  });

  // use it with a custom hook

  const { method, url, requestConfig = {} } = configObj;

  const [response, setResponse] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);

  const refetch = () => setReload((prev) => prev + 1);

  useEffect(() => {
    //let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
          signal: controller.signal,
        });
        console.log(res);
        setResponse(res.data);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // call the function
    fetchData();

    // useEffect cleanup function
    return () => controller.abort();

    // eslint-disable-next-line
  }, [reload]);

  return [response, error, loading, refetch];
};

export default useAxios;
