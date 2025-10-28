'use client';

import React from 'react';
import AttendanceDashboard from '@/components/main/hr/attendance-dashboard';
import { DashboardProvider } from '@/components/contexts/DashboardContext';

export default function ShiftAttendancePage() {
  return (
    <DashboardProvider>
      <AttendanceDashboard />
    </DashboardProvider>
  );
}
