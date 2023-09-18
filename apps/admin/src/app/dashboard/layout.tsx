import React from 'react';
import { Metadata } from 'next';
import { DefaultLayout } from '@/layouts/default';

export const metadata: Metadata = {
  title: { absolute: 'Dashboard' },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
