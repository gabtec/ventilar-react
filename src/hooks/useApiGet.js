import { store } from '../store';

function useApiGet(url) {
  console.log('inside custom hook');
  const token = store.getState().auth.accessToken;

  return fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => {
      const data = resp.json();
      console.log(data);

      const isEmpty = data.length > 0 ? false : true;
      return [isEmpty, data, null];
      // return Promise.resolve([isEmpty, data, null]);
    })
    .catch((error) => {
      console.log(error.message);
      return [true, null, error.message];
      // return Promise.reject([true, null, error.message]);
    });
}

export default useApiGet;
