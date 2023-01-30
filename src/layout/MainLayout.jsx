import React from 'react';
import { Outlet } from 'react-router-dom';
import { store } from '../store/';

import classes from './MainLayout.module.css';
import NavbarLayout from './NavbarLayout';

function MainLayout() {
  const authStore = store.getState().auth;

  return (
    <>
      <main className={classes.gt_spa_container}>
        <NavbarLayout
          isLoggedIn={authStore.isLoggedIn}
          username={authStore.authUser.name}
        ></NavbarLayout>

        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
