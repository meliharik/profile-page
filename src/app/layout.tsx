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
  metadataBase: new URL("https://meliharik.dev"),
  title: "Melih Arık",
  description:
    "Software engineer in Tallinn, Estonia. Building mobile apps with SwiftUI, Flutter and React Native.",
  authors: [{ name: "Melih Arık", url: "https://meliharik.dev" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://meliharik.dev",
    title: "Melih Arık",
    description:
      "Software engineer in Tallinn, Estonia. Building mobile apps with SwiftUI, Flutter and React Native.",
    siteName: "Melih Arık",
  },
  twitter: {
    card: "summary",
    title: "Melih Arık",
    description: "Software engineer in Tallinn, Estonia.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.theme==='dark'||(!('theme' in localStorage)&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
      </head>
      <body className="bg-white font-sans text-neutral-800 antialiased transition-colors dark:bg-neutral-950 dark:text-neutral-300">
        {children}
      </body>
    </html>
  );
}
