import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import AuthenticationPage, { action as authAction } from "./pages/Authentication.js";
import DashboardPage from './pages/Dashboard.js';
import CompaniesPage from './pages/CompaniesPage.js';
import PositionsPage, { action as addPositionAction } from './pages/Positions.js';
import ApplicationsPage, { action as addApplicationAction } from './pages/Applications.js';
import { action as logout } from './pages/Logout.js';

import { checkAuthLoader } from './utils/auth.js';

const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthenticationPage />,
      action: authAction

    },
    {
      path: '/auth',
      element: <AuthenticationPage />,
      action: authAction
    },
    {
      path: '/dashboard',
      element: <DashboardPage />,
      loader: checkAuthLoader,
    },
    {
      path: '/companies',
      element: <CompaniesPage />,
      loader: checkAuthLoader,
      
    },
    {
      path: '/positions',
      element: <PositionsPage />,
      action: addPositionAction,
      loader: checkAuthLoader,

    },
    {
      path: '/applications',
      element: <ApplicationsPage />,
      action: addApplicationAction,
      loader: checkAuthLoader,

    },
    {
      path: '/logout',
      action: logout
    },
  ]);
  

function App() {
  return (
    <RouterProvider router={router} />
  );

}

export default App;
