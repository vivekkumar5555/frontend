import React, { useState } from 'react';
import axios from 'axios';
import './SignUpForm.css';
import { useNavigate } from 'react-router-dom';
import { base_auth_url } from '../constant/constant';

interface FormData {
  name: string;
  dob: string;
  email: string;
  otp: string;
}

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    dob: '',
    email: '',
    otp: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.includes('@')) return "Valid email is required";
    if (!formData.dob) return "Date of birth is required";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otpSent) {
      const validationError = validateForm();
      if (validationError) {
        setError(validationError);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.post(
          `${base_auth_url}/signup`, 
          {
            name: formData.name,
            email: formData.email,
            dob: formData.dob
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        setSuccess(true);
        setOtpSent(true);
      } catch (err: any) {
        console.error('Registration error:', err.response?.data);
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      await handleOtpVerification();
    }
  };

  const handleOtpVerification = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(
        `${base_auth_url}/verify`,
        {
          email: formData.email,
          otp: formData.otp
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(response.status)
      setSuccess(true);
      navigate('/home');
    } catch (err: any) {
      console.error('OTP verification error:', err.response?.data);
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(
        `${base_auth_url}/resend-otp`,
        {
          email: formData.email
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      setSuccess(true);
    } catch (err: any) {
      console.error('OTP resend error:', err.response?.data);
      setError(err.response?.data?.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="registration-container">
        <div className='logo'>
          <div className="hd-logo"></div>
        </div>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="signup">
          <h2>Sign up</h2>
            </div>
          <p className="subtitle">Sign up to enjoy the feature of HD</p>

          {!otpSent && (
            <>
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={otpSent}
            />
          </div>

          {otpSent && (
            <>
              <div className="form-group">
                <label>OTP</label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  required
                  maxLength={6}
                />
              </div>
              
              <p className="login-link">
                Didn't receive OTP?{' '}
                <button 
                  type="button" 
                  onClick={handleResendOtp}
                  disabled={loading}
                  className="resend-link"
                >
                  Resend OTP
                </button>
              </p>
            </>
          )}
{success?
          <button type="submit"onClick={handleOtpVerification} disabled={loading} className="submit-btn">
            verify OTP
          </button>:
          <button type="submit" onClick={handleSubmit} disabled={loading} className="submit-btn">Get OTP</button>
}

          {error && <div className="error-message">{error}</div>}
          {success && !error && otpSent && (
            <div className="otp-message">OTP sent successfully!</div>
          )}

          <p className="login-link">
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </form>
      </div>
      <div className='sideimage'></div>
    </div>
  );
};

export default RegistrationForm;
