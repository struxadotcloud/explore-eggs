import type { Metadata } from "next";
import { Geist, Geist_Mono, Cal_Sans } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const calSans = Cal_Sans({
  variable: "--font-cal-sans",
  subsets: ["latin"],
  weight: "400",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://eggs.struxa.app";

export const metadata: Metadata = {
  title: {
    default: "Eggs Explorer",
    template: "%s — Eggs Explorer",
  },
  description:
    "Browse Pterodactyl egg definitions across applications, games, and generic utilities.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    siteName: "Eggs Explorer",
    type: "website",
    images: [{ url: "https://static.struxa.cloud/social/og.jpeg", width: 1280, height: 640, alt: "Eggs Explorer" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://static.struxa.cloud/social/og.jpeg"],
  },
  icons: {
    icon: { url: "/logo-dark.svg", type: "image/svg+xml" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${calSans.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
