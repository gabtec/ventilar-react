import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

/* -- Pages -- */
import MainLayout from '../layout/MainLayout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SpaPage from '../pages/SpaPage';
import ProtectedRoutes from '../layout/ProtectedRoutes';
/* -- loaders -- */
import * as authService from '../utils/auth-service';
/* -- actions -- */
import { logoutAction } from '../pages/LogoutPage';

import NotFound from '../pages/Error404';
import OrdersList from '../components/OrdersList';
import OrderCreate from '../components/OrderCreate';
import SpaConsumerAvailableVentsPage from '../pages/SpaConsumerAvailableVentsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/spa',
    element: <SpaPage />,
  },
  // {
  //   path: '/',
  //   element: <HomePage />,
  // },
  // { path: '/login', element: <LoginPage /> },
  // { path: '/logout', action: logoutAction },
  // {
  //   path: '/spa',
  //   // element: <ProtectedRoutes />,
  //   element: <SpaPage />,
  //   children: [
  //     // {
  //     //   path: '',
  //     //   element: <SpaPage />,
  //     //   // loader: authService.checkAuthLoader,
  //     //   children: [
  //     {
  //       index: true,
  //       element: <OrdersList />,
  //     },
  //     {
  //       path: 'ventilators/available/:cat',
  //       element: <SpaConsumerAvailableVentsPage />,
  //     },
  //     {
  //       path: 'orders/new/:cat',
  //       element: <OrderCreate />,
  //     },
  //     //   ],
  //     // },
  //   ],
  // },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
