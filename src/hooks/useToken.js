import { store } from '../store/index.jsx';

function useToken() {
  const token = store.getState().auth.accessToken;
  return token;
}

export default useToken;
