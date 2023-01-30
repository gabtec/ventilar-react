import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import classes from './MainLayout.module.css';

import NavbarLayout from './NavbarLayout';

function MainLayout() {
  const { name } = useSelector((state) => state.auth.authUser || '');
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const [isLoggedIn, setIsLoggedIn] = useState(true);

  // useEffect(() => {
  //   setIsLoggedIn(status);
  //   se
  // }, [name, status]);

  return (
    <>
      <main className={classes.gt_main_container}>
        <NavbarLayout isLoggedIn={isLoggedIn} username={name}></NavbarLayout>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
