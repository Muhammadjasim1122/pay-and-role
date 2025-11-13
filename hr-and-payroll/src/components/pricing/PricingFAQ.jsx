import React, { useState } from 'react';

export default function PricingFAQ() {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpanded = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqItems = [
    {
      question: "How do I implement Frappe HR?",
      answer: "You can implement Frappe HR by following our comprehensive setup guide. We provide step-by-step instructions for both cloud deployment and on-premise installation. Our support team is also available to assist with the implementation process."
    },
    {
      question: "What is the difference between Frappe HR and ERPNext?",
      answer: "Frappe HR is a specialized HR management system focused on human resources functions, while ERPNext is a complete enterprise resource planning system. Frappe HR is designed specifically for HR processes and integrates seamlessly with ERPNext if you need broader business management capabilities."
    },
    {
      question: "Can I customize Frappe HR for my organization?",
      answer: "Yes, Frappe HR is highly customizable. You can modify workflows, add custom fields, create custom reports, and even develop custom apps. The open-source nature of Frappe HR allows for extensive customization to meet your specific organizational needs."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Yes, Frappe HR has a mobile app available for both iOS and Android devices. The mobile app allows employees to access their HR information, submit leave requests, view payslips, and perform other HR-related tasks on the go."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-4 justify-center items-center">
            <hr  className='w-full max-w-[580px] border-gray-300 mb-6'/>

      {/* Open Source Section */}
      <div className="text-left mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-3">Open Source</h3>
        <p className="text-gray-600 mb-4 text-sm max-w-xl">
          Deploy on your own server using our installation scripts. Great for companies with a tech team. GPLv3 licensed.
        </p>
        <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center text-sm font-medium">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View source
        </button>
      </div>
      <hr  className='w-full max-w-[580px] border-gray-300'/>

      {/* Divider */}
      <div className="border-t border-gray-300 mb-8"></div>

      {/* FAQ Section */}
      <div className="text-left  w-full max-w-[580px]">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Frequently asked questions</h3>
        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <div key={index} >
              <button
                onClick={() => toggleExpanded(index)}
                className="flex items-center justify-between w-full py-2 text-left hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-medium text-gray-800 text-sm pr-4">{item.question}</h4>
                <svg 
                  className="w-4 h-4 text-gray-600 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  {expandedItems[index] ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  )}
                </svg>
              </button>
              {expandedItems[index] && (
                <div className="pb-3">
                  <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
