import React from 'react';
import { getFeatureConfig } from '../../config/featuresConfig';

export default function FeatureHeader({ featureName }) {
  const config = getFeatureConfig(featureName);
  
  if (!config) {
    return <div>Feature not found</div>;
  }

  const scrollToSection = (stepId) => {
    const element = document.getElementById(`step-${stepId}`);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="mb-8">
      <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">FEATURES</p>
      <h1 className="text-2xl md:text-3xl text-black-900 mb-4 font-Newsreader">
        {config.title}
      </h1>
      
      {/* Content Section */}
      <div className="max-w-[580px] mx-auto text-left">
        <p className="text-sm text-black-700 leading-relaxed mb-[60px]">
          {config.description}
        </p>

        <hr className="w-full max-w-[580px] border-gray-300 mb-10"/>

        {/* Numbered List - Navigation Links */}
        <div className="space-y-0 mb-10">
          {config.steps.map((step) => (
            <div key={step.id} className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors" onClick={() => scrollToSection(step.id)}>
              <span className="text-gray-500 text-sm font-medium mr-3 mt-0.5">{step.id}.</span>
              <p className="text-black-700 text-sm hover:border-b hover:border-gray-400">{step.heading}</p>
            </div>
          ))}
        </div>
        <hr className="w-full max-w-[580px] border-gray-300 mb-10"/>
      </div>
    </div>
  );
}
