import { store } from '../store/index.jsx';

function useAuthUser() {
  const user = store.getState().auth.authUser;
  return user;
}

export default useAuthUser;
