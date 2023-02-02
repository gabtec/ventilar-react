import React from 'react';

import MainLayout from '../layout/MainLayout';
import LoginPage from '../pages/LoginPage';

import { store } from '../store/';

function SpaPage() {
  console.log('on spa');
  console.log('on protected routes');
  const { isLoggedIn } = store.getState().auth;
  console.log('isLoggedIn: ' + isLoggedIn);

  // return <MainLayout></MainLayout>;
  return (
    <>
      {isLoggedIn && <MainLayout />}
      {!isLoggedIn && <LoginPage />}
    </>
  );
}

export default SpaPage;
