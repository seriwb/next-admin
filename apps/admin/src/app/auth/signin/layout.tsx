'use client';

import '@/styles/globals.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'simplebar-react/dist/simplebar.min.css';
import React from 'react';
import { TITLE } from '@/constants/application';

export default function SigninLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <head>
        <title>{`Sign In | ${TITLE}`}</title>
      </head>
      {children}
    </>
  );
}
