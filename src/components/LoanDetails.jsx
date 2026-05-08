import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './LoanDetails.css';

const LoanDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loanDetailsRef = useRef(null);
  
  // Get loan data from navigation state
  const [loanData, setLoanData] = useState(location.state?.loanData);
  const [currentStatus, setCurrentStatus] = useState('pending');
  const [downloading, setDownloading] = useState(false);

  // Simulate status updates (in real app, this would come from backend)
  useEffect(() => {
    if (loanData) {
      // For demo: automatically progress status every 5 seconds
      const statusFlow = ['pending', 'approved', 'disbursed'];
      let currentIndex = 0;
      
      const interval = setInterval(() => {
        if (currentIndex < statusFlow.length - 1) {
          currentIndex++;
          setCurrentStatus(statusFlow[currentIndex]);
        } else {
          clearInterval(interval);
        }
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [loanData]);

  // Function to download PDF
  const downloadPDF = async () => {
    setDownloading(true);
    const element = loanDetailsRef.current;
    
    try {
      // Capture the loan details card as canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Add footer
      const pageCount = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.setTextColor(100);
        pdf.text(
          `Loan Agreement - ${loanData.id} - Page ${i} of ${pageCount}`,
          105,
          287,
          { align: 'center' }
        );
      }
      
      pdf.save(`Loan_Agreement_${loanData.id}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  // If no loan data, show not found
  if (!loanData) {
    return (
      <div className="loan-notfound">
        <div className="notfound-card">
          <h2>🔍 No Loan Application Found</h2>
          <p>Please apply for a loan first to see your details.</p>
          <button onClick={() => navigate('/applyLoan')} className="notfound-btn">
            Apply for Loan
          </button>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#f59e0b';
      case 'approved': return '#10b981';
      case 'disbursed': return '#3b82f6';
      default: return '#64748b';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return '⏳ Pending Review';
      case 'approved': return '✓ Approved';
      case 'disbursed': return '💰 Disbursed';
      default: return status;
    }
  };

  const headerClass = currentStatus === 'approved' || currentStatus === 'disbursed' ? 'approved' : 'rejected';
  const statusText = getStatusText(currentStatus);

  return (
    <div className="details-container">
      <div className="details-card" ref={loanDetailsRef}>
        <div className={`details-header ${headerClass}`}>
          <h1>Loan Application</h1>
          <div className="status-badge">{statusText}</div>
        </div>

        {/* Status Tracker */}
        <div className="status-tracker">
          <div className="status-steps">
            <div className={`status-step ${currentStatus === 'pending' || currentStatus === 'approved' || currentStatus === 'disbursed' ? 'completed' : ''}`}>
              <div className="step-circle">1</div>
              <div className="step-label">Application Submitted</div>
              <div className="step-date">{formatDate(loanData.applicationDate)}</div>
            </div>
            <div className={`status-step ${currentStatus === 'approved' || currentStatus === 'disbursed' ? 'completed' : currentStatus === 'pending' ? 'active' : ''}`}>
              <div className="step-circle">2</div>
              <div className="step-label">Approved</div>
              {currentStatus === 'approved' && <div className="step-date">Just now</div>}
            </div>
            <div className={`status-step ${currentStatus === 'disbursed' ? 'completed' : ''}`}>
              <div className="step-circle">3</div>
              <div className="step-label">Disbursed</div>
              {currentStatus === 'disbursed' && <div className="step-date">Funds transferred</div>}
            </div>
          </div>
        </div>

        <div className="details-id">
          <span>Loan Application ID: </span>
          <span className="id-number">{loanData.id}</span>
        </div>

        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Applicant Name</span>
            <div className="detail-value">{loanData.applicantName}</div>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Loan Amount</span>
            <div className="detail-value detail-amount">{formatCurrency(loanData.amount)}</div>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Tenure</span>
            <div className="detail-value">{loanData.tenure} months</div>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Interest Rate</span>
            <div className="detail-value">{loanData.interestRate}% p.a.</div>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Monthly EMI</span>
            <div className="detail-value">{formatCurrency(loanData.emi)}</div>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Purpose</span>
            <div className="detail-value">{loanData.purpose}</div>
          </div>
        </div>

        <div className="details-section">
          <div className="detail-item details-date">
            <span className="detail-label">Application Date</span>
            <div className="detail-value">{formatDate(loanData.applicationDate)}</div>
          </div>
        </div>

        {/* Loan Agreement Terms */}
        <div className="details-section agreement-section">
          <h3 className="agreement-title">Loan Agreement Terms</h3>
          <div className="agreement-text">
            <p>By accepting this loan, you agree to the following terms:</p>
            <ul>
              <li>The loan amount of {formatCurrency(loanData.amount)} will be disbursed to your registered bank account.</li>
              <li>Monthly EMI of {formatCurrency(loanData.emi)} to be paid on or before the 5th of each month.</li>
              <li>Late payment penalty of 2% per month on outstanding amount.</li>
              <li>Prepayment allowed after 6 months with 1% processing fee.</li>
              <li>This agreement is governed by the laws of India.</li>
            </ul>
            <p className="agreement-signature">Digitally signed by LoanAptech on {formatDate(new Date())}</p>
          </div>
        </div>

        {loanData.remarks && (
          <div className="details-section">
            <span className="detail-label">Remarks / Comments</span>
            <div className="details-text">{loanData.remarks}</div>
          </div>
        )}

        <div className="details-actions">
          <button onClick={() => navigate('/dashboard')} className="btn-dashboard">
            ← Back to Dashboard
          </button>
          <button onClick={downloadPDF} className="btn-pdf" disabled={downloading}>
            {downloading ? '📄 Generating PDF...' : '📄 Download Loan Agreement (PDF)'}
          </button>
          <button onClick={() => navigate('/applyLoan')} className="btn-secondary">
            Apply New Loan
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
