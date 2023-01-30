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
import VentilatorsList from '../components/VentilatorsList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/logout', action: logoutAction },
  {
    path: '/spa',
    element: <ProtectedRoutes />,
    children: [
      {
        path: '',
        element: <SpaPage />,
        // loader: authService.checkAuthLoader,
        children: [
          {
            index: true,
            element: <VentilatorsList />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <MainLayout />,
//     errorElement: <NotFound />,
//     children: [
//       { index: true, element: <HomePage /> },
//       { path: '/login', element: <LoginPage /> },
//       { path: '/logout', action: logoutAction },
//       {
//         path: '/spa',
//         element: <SpaPage />,
//         loader: authService.checkAuthLoader,
//         children: [],
//       },
//     ],
//   },
// ]);

export default router;
