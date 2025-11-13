import React from 'react';

export default function PricingHeader() {
  return (
    <div className="text-center mb-12">
      <p className="text-sm w-full uppercase tracking-wider text-gray-500 mb-4">PRICING</p>
      <h1 className="text-2xl max-w-[300px] mx-auto   md:text-2xl  text-gray-900 mb-6">
        Compute-based pricing on Frappe Cloud
      </h1>
      <div className="max-w-[600px] mx-auto text-start">
        <p className="text-[15px] text-gray-700   leading-relaxed">
          Save big with compute-based pricing that is simple, transparent, and predictable. 
          There are no surprises as you get to monitor daily usage and pay at the end of the month. 
          Whether you are a small business or an enterprise, we have got you covered.
        </p>
      </div>
    </div>
  );
}
