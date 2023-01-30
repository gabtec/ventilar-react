import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import classes from './MainLayout.module.css';

import NavbarLayout from './NavbarLayout';

function MainLayout() {
  // const { name } = useSelector((state) => state.auth.authUser || '');
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoggedIn = true;
  const name = 'John Doe';

  return (
    <>
      <main className={classes.gt_spa_container}>
        <NavbarLayout isLoggedIn={isLoggedIn} username={name}></NavbarLayout>

        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
