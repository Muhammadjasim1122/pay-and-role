'use client';

import React, { useState } from 'react';
import { CheckCircle, Filter, MoreHorizontal, X, Edit3, Plus } from 'lucide-react';
import ModuleSections from '../../shared/ModuleSections';

export default function Website({ 
  shortcuts = null, 
  reportsAndMasters = null,
  moduleTitle = "Let's Set Up Your Website.",
  moduleDescription = "Blogs, Website View Tracking, and more."
}) {
  const [dismissed, setDismissed] = useState(false);
  const [selectedStep, setSelectedStep] = useState('introduction-to-website');

  const setupSteps = [
    {
      id: 'introduction-to-website',
      title: 'Introduction to Website',
      description: 'Learn the basics of setting up and managing your website. Get familiar with the key features and functionality.',
      completed: true,
      hasSkip: true,
      hasExplore: true,
      buttonText: 'Watch Video'
    },
    {
      id: 'create-blogger',
      title: 'Create Blogger',
      description: 'Set up your blog and start publishing content. Create your blogger profile and manage your blog posts.',
      completed: true,
      hasSkip: true,
      hasExplore: true,
      buttonText: 'Create Entry'
    },
    {
      id: 'add-blog-category',
      title: 'Add Blog Category',
      description: 'Organize your blog posts by adding relevant categories. Manage blog categories to improve content organization.',
      completed: true,
      hasSkip: true,
      hasExplore: true,
      buttonText: 'Create Entry'
    },
    {
      id: 'enable-website-tracking',
      title: 'Enable Website Tracking',
      description: 'Enable website tracking to gather analytics and insights into your website\'s performance and visitor behavior.',
      completed: true,
      hasSkip: true,
      hasExplore: true,
      buttonText: 'Update Settings'
    },
    {
      id: 'learn-about-web-pages',
      title: 'Learn about Web Pages',
      description: 'Understand how to create, edit, and manage individual web pages on your site. Learn about page structure and content management.',
      completed: true,
      hasSkip: true,
      hasExplore: true,
      buttonText: 'Show Form Tour'
    }
  ];

  // Default data for Website module
  const defaultShortcuts = [
    { name: 'Blog Post', extra: '0 Published', link: '#' },
    { name: 'Blogger', extra: '0 Active', link: '#' },
    { name: 'Web Page', extra: '0 Published', link: '#' },
    { name: 'Web Form', link: '#' },
    { name: 'Website Settings', link: '#' },
  ];

  const defaultReportsAndMasters = [
    {
      category: 'Setup',
      items: [
        { name: 'Website Settings', link: '#', hasArrow: true },
        { name: 'Website Theme', link: '#', hasArrow: true },
        { name: 'Website Script', link: '#', hasArrow: true },
        { name: 'About Us Settings', link: '#', hasArrow: true },
        { name: 'Contact Us Settings', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Blog',
      items: [
        { name: 'Blog Post', link: '#', hasArrow: true },
        { name: 'Blogger', link: '#', hasArrow: true },
        { name: 'Blog Category', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Web Site',
      items: [
        { name: 'Web Page', link: '#', hasArrow: true },
        { name: 'Web Form', link: '#', hasArrow: true },
        { name: 'Website Sidebar', link: '#', hasArrow: true },
        { name: 'Website Slideshow', link: '#', hasArrow: true },
        { name: 'Website Route Meta', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Portal',
      items: [
        { name: 'Portal Settings', link: '#', hasArrow: true },
      ],
    },
    {
      category: 'Knowledge Base',
      items: [
        { name: 'Help Category', link: '#', hasArrow: true },
      ],
    },
  ];

  // Use provided data or default data
  const yourShortcutsData = shortcuts || defaultShortcuts;
  const reportsAndMastersData = reportsAndMasters || defaultReportsAndMasters;

  const selectedStepData = setupSteps.find(step => step.id === selectedStep);

  return (
    <div className="p-10  bg-gray-50 min-h-full">
      <div className="max-w-6xl mx-auto">
        {/* Main Container with Single Border */}
        <div className="bg-white rounded-lg border border-gray-200 ">
          {/* Header */}
          <div className="flex justify-between items-start p-6 pb-4">
            <div>
              <h1 className="text-1xl font-bold text-gray-900 mb-2">
                {moduleTitle}
              </h1>
              <p className="text-gray-600">{moduleDescription}</p>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Dismiss
            </button>
          </div>

          {/* Two Panel Layout */}
          <div className="grid grid-cols-5 px-6 gap-4">
            {/* Left Panel - Setup Steps List */}
            <div className="col-span-2">
              <div className="">
                {setupSteps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors ${
                      selectedStep === step.id 
                        ? 'bg-gray-100' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedStep(step.id)}
                  >
                    {/* Checkbox */}
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 " />
                    </div>
                    
                    {/* Title and Skip Button */}
                    <div className="flex-1 flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-600">{step.title}</h3>
                      {step.hasSkip && selectedStep === step.id && (
                        <button className="text-[14px] text-grey-600 hover:text-grey-800 font-medium">
                          Skip
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Panel - Selected Step Details */}
            <div className="col-span-3">
              {selectedStepData && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    {selectedStepData.title}
                  </h2>
                  
                  {selectedStepData.description && (
                    <p className="text-sm text-gray-600 mb-4">
                      {selectedStepData.description}
                    </p>
                  )}
                  
                  {selectedStepData.hasExplore && (
                    <button className="inline-flex items-center px-2 py-1 text-sm font-medium text-grey bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
                      {selectedStepData.buttonText}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Separator Line */}
          <div className="border-t border-gray-200 mx-6 my-6"></div>

          {/* Dynamic Module Sections */}
          <ModuleSections 
            shortcuts={yourShortcutsData}
            reportsAndMasters={reportsAndMastersData}
            shortcutsTitle="Your Shortcuts"
            reportsTitle="Reports & Masters"
          />
          
          {/* Edit and New Buttons - Bottom Right Corner */}
          <div className="flex justify-end mt-6 pr-6 pb-2">
            <div className="flex items-center space-x-1">
              <button className="inline-flex items-center space-x-1 px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                <Edit3 className="h-4 w-4" />
                <span>Edit</span>
              </button>
              <button className="inline-flex items-center space-x-1 px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                <Plus className="h-4 w-4" />
                <span>New</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
