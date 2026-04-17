import React from "react";
import "./Privacy.css";

function PrivacyPolicy() {
  return (
    <div className="privacy-container">
      <h1>Privacy Policy</h1>
      <p className="last-updated">Last updated: March 2025</p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          This Privacy Policy describes how we collect, use, store, and protect
          personal and financial information when you apply for or use our loan
          services. By using this platform, you consent to the practices
          described in this policy.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <ul>
          <li>Personal details (full name, email address, phone number)</li>
          <li>Identification information required for loan processing</li>
          <li>Financial information (income details, bank account data)</li>
          <li>Loan application and repayment history</li>
          <li>Technical data (IP address, browser type, device information)</li>
        </ul>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To evaluate loan eligibility and creditworthiness</li>
          <li>To process loan applications and repayments</li>
          <li>To verify identity and prevent fraud</li>
          <li>To comply with regulatory and legal obligations</li>
          <li>To communicate important account and loan updates</li>
        </ul>
      </section>

      <section>
        <h2>4. Data Sharing and Disclosure</h2>
        <p>
          We do not sell your personal data. Information may be shared with
          financial institutions, payment processors, credit bureaus, and
          regulatory authorities strictly for loan processing, compliance, and
          fraud prevention.
        </p>
      </section>

      <section>
        <h2>5. Cookies and Tracking</h2>
        <p>
          We use cookies and similar technologies, including secure HTTP-only
          cookies, to manage user sessions, protect accounts, and improve
          platform performance. You may manage cookie preferences through your
          browser settings.
        </p>
      </section>

      <section>
        <h2>6. Data Security</h2>
        <p>
          We apply appropriate technical and organizational security measures to
          protect your personal and financial data. Despite these measures, no
          electronic storage or transmission method is completely secure.
        </p>
      </section>

      <section>
        <h2>7. Data Retention</h2>
        <p>
          We retain personal data only for as long as necessary to fulfill loan
          services, comply with legal requirements, and resolve disputes.
        </p>
      </section>

      <section>
        <h2>8. Your Rights</h2>
        <p>
          Subject to applicable laws, you may request access, correction, or
          deletion of your personal information.
        </p>
      </section>

      <section>
        <h2>9. Contact Us</h2>
        <p>
          If you have questions or concerns regarding this Privacy Policy,
          please contact our support team through the official channels on this
          platform.
        </p>
      </section>
    </div>
  );
}

export default PrivacyPolicy;