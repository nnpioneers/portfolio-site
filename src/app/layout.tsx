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

export const metadata: Metadata = {
  title: "NNP - Digital Innovation Platform",
  description: "A world-class digital innovation platform. We build startups, AI solutions, and digital excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
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
