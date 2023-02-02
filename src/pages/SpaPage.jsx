import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthUser from '../hooks/useAuthUser';

import MainLayout from '../layout/MainLayout';
// import LoginPage from '../pages/LoginPage';

function SpaPage() {
  const navigate = useNavigate();
  const user = useAuthUser();
  console.log(user);

  useEffect(() => {
    if (!user) {
      console.log('run once');
      navigate('/');
    }
  }, []);

  // return <p>SPA PAGE</p>;

  // console.log('on spa');
  // console.log('on protected routes');
  // const { isLoggedIn } = store.getState().auth;
  // console.log('isLoggedIn: ' + isLoggedIn);

  return <MainLayout user={user || ''}></MainLayout>;
  // return (
  //   <>
  //     {isLoggedIn && <MainLayout />}
  //     {!isLoggedIn && <LoginPage />}
  //   </>
  // );
}

export default SpaPage;
