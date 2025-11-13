'use client';

import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import HR from '@/components/main/hr/hr';

export default function HRPage() {
  // This page shows the Layout with HR content automatically loaded
  return (
    <Layout>
      <HR />
    </Layout>
  );
}
