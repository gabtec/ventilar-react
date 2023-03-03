import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useAuthUser from '../hooks/useAuthUser';

import classes from '../layout/MainLayout.module.css';
import NavbarLayout from '../layout/NavbarLayout';
import NotFound from './Error404';

function SpaPage() {
  const navigate = useNavigate();
  const user = useAuthUser();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return <NotFound />;
    }
    if (user.role === 'admin') {
      navigate('/spa/admin');
    }
    if (user.role === 'dispatcher') {
      navigate('/spa/dispatcher');
    }
    if (user.role === 'consumer') {
      navigate('/spa/consumer');
    }
  }, []);

  return (
    <>
      <main className={classes.gt_spa_container}>
        <NavbarLayout username={user.name}></NavbarLayout>

        <div className="columns is-centered pt-5">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default SpaPage;
