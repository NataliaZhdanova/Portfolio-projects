import { NavLink } from 'react-router-dom';

import classes from './NavBar.module.css';

function NavBar() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/applications"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Applications
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/positions"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Positions
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/companies"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Companies
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/logout"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Logout
            </NavLink>
          </li>
          
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;