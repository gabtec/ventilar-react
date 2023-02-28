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
import OrderCreate from '../components/Consumer.Order.Create';
import OrderEdit from '../components/OrderEdit';
import AdminHomeList from '../components/AdminHomeList';
import DispatcherHomeList from '../components/DispatcherHomeList';
import ConsumerHomeList from '../components/ConsumerHomeList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/spa',
    element: <SpaPage />,
    children: [
      // { index: true, element: <InitialListByRole /> },
      {
        path: 'consumer',
        element: <ConsumerHomeList />,
      },
      {
        path: 'admin',
        element: <AdminHomeList />,
      },
      {
        path: 'dispatcher',
        element: <DispatcherHomeList />,
      },
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
