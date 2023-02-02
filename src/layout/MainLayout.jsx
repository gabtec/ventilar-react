import React from 'react';
import { Outlet } from 'react-router-dom';

import classes from './MainLayout.module.css';
import NavbarLayout from './NavbarLayout';

function MainLayout({ user }) {
  return (
    <>
      <main className={classes.gt_spa_container}>
        <NavbarLayout username={user.name}></NavbarLayout>

        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
