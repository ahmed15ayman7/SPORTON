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
    default: "SPORTON | Player Posts, Achievements & Connect with Players",
    template: "%s - SPORTON",
  },
  description:
    "SPORTON connects Egyptian athletes, agents, and clubs to showcase talent and foster opportunities. Join the ultimate sports community today!",

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
  metadataBase: new URL("https://www.sporton.website/"),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <InfintyProvider>
        <ReduxProvider>
          <html lang="en">
            <head>
              <link rel="canonical" href="https://www.sporton.website/" />
              {/* <meta
                name="google-site-verification"
                content="google6761b1a4aa436ed5"
              /> */}
              <meta
                name="google-site-verification"
                content="4SotCEA8ZnMeI_GpUauosjYwpag6nhVQ00yvIYEhRZs"
              />
            </head>
            <body className={inter.className}>
              <div className=" w-full">
                {children}
                <ToastContainer />
              </div>
              <Analytics />

              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: `
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "SPORTON",
                "url": "https://www.sporton.website/",
                "logo": "https://www.sporton.website/logo.png",
                "sameAs": [
                  "https://facebook.com/sporton",
                  "https://twitter.com/sporton"
                ]
              }
            `,
                }}
              />
            </body>
          </html>
        </ReduxProvider>
      </InfintyProvider>
    </ClerkProvider>
  );
}
