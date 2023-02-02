import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

/* -- Main Pages -- */
import HomePage from '../pages/HomePage';
import SpaPage from '../pages/SpaPage';
import NotFound from '../pages/Error404';

/* -- SPA Sub Pages -- */
import OrdersList from '../components/OrdersList';
import OrderCreate from '../components/OrderCreate';
import SpaConsumerAvailableVentsPage from '../pages/SpaSubPages/SpaConsumerAvailableVentsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/spa',
    element: <SpaPage />,
    children: [{ index: true, element: <p>Lista conforme o role</p> }],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
