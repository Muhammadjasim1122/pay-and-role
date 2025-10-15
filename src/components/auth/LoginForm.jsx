'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Demo credentials for testing
    const demoCredentials = {
      email: 'admin@frappehr.com',
      password: 'admin123'
    };
    
    console.log('Login attempt:', { email, password });
    
    // Check demo credentials
    if (email === demoCredentials.email && password === demoCredentials.password) {
      // Valid credentials - redirect to dashboard
      router.push('/dashboard');
    } else {
      // Invalid credentials - show error (you can add error state later)
      alert('Invalid credentials! Use:\nEmail: admin@frappehr.com\nPassword: admin123');
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
              className="w-full flex justify-center py-1 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              Login
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

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials:</h3>
            <div className="text-xs text-blue-800 space-y-1">
              <p><strong>Email:</strong> admin@frappehr.com</p>
              <p><strong>Password:</strong> admin123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
