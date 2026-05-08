import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ApplyLoan.css';

const ApplyLoan = () => {
    const navigate = useNavigate();
      const [formData, setFormData] = useState({
        name: "",
        email: "",
        amount: "",
        duration: "",
        purpose: "",
        interestRate: "5"
      });
      const [error, setError] = useState("");
      const [loading, setLoading] = useState(false);
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    
      // Function to send email confirmation
      const sendEmailConfirmation = async (loanData, userEmail, userName) => {
        try {
          // Using EmailJS or a backend endpoint
          // For demo, we'll use a free email service via fetch to a mock endpoint
          // In production, you should set up a proper backend email service
          
          const emailData = {
            to: userEmail,
            subject: `Loan Application Received - ${loanData.id}`,
            name: userName,
            loanId: loanData.id,
            amount: loanData.amount,
            tenure: loanData.tenure,
            interestRate: loanData.interestRate,
            emi: loanData.emi,
            purpose: loanData.purpose,
            applicationDate: loanData.applicationDate,
            status: loanData.status
          };
          
          // For now, we'll simulate email sending
          console.log("Sending email confirmation to:", userEmail);
          console.log("Email data:", emailData);
          
          // Show email preview in console
          console.log(`
            📧 EMAIL CONFIRMATION SENT:
            To: ${userEmail}
            Subject: ${emailData.subject}
            
            Dear ${userName},
            
            Thank you for applying for a loan with LoanAptech!
            
            Your application has been received and is being processed.
            
            Loan Details:
            ---------------
            Application ID: ${loanData.id}
            Loan Amount: ₹${new Intl.NumberFormat('en-IN').format(loanData.amount)}
            Tenure: ${loanData.tenure} months
            Interest Rate: ${loanData.interestRate}% p.a.
            Monthly EMI: ₹${new Intl.NumberFormat('en-IN').format(loanData.emi)}
            Purpose: ${loanData.purpose}
            Application Date: ${loanData.applicationDate}
            Status: ${loanData.status}
            
            You can track your application status on your dashboard.
            
            Thank you for choosing LoanAptech!
            
            Best regards,
            LoanAptech Team
          `);
          
          // Store email record in localStorage for demo
          const sentEmails = JSON.parse(localStorage.getItem('sentEmails') || '[]');
          sentEmails.push({
            to: userEmail,
            subject: emailData.subject,
            timestamp: new Date().toISOString(),
            loanId: loanData.id
          });
          localStorage.setItem('sentEmails', JSON.stringify(sentEmails));
          
          return true;
        } catch (error) {
          console.error("Failed to send email:", error);
          return false;
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.name || !formData.email || !formData.amount || !formData.duration || !formData.purpose) {
          setError("Please fill in all fields");
          return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          setError("Please enter a valid email address");
          return;
        }

        setLoading(true);

    try {
      const response = await fetch("https://myportfollio-zo2p.onrender.com/api/loans/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          amount: Number(formData.amount),
          duration: Number(formData.duration),
          purpose: formData.purpose,
          interestRate: Number(formData.interestRate)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Application failed");
      }

      // Prepare loan data for email and navigation
      const emi = Math.round((formData.amount * (formData.interestRate/100) / 12) + (formData.amount / formData.duration));
      const loanDataForEmail = {
        id: data.loan._id,
        amount: formData.amount,
        tenure: formData.duration,
        interestRate: formData.interestRate,
        emi: emi,
        purpose: formData.purpose,
        applicationDate: new Date().toISOString().split('T')[0],
        status: "approved"
      };
      
      // Send email confirmation
      await sendEmailConfirmation(
        loanDataForEmail,
        formData.email,
        formData.name
      );
      
      // Show success message with email info
      alert(`✓ Loan application submitted successfully!\n\nA confirmation email has been sent to ${formData.email}\n\nPlease check your inbox (and spam folder) for loan details.`);

      // Navigate to LoanDetails with the loan data
      navigate('/loan-details', { 
        state: { 
          loanData: {
            id: data.loan._id,
            applicantName: formData.name,
            amount: formData.amount,
            tenure: formData.duration,
            interestRate: formData.interestRate,
            emi: emi,
            purpose: formData.purpose,
            applicationDate: new Date().toISOString().split('T')[0],
            status: "approved",
            remarks: "Your loan application has been submitted successfully and is pending approval.",
            email: formData.email
          }
        } 
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="apply-container">
      <div className="apply-card">
        <h1 className="apply-title">Apply for a Loan</h1>
        
        {/* Email notification info */}
        <div className="email-info-banner">
          📧 A confirmation email will be sent to your email address
        </div>

        <form className="apply-form" onSubmit={handleSubmit}>

          {error && <p className="error-message">{error}</p>}

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email (for confirmation)"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <small>We'll send loan confirmation to this email</small>
          </div>

          <div className="input-group">
            <label>Loan Amount (₹)</label>
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Loan Duration (Months)</label>
            <input
              type="number"
              name="duration"
              placeholder="Enter duration in months (e.g., 12, 24, 36)"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Interest Rate (%)</label>
            <input
              type="number"
              name="interestRate"
              placeholder="Enter interest rate (default: 5%)"
              value={formData.interestRate}
              onChange={handleChange}
              step="0.1"
            />
          </div>

          <div className="input-group">
            <label>Purpose of Loan</label>
            <textarea
              name="purpose"
              placeholder="Why do you need this loan?"
              value={formData.purpose}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="apply-submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default ApplyLoan;
