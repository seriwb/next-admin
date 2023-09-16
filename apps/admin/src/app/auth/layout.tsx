'use client';

import '@/styles/globals.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'simplebar-react/dist/simplebar.min.css';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { Layout } from '@/layouts/auth';
import { TrpcProvider } from '@/providers/trpc-provider';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionProvider>
        <TrpcProvider>
          <Layout>{children}</Layout>
        </TrpcProvider>
      </SessionProvider>
      <div>
        <Toaster />
      </div>
    </>
  );
}
