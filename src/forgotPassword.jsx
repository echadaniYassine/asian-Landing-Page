import React, { useState } from 'react';
import axios from 'axios';
import './forgotPassword.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isVerificationCode, setIsVerificationCode] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [enteredCode, setEnteredCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await axios.post('https://auth-service-flax.vercel.app', { email });
      setMessage(response.data.message || 'Verification code sent to your email.');
      setIsError(false);
      setResetToken(response.data.resetToken); // Store reset token from the backend
      setIsVerificationCode(true); // Move to verification code step
    } catch (error) {
      console.error('Error during password reset:', error);
      setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
      setIsError(true);
    }
  };

  const handleVerificationCodeSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    if (enteredCode.trim() === '') {
      setMessage('Please enter the verification code.');
      setIsError(true);
      return;
    }

    // Proceed to reset password form if the code is entered
    setIsVerificationCode(false);
    setIsResetPassword(true);
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false); // Reset the error state

    try {
      const response = await axios.post(`https://auth-service-flax.vercel.app/${resetToken}`, {
        newPassword,
        verificationCode: enteredCode // Pass entered verification code along with the new password
      });

      if (response.data.message === 'Password reset successfully') {
        setShowSuccessModal(true); // Show success modal after successful password reset
      } else {
        setMessage(response.data.message);
        setIsError(true);
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      if (error.response && error.response.data.message === 'Invalid or expired password reset token') {
        setMessage('The password reset token is invalid or expired.');
      } else {
        setMessage('An error occurred. Please try again.');
      }
      setIsError(true);
    }
  };

  return (
    <div className="container-forget">
      {!isVerificationCode && !isResetPassword ? (
        <>
          <h2>Forgot Password</h2>
          <form onSubmit={handleForgotPasswordSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input type="submit" value="Reset Password" />
          </form>
        </>
      ) : null}

      {isVerificationCode && !isResetPassword ? (
        <>
          <h3>Enter Verification Code</h3>
          <form onSubmit={handleVerificationCodeSubmit}>
            <input
              type="text"
              placeholder="Enter verification code"
              value={enteredCode}
              onChange={(e) => setEnteredCode(e.target.value)}
              required
            />
            <input type="submit" value="Verify Code" />
          </form>
        </>
      ) : null}

      {isResetPassword ? (
        <>
          <div className='container-reset'>
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPasswordSubmit}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <i
                className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle`}
                onClick={() => setShowPassword(!showPassword)}
              />
              <input type="submit" value="Save" />
            </form>
          </div>
        </>
      ) : null}

      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Your password has been changed successfully!</h3>
            <button onClick={() => window.location.href = '/login'}>Back to Login</button>
          </div>
        </div>
      )}

      {message && <p className={`message ${isError ? 'error' : 'success'}`}>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
