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
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.name || !formData.email || !formData.amount || !formData.duration || !formData.purpose) {
          setError("Please fill in all fields");
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

      alert("Loan application submitted successfully!");

      navigate(`/loans/${data.loan._id}`);
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

        <form className="apply-form" onSubmit={handleSubmit}>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Loan Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
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