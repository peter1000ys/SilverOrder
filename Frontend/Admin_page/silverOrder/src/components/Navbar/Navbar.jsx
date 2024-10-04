import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import NavLogo from '../../logo/NavLogo.png';
import useInfoStore from "../../stores/infos.js";

const Navbar = () => {
  const { logout } = useInfoStore();
  return (
    <nav className="navbar-s">
      <div className="navbar-left">
        <div className="navbar-logo">
          <img src={NavLogo} alt="Logo" className="nav-logo" />
        </div>
        <div className="navbar-links">
          <Link to="/silverorder/admin/menu" className="nav-link-s">MENU</Link>
          <Link to="/silverorder/admin/order" className="nav-link-s">ORDER</Link>
          <Link to="/silverorder/admin/review" className="nav-link-s">REVIEW</Link>
          <Link to="/silverorder/admin/dashboard" className="nav-link-s">DASHBOARD</Link>
        </div>
      </div>
      
      <div className="navbar-right">
        <button className="bell-button">
          <i className="fa fa-bell" aria-hidden="true"></i>
        </button>
        <button className="logout-button" onClick={logout}>LOGOUT</button>
      </div>
    </nav>
  );
};

export default Navbar;
