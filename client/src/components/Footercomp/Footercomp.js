
import React from 'react';
import './Footercomp.css';

function Footercomp() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2 className="logo-text"><span>Blog</span>App</h2>
          <div className="contact">
            <span><i className="fas fa-phone"></i> &nbsp; +123-456-7890</span>
            <span><i className="fas fa-envelope"></i> &nbsp; info@blogapp.com</span>
          </div>
        </div>

        <div className="footer-section links">
          <h2>Socials</h2>
          <br />
          <ul>
            <li><a href="#">facebook</a></li>
            <li><a href="#">twitter</a></li>
            <li><a href="#">instagram</a></li>
            <li><a href="#">linkedin</a></li>
          </ul>
        </div>

        <div className="footer-section links">
          <h2>Quick Links</h2>
          <br />
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; blogapp.com | Designed by BlogApp Team
      </div>
    </footer>
  );
}

export default Footercomp;
