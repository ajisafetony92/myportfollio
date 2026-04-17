import React from 'react';
import './Footer.css'; // Assuming your CSS is in Footer.css

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <h2>LoanAptech</h2>
            <p>
              Creating amazing digital experiences with modern web technologies.
              Let's build something great together.
            </p>
          </div>

          {/* Quick Links Section 1 */}
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/Apply now">Apply Now</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Quick Links Section 2 */}
          <div className="footer-links">
            <h3>Support</h3>
            <ul>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <p>📧 anthonyolaola@gmail.com</p>
            <p>📞 +234 (806) 587-8877</p>
            <p>📍 ZB11 Bolorunduro, Ilesa, Osun State,Nigeria.</p>
            <p>Mon-Fri: 9:00 AM - 5:00 PM </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;