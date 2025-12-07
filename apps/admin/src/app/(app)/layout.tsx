import React from 'react';
import { AppLayout as Layout } from '@/layouts/app-layout';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}
