'use client';

import { useEffect } from 'react';
import Layout from '../../../components/layout/Layout';

export default function HRLeaveApplicationPage() {
  useEffect(() => {
    const event = new CustomEvent('setActiveContent', { detail: 'leave-application' });
    window.dispatchEvent(event);
  }, []);

  return <Layout />;
}

