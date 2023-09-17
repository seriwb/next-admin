import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Register account' },
};

export default function FirstUserLayout({ children }: { children: React.ReactNode }) {
  return children;
}
