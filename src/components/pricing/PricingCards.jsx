import React from 'react';

export default function PricingCards() {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-4  mx-auto">
      {/* Small Business Section */}
      <div className="text-left">
        <h3 className="text-xl font-bold text-gray-900 mb-1">Small Business</h3>
        <p className="text-[#7C7C7C] mb-6 max-w-[250px] text-[15px]">Choose shared hosting or private benches</p>
        
      <div className="pb-4">
      <div className="text-4xl  text-black flex font-bold ">
        <span className="text-sm text-black flex items-start pl-1">₹</span>
          <span>820</span>
        </div>
        <span className="text-sm text-black pl-3 "> onwards (per month)</span>
      </div>

        <button className="bg-gray-100 text-gray-800 py-1 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center text-sm font-medium">
          Start free trial
          <svg className="w-2 h-2 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        <ul className="space-y-2 mb-4 pt-7">
          <li className="flex items-start text-gray-700 text-sm">
            <span className="text-green-500 mr-2 mt-0.5 text-xs">✓</span>
            Ideal for up to ~1000 employees
          </li>
          <li className="flex items-start text-gray-700 text-sm ">
            <span className="text-green-500 mr-2 mt-0.5 text-xs">✓</span>
            <div >
              <div>
              Bundled product warranty starts at ₹4100.
              </div>
              <a href="#" className="text-black-600 hover:text-blue-800 ml-1 underline text-xs ">View all plans</a>
            </div>
          </li>
          <li className="flex items-start text-gray-700 text-sm">
            <span className="text-green-500 mr-2 mt-0.5 text-xs">✓</span>
            Managed Hosting
          </li>
          <li className="flex items-start text-gray-700 text-sm">
            <span className="text-green-500 mr-2 mt-0.5 text-xs">✓</span>
            Automated upgrades
          </li>
        </ul>
        
        
      </div>

      {/* Enterprise Section */}
      <div className="text-left">
        <h3 className="text-xl font-bold text-gray-900 mb-1">Enterprise</h3>
        <p className="text-[#7C7C7C] mb-6 text-[15px] max-w-[250px]">Choose dedicated hosting or hybrid hosting</p>
        
        <div className="mb-4">
          <h4 className="text-3xl font-bold text-gray-900">Premium</h4>
          <p className="text-gray-600 text-sm">support</p>
        </div>
        <button className="bg-gray-100 text-gray-800 py-1  px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center text-sm font-medium">
          Contact us
          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        <ul className="space-y-2 mb-4 pt-7">
          <li className="flex items-start text-gray-700 text-sm">
            <span className="text-green-500 mr-2 mt-0.5 text-xs">✓</span>
            <div className="flex items-center">
              Unlimited Users
              <span className="w-1 h-1 bg-red-500 rounded-full ml-1"></span>
            </div>
          </li>
          <li className="flex items-start text-gray-700 text-sm">
            <span className="text-green-500 mr-2 mt-0.5 text-xs">✓</span>
            Managed Hosting
          </li>
          <li className="flex items-start text-gray-700 text-sm">
            <span className="text-green-500 mr-2 mt-0.5 text-xs">✓</span>
            Product Warranty
          </li>
          <li className="flex items-start text-gray-700 text-sm">
            <span className="text-green-500 mr-2 mt-0.5 text-xs">✓</span>
            Account Manager
          </li>
          <li className="flex items-start text-gray-700 text-sm">
            <span className="text-green-500 mr-2 mt-0.5 text-xs">✓</span>
            Priority SLA
          </li>
          <li className="flex items-start text-gray-700 text-sm">
            <span className="text-green-500 mr-2 mt-0.5 text-xs">✓</span>
            Phone Support
          </li>
          <li className="flex items-start text-gray-700 text-sm">
            <span className="text-green-500 mr-2 mt-0.5 text-xs">✓</span>
            Large DB Support
          </li>
        </ul>
        
       
      </div>
      </div>
    </div>
  );
}
