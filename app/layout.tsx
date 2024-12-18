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
                content="google6761b1a4aa436ed5"
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KF63VLNP');
            `,
                }}
              ></script>
              <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-2YD5P70M8D"
              ></script>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2YD5P70M8D');
            `,
                }}
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
              <noscript>
                <iframe
                  src="https://www.googletagmanager.com/ns.html?id=GTM-KF63VLNP"
                  height="0"
                  width="0"
                  style={{ display: "none", visibility: "hidden" }}
                ></iframe>
              </noscript>
            </body>
          </html>
        </ReduxProvider>
      </InfintyProvider>
    </ClerkProvider>
  );
}
