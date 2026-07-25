import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import ThreeBackground from "@/components/theme/ThreeBackground";
import GSAPAnimationProvider from "@/components/theme/GSAPAnimationProvider";
import Preloader from "@/components/theme/Preloader";
import { AuthProvider } from '@/features/authentication/context/AuthContext';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-site-nnp.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "NNP Technologies | Enterprise Full-Stack & AI Software Engineering Agency",
    template: "%s | NNP Technologies",
  },
  description: "NNP Technologies is a premier digital innovation agency specializing in enterprise web applications, AI automation, custom software, and full-stack solutions.",
  keywords: [
    "NNP Technologies",
    "NNP Tech",
    "Software Development Agency",
    "Enterprise Software Solutions",
    "Full-Stack Web Engineering",
    "React Development",
    "Next.js Agency",
    "AI Automation",
    "Hospital Management System",
    "HotelPro Management System"
  ],
  authors: [{ name: "NNP Technologies Team", url: baseUrl }],
  creator: "NNP Technologies",
  publisher: "NNP Technologies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "NNP Technologies | Enterprise Full-Stack & AI Software Engineering",
    description: "NNP Technologies delivers high-impact digital solutions, custom software, AI platforms, and enterprise web applications.",
    url: baseUrl,
    siteName: "NNP Technologies",
    images: [
      {
        url: `${baseUrl}/images/medicare-card.jpg`,
        width: 1200,
        height: 630,
        alt: "NNP Technologies Enterprise Portfolio Showcase",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NNP Technologies | Next-Gen AI & Full-Stack Engineering",
    description: "NNP Technologies delivers high-impact digital solutions, custom software, AI platforms, and enterprise web applications.",
    images: [`${baseUrl}/images/medicare-card.jpg`],
    creator: "@nnptechnologies",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NNP Technologies",
    "alternateName": "NNP Digital Solutions",
    "url": baseUrl,
    "logo": `${baseUrl}/images/logo-transparent.png`,
    "description": "NNP Technologies is a premier digital innovation agency specializing in enterprise web applications, AI automation, custom software, and full-stack solutions.",
    "email": "moahmeedmohai2020@gmail.com",
    "founder": [
      { "@type": "Person", "name": "Mohamed Naseem M" },
      { "@type": "Person", "name": "Jasim Ahamed" },
      { "@type": "Person", "name": "Mohamed Rasith" },
      { "@type": "Person", "name": "Prakasu Velmurugan" }
    ],
    "sameAs": [
      "https://github.com/nnpioneers/portfolio-site",
      "https://linkedin.com/company/nnp-technologies"
    ]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NNP Technologies",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/portfolio?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-body antialiased bg-black text-white relative min-h-screen flex flex-col`}>
        <AuthProvider>
          <ThreeBackground />
          <Preloader />
          <Navbar />
          <GSAPAnimationProvider>
            <main className="flex-grow pt-24">
              {children}
            </main>
          </GSAPAnimationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
