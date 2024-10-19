import React from 'react';
import './Header.css';
import logo from '../assets/logo.png';
import Dropdown from './Dropdown'
import { Link } from 'react-router-dom'; // Step 1: Import Link from react-router-dom

const Header = () => {
  return (
    <header className="header">
    <div className="container">
      <div className="header-row">
    <div className="header-left">
    <img src={logo} alt="logo" /> 
      <ul className="nav-links">
        <li className="nav-item"><Link to="/design">Design</Link></li>
        <li className="nav-item"><Link to="/">Credentials</Link></li>
        <li className="nav-item"><Link to="/pathways">Pathways</Link></li>
      </ul>
    </div>
    <div className="header-right">
      <button className="help-button">Help</button>
      <div className="profile-menu">
     <Dropdown />
      </div>
    </div>
    </div>
    </div>
  </header>
  )
}

export default Header
