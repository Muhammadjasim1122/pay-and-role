'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toast, useToast } from '../ui/toast';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast, showToast, hideToast } = useToast();
  const router = useRouter();

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Parse response data
      const data = await response.json();

      // Check if response is ok
      if (!response.ok) {
        // Show error toast based on error message
        if (data.message === 'Invalid credentials' || data.message?.includes('Invalid credentials')) {
          showToast('Email or password is incorrect. Please try again.', 'error');
        } else {
          showToast(data.message || `Server error: ${response.status}`, 'error');
        }
        setLoading(false);
        return;
      }

      // Store token and user data in localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      // Show success toast
      showToast('Login successful! Redirecting to dashboard...', 'success');

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push('/dashboard');
        setLoading(false);
      }, 1000);
    } catch (err) {
      // Show error toast
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        showToast('Cannot connect to server. Please make sure the backend server is running on port 5000.', 'error');
      } else {
        showToast(err.message || 'An error occurred during login', 'error');
      }
      console.error('Login error:', err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-[52px] h-[52px] flex items-center justify-center">
            <svg fill="none" height="52" viewBox="0 0 32 32" width="52" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.8571 0H9.14286C4.0934 0 0 4.0934 0 9.14286V22.8571C0 27.9066 4.0934 32 9.14286 32H22.8571C27.9066 32 32 27.9066 32 22.8571V9.14286C32 4.0934 27.9066 0 22.8571 0Z" fill="#06B58B"></path>
              <path d="M9.70274 25.1431L8.15991 23.4517C10.3199 21.4974 13.097 20.4116 15.9885 20.4116C18.8799 20.4116 21.6685 21.4859 23.8171 23.4517L22.2742 25.1431C20.537 23.5659 18.3085 22.6973 15.9885 22.6973C13.6685 22.6973 11.4285 23.5659 9.69137 25.1431H9.70274Z" fill="white"></path>
              <path d="M17.0514 6.85742H10.3542V9.14314H17.0514C18.3086 9.14314 19.3372 10.1717 19.3372 11.4289V13.5545C19.3372 14.8117 18.3086 15.8403 17.0514 15.8403H14.9257C13.6685 15.8403 12.64 14.8117 12.64 13.5545V12.1145H10.3542V13.5545C10.3542 16.0803 12.4 18.126 14.9257 18.126H17.0514C19.5772 18.126 21.6229 16.0803 21.6229 13.5545V11.4289C21.6229 8.90314 19.5772 6.85742 17.0514 6.85742Z" fill="white"></path>
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Login to Frappe</h2>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-lg shadow-sm p-10">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-9 pr-3 py-1  rounded-[10px] bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm"
                  placeholder="jane@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-9 pr-16 py-1  rounded-[10px] bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm"
                  placeholder="Password"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 hover:text-gray-700 text-xs"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-1 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Separator */}
          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                {/* <div className="w-full bord" /> */}
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
          </div>

          {/* Alternative Login Options */}
          <div className="mt-4 space-y-2">
            <button className="w-full flex justify-center items-center py-1 px-4 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
              Login with Frappe Cloud
            </button>

            <button className="w-full flex justify-center items-center py-1 px-4 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
              Login with Email Link
            </button>
          </div>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="text-gray-900 hover:text-gray-700 font-medium underline">
                Sign up
              </a>
            </p>
          </div>
        </div>

        {/* Toast Notification */}
        <Toast 
          toast={toast} 
          onClose={hideToast} 
        />
      </div>
    </div>
  );
}
