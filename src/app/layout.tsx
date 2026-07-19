import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
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
  title: {
    default: "Melih Arık — Software Engineer",
    template: "%s — Melih Arık",
  },
  description:
    "Software engineer in Tallinn, Estonia. Mobile engineer at Omniva, building iOS and Android apps with SwiftUI, Flutter and React Native. 30+ apps shipped to the App Store and Google Play.",
  keywords: [
    "Melih Arık",
    "Software Engineer",
    "Mobile Developer",
    "iOS Developer",
    "SwiftUI",
    "Flutter",
    "React Native",
    "Tallinn",
    "Estonia",
  ],
  authors: [{ name: "Melih Arık", url: "https://meliharik.dev" }],
  creator: "Melih Arık",
  alternates: {
    canonical: "https://meliharik.dev",
  },
  openGraph: {
    type: "profile",
    firstName: "Melih",
    lastName: "Arık",
    locale: "en_US",
    url: "https://meliharik.dev",
    title: "Melih Arık — Software Engineer",
    description:
      "Software engineer in Tallinn, Estonia. Building iOS and Android apps with SwiftUI, Flutter and React Native.",
    siteName: "Melih Arık",
  },
  twitter: {
    card: "summary_large_image",
    title: "Melih Arık — Software Engineer",
    description: "Software engineer in Tallinn, Estonia.",
    creator: "@melihify",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script id="ms-clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");`}
          </Script>
        )}
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
