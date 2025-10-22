'use client';

import Layout from '../../../components/layout/Layout';
import { useEffect } from 'react';

export default function HRLeaveAllocationPage() {
  useEffect(() => {
    const event = new CustomEvent('setActiveContent', { detail: 'leave-allocation' });
    window.dispatchEvent(event);
  }, []);

  return <Layout />;
}

