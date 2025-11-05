'use client';

import React from 'react';
import PricingHeader from '@/components/pricing/PricingHeader';
import PricingCards from '@/components/pricing/PricingCards';
import PricingFAQ from '@/components/pricing/PricingFAQ';
import Footer from '@/components/pricing/Footer';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* All page content goes here - add any new content within this container */}
          <PricingHeader />
          <PricingCards />
          <PricingFAQ />
          <Footer />
          
          {/* Future content can be added here */}
          {/* Example: <NewSection /> */}
        </div>
      </div>
    </div>
  );
}
