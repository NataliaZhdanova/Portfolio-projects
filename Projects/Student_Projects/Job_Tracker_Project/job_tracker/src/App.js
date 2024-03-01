import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import AuthenticationPage, { action as authAction } from "./pages/Authentication.js";
import DashboardPage from './pages/Dashboard.js';
import CompaniesPage from './pages/CompaniesPage.js';
import PositionsPage from './pages/PositionsPage.js';
import ApplicationsPage from './pages/ApplicationsPage.js';
import CompanyPage from './pages/CompanyPage.js';
import PositionPage from './pages/PositionPage.js';
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
      path: '/companies/:companyId',
      element: <CompanyPage />,
      loader: checkAuthLoader,
    },
    {
      path: '/positions',
      element: <PositionsPage />,
      loader: checkAuthLoader,

    },
    {
      path: '/positions/:positionId',
      element: <PositionPage />,
      loader: checkAuthLoader,

    },
    {
      path: '/applications',
      element: <ApplicationsPage />,
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
