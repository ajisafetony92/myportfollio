// ContactPage.jsx
import React, { useState } from 'react';
import './Contact.css'; // Your CSS file

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Simulate API call - Replace with your actual API endpoint
    try {
      // Example fetch request:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
      
    } catch (error) {
      // Error
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>Get in touch with our team</p>
        <p>Get a fast and reliable response to your inquiries</p>
        
        <div className="contact-info">
          <div className="info-item">
            <strong>📍 Address:</strong> ZB11 Bolorunduro, Ilesa,Osun State.
          </div>
          <div className="info-item">
            <strong>📧 Email:</strong> Anthonyolaola@loanapp
          </div>
          <div className="info-item">
            <strong>📞 Phone:</strong> +234 (806) 587-8799
          </div>
          <div className="info-item">
            <strong>🕒 Hours:</strong> Mon-Fri 8am - 4pm EST
          </div>
        </div>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
          
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
          
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message..."
            value={formData.message}
            onChange={handleChange}
            className={errors.message ? 'error' : ''}
          />
          {errors.message && <span className="error-message">{errors.message}</span>}
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={isSubmitting ? 'loading' : ''}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          
          {submitStatus === 'success' && (
            <div className="success-message">
              ✓ Message sent successfully! We'll get back to you soon.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="error-message">
              ✗ Failed to send message. Please try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactPage;