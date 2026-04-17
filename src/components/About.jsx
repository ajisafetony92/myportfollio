import React from 'react';
import "./About.css";

const About = () => {
  return (
    <div className='about-page'>
      <div className='about-container'>
        <h1>About Us</h1>
        <p>We are a trusted financial platform dedicated to making loan access simple, fast and transparent. Our mission is to empower individuals and businesses with flexible financing options without the hassle of traditional banking bureaucracy.</p>
        <div className='features'>
          <div className='feature'>
            <h3>Fast Approval</h3>
            <p>Get decisions in minutes, not weeks</p>
          </div>
          <div className='feature'>
            <h3>No Hidden Fees</h3>
            <p>100% free to apply - no hidden charges</p>
          </div>
          <div className='feature'>
            <h3>Secure & Private</h3>
            <p>Your data is encrypted and never shared</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;