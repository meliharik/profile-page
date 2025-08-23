import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Melih Arık",
  description: "Portfolio of Melih Arık, a Developer & AI Specialist focused on privacy-preserving technologies, artificial intelligence, and secure data systems.",
  keywords: ["Melih Arık", "AI Developer", "Mobile Developer", "Artificial Intelligence", "Machine Learning", "Software Engineer", "Turkey", "Bursa"],
  authors: [{ name: "Melih Arık", url: "https://meliharik.dev" }],
  creator: "Melih Arık",
  publisher: "Melih Arık",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://meliharik.dev",
    title: "Melih Arık",
    description: "Portfolio of Melih Arık, a Developer & AI Specialist focused on privacy-preserving technologies, artificial intelligence, and secure data systems.",
    siteName: "Melih Arık Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Melih Arık",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Melih Arık",
    description: "Portfolio of Melih Arık, a Developer & AI Specialist focused on privacy-preserving technologies, artificial intelligence, and secure data systems.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
