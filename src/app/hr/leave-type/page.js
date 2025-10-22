'use client';

import Layout from '../../../components/layout/Layout';
import { useEffect } from 'react';

export default function HRLeaveTypePage() {
  useEffect(() => {
    const event = new CustomEvent('setActiveContent', { detail: 'leave-type' });
    window.dispatchEvent(event);
  }, []);

  return <Layout />;
}

