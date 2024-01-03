import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import AuthenticationPage, { action as authAction} from "./pages/Authentication.js";
import DashboardPage from './pages/Dashboard.js';
import CompaniesPage, { action as addCompanyAction} from './pages/Companies.js';
import PositionsPage, { action as addPositionAction} from './pages/Positions.js';
import ApplicationsPage, { action as addApplicationAction} from './pages/Applications.js';

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

  },
  {
    path: '/companies',
    element: <CompaniesPage />,
    action: addCompanyAction

  },
  {
    path: '/positions',
    element: <PositionsPage />,
    action: addPositionAction

  },
  {
    path: '/applications',
    element: <ApplicationsPage />,
    action: addApplicationAction

  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
