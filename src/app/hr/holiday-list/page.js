'use client';

import { useEffect } from 'react';
import Layout from '../../../components/layout/Layout';

export default function HolidayListPage() {
  useEffect(() => {
    // Dispatch custom event to set activeContent to 'holiday-list'
    const event = new CustomEvent('setActiveContent', { detail: 'holiday-list' });
    window.dispatchEvent(event);
    
    // Update browser history
    window.history.pushState({ activeContent: 'holiday-list' }, '', '/hr/holiday-list');
  }, []);

  return <Layout />;
}
