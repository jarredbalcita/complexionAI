import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import './Auth.css';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement actual authentication
    console.log('Sign in:', formData);
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <Card className="auth-card" padding="lg">
        <div className="auth-header">
          <div className="auth-logo">✨</div>
          <h1>ComplexionAI</h1>
          <p className="auth-subtitle">Your AI-Powered Skincare Assistant</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button type="submit" variant="primary" fullWidth size="lg">
            Sign In
          </Button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </Card>
    </div>
  );
};

export default SignIn;
