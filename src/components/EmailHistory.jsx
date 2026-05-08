import React, { useState, useEffect } from 'react';
import './EmailHistory.css';

const EmailHistory = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    // Load sent emails from localStorage
    const sentEmails = JSON.parse(localStorage.getItem('sentEmails') || '[]');
    setEmails(sentEmails.reverse()); // Show newest first
  }, []);

  return (
    <div className="email-history-container">
      <div className="email-history-card">
        <h1>📧 Email Confirmation History</h1>
        <p>Emails sent from your loan applications</p>
        
        {emails.length === 0 ? (
          <div className="no-emails">
            <p>No emails sent yet.</p>
            <p>Apply for a loan to receive email confirmations.</p>
          </div>
        ) : (
          <div className="email-list">
            {emails.map((email, index) => (
              <div key={index} className="email-item">
                <div className="email-icon">📧</div>
                <div className="email-details">
                  <div className="email-to">To: {email.to}</div>
                  <div className="email-subject">{email.subject}</div>
                  <div className="email-time">
                    {new Date(email.timestamp).toLocaleString()}
                  </div>
                  <div className="email-loan-id">Loan ID: {email.loanId}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailHistory;
