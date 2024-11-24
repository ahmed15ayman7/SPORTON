import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "SPORTON | Login & Sign-up for Sports Enthusiasts",
    template: "%s - SPORTON",
  },
  keywords: [
    "SPORTON",
    "Login",
    "Sign-up",
    "Sports Platform",
    "Athletes",
    "Sports Clubs",
    "Talent Showcase",
    "Sports Networking",
    "Athlete Recognition",
  ],
  description:
  "Join SPORTON, the ultimate platform for athletes, agents, and clubs. Login or sign-up to showcase talent, connect with clubs, and gain recognition in sports.",
  openGraph: {
    type: "website",
    url: "https://www.sporton.website/",
    title: "SPORTON | Login & Sign-up for Sports Enthusiasts",
    description:
      "Join SPORTON, the ultimate platform for athletes, agents, and clubs. Login or sign-up to showcase talent, connect with clubs, and gain recognition in sports.",
    images: [
      {
        url: "https://www.sporton.website/logo.png",
        alt: "SPORTON LOGO",
      },
    ],
  },
  metadataBase: new URL("https://www.sporton.website/sign-in"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ direction: "rtl" }}
      className="
        min-h-screen flex w-full items-center justify-center
        bg-cover bg-center bg-no-repeat
        bg-[url('/assets/bg.jpg')]  lg:bg-[size:100%_100%]
         sm:bg-[size:auto]
      "
    >
      {children}
    </div>
  );
}
