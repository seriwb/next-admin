import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accounts',
};

export default function AccountsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
