'use client';

import React from 'react';
import '@/styles/globals.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { Layout } from '@/layouts/auth';
import { TrpcProvider } from '@/providers/trpc-provider';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'simplebar-react/dist/simplebar.min.css';

export default function SigninLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
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
