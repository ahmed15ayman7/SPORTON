import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

import React from "react";
const inter = Inter({ subsets: ["latin"] });
import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfintyProvider from "@/components/providers/InfintyProvider";
import ReduxProvider from "@/components/providers/ReduxProvider";
export const metadata: Metadata = {
  title: {
    default:
      "SPORTON | Home - Player Posts, Achievements, and Contact Players ",
    template: "%s - SPORTON ",
  },
  keywords: [
    "SPORTON",
    "Home",
    "Player Posts",
    "Achievements",
    "Contact Players",
    "Showcase Talent",
    "Connect with Clubs",
    "Gain Recognition",
    "Sports Platform",
  ],
  description:
    "SPORTON is a sports community platform that includes all athletes from Egypt in various sports, and on the other hand, player agents and clubs and institutions that will receive their talents will be present.",
  openGraph: {
    type: "website",
    url: "https://www.sporton.website/",
    title: "SPORTON",
    description:
      "SPORTON is a sports community platform that includes all athletes from Egypt in various sports, and on the other hand, player agents and clubs and institutions that will receive their talents will be present.",
    images: [
      {
        url: "https://www.sporton.website/logo.png",
        alt: "SPORTON LOGO",
      },
    ],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider >
      <InfintyProvider>
        <ReduxProvider>
          <html lang="en">
            <body className={inter.className}>
              <div className=" w-full">
                {children}
                <ToastContainer />
              </div>
              <Analytics />
            </body>
          </html>
        </ReduxProvider>
      </InfintyProvider>
    </ClerkProvider>
  );
}
