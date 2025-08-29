import { Cormorant_Garamond, Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScrolling from "./utils/SmoothScrolling";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Cormorant Garamond (for headings)
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Bauhaus (for logo svg)
const bauhaus = localFont({
  src: [
    {
      path: "./bauhaus-font/BauhausStd-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./bauhaus-font/BauhausStd-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./bauhaus-font/BauhausStd-Demi.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./bauhaus-font/BauhausStd-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./bauhaus-font/BauhausStd-Heavy.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-bauhaus",
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Friigoo | Explore Tour Packages, Holiday Deals & Travel Experiences",
  description:
    "Discover the best tour packages, holiday deals, and curated travel experiences with Friigoo. Book family trips, honeymoon packages, adventure tours, and customized holidays worldwide.",
  keywords: [
    "tour packages",
    "holiday packages",
    "travel deals",
    "honeymoon packages",
    "family trips",
    "adventure tours",
    "custom travel packages",
    "Friigoo tours",
    "vacation deals",
    "international tour packages",
    "India holiday packages",
  ],
  authors: [{ name: "Friigoo" }],
  metadataBase: new URL("https://friigoo.com"),
  openGraph: {
    title: "Friigoo | Best Tour & Travel Packages",
    description:
      "Plan your perfect holiday with Friigoo. From budget trips to luxury travel packages, we make your journeys unforgettable.",
    url: "https://friigoo.com",
    siteName: "Friigoo",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Friigoo - Explore the World with Our Tour Packages",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Friigoo | Best Tour Packages & Holiday Deals",
    description:
      "Explore tour packages, holiday deals, family trips & adventure tours with Friigoo.",
    images: ["/og-image.jpg"],
    creator: "@friigoo",
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/faviconw.png" sizes="any" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body
        className={`${cormorantGaramond.variable} ${poppins.variable} ${bauhaus.variable} antialiased`}
      >
        <SmoothScrolling>
          <Header />
          <div className="">
            {children}
          </div>
          <Footer />
        </SmoothScrolling>
      </body>
    </html>
  );
}
