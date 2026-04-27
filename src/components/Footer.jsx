import React from 'react'; 
import { Link } from 'react-router-dom'; 
import './Footer.css'; 
 
const Footer = () => { 
  return ( 
    <div className="footer"> 
      <div className="footer-container"> 
        <div className="footer-grid"> 
          <div className="footer-brand"> 
            <h2>LoanAptech</h2> 
            <p>Creating amazing digital experiences with modern web technologies. Let's build something great together.</p> 
          </div> 
 
          <div className="footer-links"> 
            <h3>Quick Links</h3> 
            <ul> 
              <li><Link to="/">Home</Link></li> 
              <li><Link to="/services">Services</Link></li> 
              <li><Link to="/contact">Contact</Link></li> 
              <li><Link to="/signup">Sign Up</Link></li> 
            </ul> 
          </div> 
 
          <div className="footer-links"> 
            <h3>Support</h3> 
            <ul> 
              <li><Link to="/blog">Blog</Link></li> 
              <li><Link to="/faq">FAQ</Link></li> 
              <li><Link to="/terms">Terms</Link></li> 
              <li><Link to="/privacy">Privacy</Link></li> 
            </ul> 
          </div> 
 
          <div className="footer-contact"> 
            <h3>Contact Us</h3> 
            <p>?? anthonyolaola@gmail.com</p> 
            <p>?? +234 (806) 587-8877</p> 
            <p>?? ZB11 Bolorunduro, Ilesa, Osun State, Nigeria.</p> 
            <p>Mon-Fri: 9:00 AM - 5:00 PM</p> 
          </div> 
        </div> 
 
        <div className="footer-bottom"> 
The system cannot find the file specified.
        </div> 
      </div> 
    </div> 
  ); 
}; 
 
export default Footer; 
