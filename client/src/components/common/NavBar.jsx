import 'babel-polyfill';
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const NavBar = ({ authenticated, logout }) => {
  return (
    <div>
      <nav className="primary-bg-color">
        <div className="nav-wrapper">
          <ul className="left">
            <li>
              <NavLink to="/">My Slate</NavLink>
            </li>
          </ul>
          <ul className="right">

            {!authenticated && <li> <NavLink to="/login" className="black-text">login</NavLink> </li>}
            {authenticated && <li><a href="javascript:void(0);"><button onClick={logout} className="btn-plain black-text">logout</button></a></li>}

          </ul>
        </div>
      </nav>
    </div>
  );
};

//prop types
NavBar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

export default NavBar;