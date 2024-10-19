import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css';

const Footer = () => {
  return (
    <div>
       <footer className="footer">
    <div className="footer-content">
      <ul className="footer-links">
        <li className="footer-item"><Link to="/">About</Link></li>
        <li className="footer-item"><Link to="/">Privacy Policy</Link></li>
        <li className="footer-item"><Link to="/">Terms of Use</Link></li>
      </ul>
      <p className="footer-text">© 2024 DLT Science Foundation. All rights reserved.</p>
    </div>
  </footer>
    </div>
  )
}

export default Footer
