import React from 'react';
import FeatureHeader from './FeatureHeader';
import FeatureSteps from './FeatureSteps';
import { getFeatureConfig } from '../../config/featuresConfig';

export default function FeaturePage({ featureName }) {
  const config = getFeatureConfig(featureName);
  
  if (!config) {
    return <div>Feature not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* All feature content goes here */}
          <FeatureHeader featureName={featureName} />
          <FeatureSteps featureName={featureName} />
          
          {/* Future content can be added here */}
          {/* Example: <NewSection /> */}
        </div>
      </div>
    </div>
  );
}
