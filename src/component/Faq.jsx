import React from 'react';
import "./Faq.css";

 export default function Faq() {
    return (
        <div className="faq-page">
            <div className="faq-container">
                <h1>Frequently Asked Questions (FAQ)</h1>
                <div className="faq-subtitle">
                    <p>Find answers to common questions about our services.</p>
                </div>  
                <div className="faq-list">
                    <details className="faq-item">
                        <summary>How does LoanAptech work?</summary>
                        <p>LoanAptech provides a platform for users to apply for loans and manage their financial needs.</p>
                    </details>
                    </div>
                    <div className="faq-list">
                        <details className="faq-item">
                        <summary>What types of loans do you offer?</summary>
                        <p>We offer a variety of loan products, including personal loans, business loans, and more. Please visit our Apply Now page for details.</p>
                    </details>
                    </div>
                    <div className="faq-list">
                        <details className="faq-item">
                        <summary>How can I apply for a loan?</summary>
                        <p>You can apply for a loan by visiting our website and filling out the application form. Our team will review your application and contact you with further instructions.</p>
                    </details>
                    </div>
                    <div className="faq-list">
                        <details className="faq-item">
                        <summary>What are the eligibility criteria for a loan?</summary>
                        <p>Eligibility crit`eria may vary based on the type of loan. Generally, you must be at least 18 years old, have a stable income, and meet our credit requirements.</p>
                    </details>
                    </div> 
                    <div className="faq-list">
                        <details className="faq-item">
                        <summary>How long does it take to get approved for a loan?</summary>
                        <p>Loan approval times can vary, but we strive to process applications as quickly as possible. You can expect to receive a response within a few business days.</p>
                    </details>
                    </div>
                    <div className="faq-list"> 
                    <details className="faq-item">
                        <summary>What documents do I need to provide for a loan application?</summary>
                        <p>Required documents may include proof of identity, proof of income, and other financial documents. Our team will provide you with a detailed list of required documents during the application process.</p>
                    </details>
                    </div>
                    
                </div>
            </div>
    
    );
}