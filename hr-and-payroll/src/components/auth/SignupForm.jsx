'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toast, useToast } from '../ui/toast';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast, showToast, hideToast } = useToast();

  const router = useRouter();

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Check if response is ok before parsing JSON
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Network error or server not responding' }));
        const errorMessage = errorData.message || `Server error: ${response.status}`;
        showToast(errorMessage, 'error');
        setError(errorMessage);
        return; // Stop execution here
      }

      const data = await response.json();

      // Store token in localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      showToast('Signup successful! Redirecting to login...', 'success');

      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push('/login');
      }, 1000);
    } catch (err) {
      // More specific error messages
      let errorMessage = 'An error occurred during signup';
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        errorMessage = 'Cannot connect to server. Please make sure the backend server is running on port 5000.';
      } else {
        errorMessage = err.message || errorMessage;
      }
      setError(errorMessage);
      showToast(errorMessage, 'error');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    setLoading(true);

    try {
      // For Google OAuth, you would typically use a library like @react-oauth/google
      // For now, this is a placeholder that shows the structure
      // You'll need to implement Google OAuth on the frontend first
      console.log('Google signup attempt');
      
      // Example: After getting Google user data, send to backend
      // const response = await fetch(`${API_BASE_URL}/api/auth/google-signup`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     email: googleUser.email,
      //     googleId: googleUser.id,
      //     fullName: googleUser.name,
      //     profileImage: googleUser.picture,
      //   }),
      // });

      // For demo purposes, show a message
      setError('Google signup is not fully implemented yet. Please use email signup.');
      setLoading(false);
    } catch (err) {
      setError(err.message || 'An error occurred during Google signup');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full space-y-6">
        {/* Logo */}
        <div className="flex justify-start">
          <div className="w-[40px] h-[40px] flex items-start justify-start ">
            <svg fill="none" height="52" viewBox="0 0 32 32" width="52" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.8571 0H9.14286C4.0934 0 0 4.0934 0 9.14286V22.8571C0 27.9066 4.0934 32 9.14286 32H22.8571C27.9066 32 32 27.9066 32 22.8571V9.14286C32 4.0934 27.9066 0 22.8571 0Z" fill="#06B58B"></path>
              <path d="M9.70274 25.1431L8.15991 23.4517C10.3199 21.4974 13.097 20.4116 15.9885 20.4116C18.8799 20.4116 21.6685 21.4859 23.8171 23.4517L22.2742 25.1431C20.537 23.5659 18.3085 22.6973 15.9885 22.6973C13.6685 22.6973 11.4285 23.5659 9.69137 25.1431H9.70274Z" fill="white"></path>
              <path d="M17.0514 6.85742H10.3542V9.14314H17.0514C18.3086 9.14314 19.3372 10.1717 19.3372 11.4289V13.5545C19.3372 14.8117 18.3086 15.8403 17.0514 15.8403H14.9257C13.6685 15.8403 12.64 14.8117 12.64 13.5545V12.1145H10.3542V13.5545C10.3542 16.0803 12.4 18.126 14.9257 18.126H17.0514C19.5772 18.126 21.6229 16.0803 21.6229 13.5545V11.4289C21.6229 8.90314 19.5772 6.85742 17.0514 6.85742Z" fill="white"></path>
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="text-start">
          <h2 className="text-[20px] font-bold text-gray-900 mb-2">Sign up to create your Frappe HR site</h2>
          <p className="text-[16px] text-gray-600">Get started and explore the easiest way to use Frappe HR</p>
        </div>

        {/* Signup Form Card */}
        <div className=" rounded-lg  space-y-6">
          {/* Google Signup Button */}
          <button 
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-[380px] flex justify-center items-center py-1 px-2  rounded-lg text-sm font-medium text-gray-900 bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Email Signup Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="block w-[380px] px-3 py-1 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm"
                placeholder="johndoe@mail.com"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-1">
                Password *
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="block w-[380px] px-3 py-1 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm"
                placeholder="Enter your password"
                required
                minLength={6}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-1 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing up...' : 'Sign up with email'}
            </button>
          </form>

          {/* Terms and Login Link */}
          <div className="space-y-3 text-center">
            <p className="text-xs text-gray-600">
              By signing up, you agree to our{' '}
              <a href="#" className="underline text-gray-900 hover:text-gray-700">
                Terms & Policies
              </a>
            </p>
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="underline text-gray-900 hover:text-gray-700 font-medium">
                Log in.
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        toast={toast}
        onClose={hideToast}
      />
    </div>
  );
}
