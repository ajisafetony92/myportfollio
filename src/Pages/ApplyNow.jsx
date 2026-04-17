import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './ApplyNow.css';

function ApplyNow() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        loanAmount: '',
        loanPurpose: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send formData to your backend API
        console.log('Form submitted:', formData);
        // After successful submission, navigate to a confirmation page or reset the form
        navigate('/confirmation'); // Example navigation after submission
    };  

    try {
        const response = await fetch('/api/submit-application', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', 
            body: JSON.stringify({
                amount: formData.loanAmount,
                purpose: formData.loanPurpose,
                duration: formData.loanDuration
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.error || 'Failed to submit application. Please try again.');
            return;

        } 
        alert(data.message || 'Application submitted successfully!');
        navigate('/confirmation'); // Navigate to confirmation page after successful submission
        