import React from "react";
import type { Metadata } from "next";
import { Inter, Montserrat, Noto_Sans_JP, Noto_Sans_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { TITLE } from "@/constants/application";
import "@/styles/globals.css";

const noteSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

const noteSansMono = Noto_Sans_Mono({
  variable: "--font-noto-sans-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: `%s | ${TITLE}`,
  },
  description: "This is a sample application.", // TODO
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const copyright = "your copyright"; // TODO

  return (
    <html lang="ja">
      <head>
        <meta name="robots" content="noindex" />
        <meta name="copyright" content={copyright} />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${noteSansJp.variable} ${noteSansMono.variable} ${inter.variable} ${montserrat.variable} antialiased`}
      >
        {children}
        <div>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
