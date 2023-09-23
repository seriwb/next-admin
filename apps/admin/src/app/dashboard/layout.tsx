import React from 'react';
import { Metadata } from 'next';
import { AppLayout } from '@/layouts/app-layout';

export const metadata: Metadata = {
  title: { absolute: 'Dashboard' },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
