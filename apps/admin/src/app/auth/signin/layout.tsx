import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Sign In' },
};

export default function SigninLayout({ children }: { children: React.ReactNode }) {
  return children;
}
