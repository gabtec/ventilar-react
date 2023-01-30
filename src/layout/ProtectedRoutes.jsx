import { Outlet } from 'react-router-dom';
import { store } from '../store/';
import LoginPage from '../pages/LoginPage';

function ProtectedRoutes() {
  console.log('on protected routes');
  const { isLoggedIn } = store.getState().auth;

  return (
    <>
      {isLoggedIn && <Outlet />}
      {!isLoggedIn && <LoginPage />}
    </>
  );
}

export default ProtectedRoutes;
