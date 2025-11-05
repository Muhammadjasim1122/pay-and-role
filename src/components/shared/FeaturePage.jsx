'use client';

import React from 'react';

export default function FeaturePage({ featureName }) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{featureName}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the powerful features and capabilities of {featureName} in our HR management system.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Feature 1</h3>
            <p className="text-gray-600">Description of the first key feature for {featureName}.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Feature 2</h3>
            <p className="text-gray-600">Description of the second key feature for {featureName}.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Feature 3</h3>
            <p className="text-gray-600">Description of the third key feature for {featureName}.</p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Learn More About {featureName}
          </button>
        </div>
      </div>
    </div>
  );
}
