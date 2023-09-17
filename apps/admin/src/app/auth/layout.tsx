import React from 'react';
import { Layout } from '@/layouts/auth';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}
