'use client';

import React from 'react';
import '@/styles/globals.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { Layout } from '@/layouts/default';
import { TrpcProvider } from '@/providers/trpc-provider';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'simplebar-react/dist/simplebar.min.css';
import { TITLE } from '@/constants/application';

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  const defaultTitle = TITLE;
  const defaultDescription = 'This is a sample application.'; // TODO
  const copyright = 'your copyright'; // TODO

  return (
    <html lang='ja'>
      <head>
        <title>{defaultTitle}</title>
        <meta name='description' content={defaultDescription} />
        <meta name='copyright' content={copyright} />
        {/* <link
          rel='canonical'
          href={`${process.env.NEXT_PUBLIC_HOST ?? PRODUCTION_URL}${decodeURI(router.asPath)}`}
        /> */}
        {/* <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' /> */}
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link
          href='https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;500;700&display=swap'
          rel='stylesheet'
        />
        <link href='https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&display=swap' rel='stylesheet' />
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;800&display=swap'
          rel='stylesheet'
        />
      </head>
      <body>
        <SessionProvider>
          <TrpcProvider>{children}</TrpcProvider>
        </SessionProvider>
        <div>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
