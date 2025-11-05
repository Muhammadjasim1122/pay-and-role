'use client';

import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';

export default function HRHRSettingsPage() {
  useEffect(() => {
    // Set the active content to hr-settings when this page loads
    const event = new CustomEvent('setActiveContent', { detail: 'hr-settings' });
    window.dispatchEvent(event);
  }, []);

  return (
    <Layout>
      <div></div>
    </Layout>
  );
}
