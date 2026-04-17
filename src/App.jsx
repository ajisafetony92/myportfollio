import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import About from './components/About';
import Privacy from './components/Privacy';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Terms from './components/Terms';
import Faq from './components/Faq';




export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="Faq" element={<Faq />} />

        </Routes>


        <Footer />
      </div>
    </Router>
  );
};