import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

/* -- Main Pages -- */
import HomePage from '../pages/HomePage';
import SpaPage from '../pages/SpaPage';
import { logoutAction } from '../pages/LogoutPage';
import NotFound from '../pages/Error404';

/* -- SPA Sub Pages -- */
import InitialListByRole from '../pages/SpaSubPages/InitialListByRole';
import AvailableVentilatorsList from '../pages/SpaSubPages/AvailableVentilatorsList';
import OrderCreate from '../components/OrderCreate';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/spa',
    element: <SpaPage />,
    children: [
      { index: true, element: <InitialListByRole /> },
      {
        path: 'ventilators/available/:cat',
        element: <AvailableVentilatorsList />,
      },
      { path: 'orders/create/:cat', element: <OrderCreate /> },
    ],
  },
  {
    path: '/logout',
    action: logoutAction,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
