import 'babel-polyfill';
import React from 'react';
import {NavLink} from 'react-router-dom';

const NavBar = (props) => {
  return (
    <div>
      <nav className="primary-bg-color">
        <div className="nav-wrapper">
          <ul className="left">
            <li>
              <NavLink to="/">Slate</NavLink>
            </li>
          </ul>
          <ul className="right">
            <li>
              <NavLink to="/login" className="black-text">logout</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;