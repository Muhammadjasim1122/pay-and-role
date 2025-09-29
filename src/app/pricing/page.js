'use client';

import React from 'react';

export default function Pricing() {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Pricing Plans</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Starter Plan */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Starter</h3>
            <div className="text-3xl font-bold text-gray-900 mb-4">
              $29<span className="text-lg text-gray-500">/month</span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Up to 50 employees
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Basic HR management
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Employee self-service
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Email support
              </li>
            </ul>
            <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors">
              Get Started
            </button>
          </div>

          {/* Professional Plan */}
          <div className="bg-white rounded-lg shadow-sm border-2 border-blue-500 p-6 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
              Most Popular
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Professional</h3>
            <div className="text-3xl font-bold text-gray-900 mb-4">
              $79<span className="text-lg text-gray-500">/month</span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Up to 200 employees
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Advanced HR features
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Payroll management
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Performance tracking
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Priority support
              </li>
            </ul>
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
              Get Started
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Enterprise</h3>
            <div className="text-3xl font-bold text-gray-900 mb-4">
              $199<span className="text-lg text-gray-500">/month</span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Unlimited employees
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                All features included
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Custom integrations
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Dedicated account manager
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                24/7 phone support
              </li>
            </ul>
            <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800">Can I change plans anytime?</h4>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Is there a free trial?</h4>
              <p className="text-gray-600">We offer a 14-day free trial for all plans with no credit card required.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">What payment methods do you accept?</h4>
              <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
