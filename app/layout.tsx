import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Tracker from "@/components/Tracker";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://mandela.world";
const brandName = "WorldSim";

export const metadata: Metadata = {
  title: `${brandName} - AI Agent Parallel World Simulation`,
  description:
    "Multi-agent parallel world simulation platform. Simulate complex real-world environments and predict event evolution through large-scale emergent simulations.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl },
  openGraph: {
    title: `${brandName} - AI Agent Parallel World Simulation`,
    description:
      "Multi-agent parallel world simulation platform. Simulate complex real-world environments and predict event evolution through large-scale emergent simulations.",
    url: siteUrl,
    siteName: brandName,
    locale: "en_US",
    type: "website",
    images: [{ url: `${siteUrl}/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brandName} - AI Agent Parallel World Simulation`,
    description:
      "Multi-agent parallel world simulation platform. Simulate complex real-world environments.",
    images: [`${siteUrl}/og-default.png`],
  },
};

function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: brandName,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.png`,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: brandName,
    url: siteUrl,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className={inter.className}>
        <Tracker />
        {children}
      </body>
    </html>
  );
}
