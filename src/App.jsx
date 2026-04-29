import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import './App.css'; 
 
import Homepage from './components/Homepage';
import Navbar from './components/Navbar'; 
import Services from './components/Services'; 
import Contact from './components/Contact'; 
import Signup from './components/Signup';
import Login from './components/Login'; 
import About from './components/About'; 
import Privacy from './components/Privacy'; 
import Terms from './components/Terms'; 
import Faq from './components/Faq';
import Blog from './components/Blog';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer'; 
 
export default function App() { 
  return ( 
    <Router> 
      <div className="App"> 
        <Navbar/>
        <Routes> 
          <Route path="/" element={<Homepage />} /> 
          <Route path="/services" element={<Services />} /> 
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/about" element={<About />} /> 
          <Route path="/privacy" element={<Privacy />} /> 
          <Route path="/terms" element={<Terms />} /> 
          <Route path="/faq" element={<Faq />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes> 
        <Footer /> 
      </div> 
    </Router> 
  ); 
}; 
