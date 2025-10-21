'use client';

import { useEffect } from 'react';
import Layout from '../../../components/layout/Layout';

export default function EmployeePage() {
  useEffect(() => {
    // Dispatch custom event to set activeContent to 'employee'
    const event = new CustomEvent('setActiveContent', { detail: 'employee' });
    window.dispatchEvent(event);
    
    // Update browser history
    window.history.pushState({ activeContent: 'employee' }, '', '/hr/employee');
  }, []);

  return <Layout />;
}
