import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">LoanAptech</div>
          <ul className="nav-menu">
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/loans" className="nav-link">
                Loans
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li>
              <Link to="/reset-password" className="nav-link">
                <button>sign up</button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Welcome to LoanAptech</h1>

        <p className="hero-subtitle">
          Get instant personal loans up to $50,000 with low interest rates and
          flexible repayment options.
        </p>

        <Link to="/apply" className="hero-cta-btn">
          Apply Now, It's Free
        </Link>
      </div>

      {/* Features Grid */}
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Lightning Fast</h3>
          <p className="feature-title">Lightning Fast Approval</p>
          <p>Get decision in under 10 minutes</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📄</div>
          <h3>No Paperwork</h3>
          <p className="feature-title">No Paperwork Required</p>
          <p>100% digital & hassle-free process</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🏆</div>
          <h3>Best Rates</h3>
          <p className="feature-title">Lowest Interest Rates</p>
          <p>Starting from just 8.99% p.a.</p>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="home-links">
        <p>
          Already applied?{" "}
          <Link to="/loan-status" className="home-link">
            Check Loan Status
          </Link>{" "}
          •{" "}
          <Link to="/dashboard" className="home-link">
            Go to Dashboard
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Home;