import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

/* -- Main Pages -- */
import LoginPage from '../pages/LoginPage';
import SpaPage from '../pages/SpaPage';
import NotFound from '../pages/Error404';

import { logoutAction } from '../pages/LogoutPage';

/* -- SPA Sub Pages -- */
import InitialListByRole from '../pages/SpaSubPages/InitialListByRole';
import AvailableVentilatorsList from '../pages/SpaSubPages/AvailableVentilatorsList';
import OrderCreate from '../components/OrderCreate';
import OrderEdit from '../components/OrderEdit';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
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
      { path: 'orders/edit/:id', element: <OrderEdit /> },
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
