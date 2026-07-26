import type { Metadata } from 'next';
import { Briefcase, Activity, ArrowRight, ShoppingBag, Bot, GraduationCap, RefreshCw, BedDouble } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Enterprise Portfolio & Case Studies | NNP Technologies",
  description: "Explore enterprise software case studies by NNP Technologies including MediCare Hospital Management System and HotelPro Management System.",
  alternates: {
    canonical: "https://portfolio-site-nnp.vercel.app/portfolio",
  },
  openGraph: {
    title: "Enterprise Portfolio & Case Studies | NNP Technologies",
    description: "Explore enterprise software case studies by NNP Technologies.",
    url: "https://portfolio-site-nnp.vercel.app/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-20 reveal-text">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-sm mb-6 font-semibold uppercase tracking-widest">
          <Briefcase className="w-6 h-6 inline-block" /> Selected Works
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-accent to-purple-400">Portfolio.</span>
        </h1>
        <p className="text-xl text-gray-400 font-light font-body max-w-3xl mx-auto">
          Explore our finest digital products, built for scale and designed for impact.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex overflow-x-auto whitespace-nowrap scrollbar-none flex-nowrap md:flex-wrap justify-start md:justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 pb-2 px-1 service-card">
        <button className="shrink-0 px-5 sm:px-6 py-2 rounded-full border border-secondary bg-secondary text-black font-medium text-xs sm:text-sm transition-colors">
          All Projects
        </button>
        <button className="shrink-0 px-5 sm:px-6 py-2 rounded-full border border-white/10 text-gray-300 hover:border-secondary hover:text-secondary font-medium text-xs sm:text-sm transition-colors">
          Hotel & Web Apps
        </button>
        <button className="shrink-0 px-5 sm:px-6 py-2 rounded-full border border-white/10 text-gray-300 hover:border-secondary hover:text-secondary font-medium text-xs sm:text-sm transition-colors">
          Mobile Apps
        </button>
        <button className="shrink-0 px-5 sm:px-6 py-2 rounded-full border border-white/10 text-gray-300 hover:border-secondary hover:text-secondary font-medium text-xs sm:text-sm transition-colors">
          AI Solutions
        </button>
        <button className="shrink-0 px-5 sm:px-6 py-2 rounded-full border border-white/10 text-gray-300 hover:border-secondary hover:text-secondary font-medium text-xs sm:text-sm transition-colors">
          Enterprise ERP
        </button>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">

        {/* Project 1: HotelPro Management System */}
        <div className="glass-card rounded-3xl overflow-hidden group service-card">
          <div className="h-64 bg-slate-900 relative overflow-hidden flex items-center justify-center">
            <Image
              src="/images/hotelpro-card.jpg"
              alt="HotelPro Management System"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase">
                View Case Study
              </span>
            </div>
          </div>
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold tracking-widest text-secondary uppercase">HOTEL MANAGEMENT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
              <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">REACT + NODE</span>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">HotelPro Management System</h3>
            <p className="text-gray-400 font-body text-sm mb-6 line-clamp-2">
              A modern hotel management platform designed to simplify reservations, room management, guest check-ins, billing, staff operations, and business reporting through a secure, responsive, and user-friendly web application.
            </p>
            <Link href="/portfolio/hotelpro" className="text-secondary font-medium flex items-center gap-2 text-sm group-hover:underline">
              Read More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Project 2: MediCare Hospital Management System */}
        <div className="glass-card rounded-3xl overflow-hidden group service-card">
          <div className="h-64 bg-slate-900 relative overflow-hidden flex items-center justify-center">
            <Image
              src="/images/medicare-card.jpg"
              alt="MediCare Hospital Management System"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase">
                View Case Study
              </span>
            </div>
          </div>
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold tracking-widest text-secondary uppercase">HOSPITAL MANAGEMENT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
              <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">REACT + NODE</span>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">MediCare Hospital Management System</h3>
            <p className="text-gray-400 font-body text-sm mb-6 line-clamp-2">
              A complete digital healthcare platform designed to simplify patient management, appointments, billing, pharmacy, and hospital administration through one intelligent web application.
            </p>
            <Link href="/portfolio/hospital-management" className="text-secondary font-medium flex items-center gap-2 text-sm group-hover:underline">
              View Details <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Project 3: Aura Fashion App */}
        <div className="glass-card rounded-3xl overflow-hidden group service-card">
          <div className="h-64 bg-slate-900 relative overflow-hidden flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-purple-400" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase">
                View Case Study
              </span>
            </div>
          </div>
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold tracking-widest text-purple-400 uppercase">E-Commerce App</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
              <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Flutter</span>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Aura Fashion App</h3>
            <p className="text-gray-400 font-body text-sm mb-6 line-clamp-2">
              A premium cross-platform mobile application for a luxury fashion brand, featuring 3D product previews and AI-driven recommendations.
            </p>
            <Link href="/registration?service=Mobile App Development" className="text-purple-400 font-medium flex items-center gap-2 text-sm group-hover:underline">
              Read More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Project 4: FinanceBot Pro */}
        <div className="glass-card rounded-3xl overflow-hidden group service-card">
          <div className="h-64 bg-slate-900 relative overflow-hidden flex items-center justify-center">
            <Bot className="w-12 h-12 text-green-400" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase">
                View Case Study
              </span>
            </div>
          </div>
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold tracking-widest text-green-400 uppercase">AI Integration</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
              <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Python + OpenAI</span>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">FinanceBot Pro</h3>
            <p className="text-gray-400 font-body text-sm mb-6 line-clamp-2">
              An intelligent AI assistant deployed for a major accounting firm, automating invoice processing and generating financial summaries in real-time.
            </p>
            <Link href="/registration?service=AI Solutions" className="text-green-400 font-medium flex items-center gap-2 text-sm group-hover:underline">
              Read More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Project 5: EduCore Platform */}
        <div className="glass-card rounded-3xl overflow-hidden group service-card">
          <div className="h-64 bg-slate-900 relative overflow-hidden flex items-center justify-center">
            <GraduationCap className="w-12 h-12 text-accent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase">
                View Case Study
              </span>
            </div>
          </div>
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold tracking-widest text-accent uppercase">School ERP</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
              <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Next.js + Prisma</span>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">EduCore Platform</h3>
            <p className="text-gray-400 font-body text-sm mb-6 line-clamp-2">
              A scalable school management system bridging the communication gap between teachers, students, and parents with interactive dashboards.
            </p>
            <Link href="/registration?service=School Management System" className="text-accent font-medium flex items-center gap-2 text-sm group-hover:underline">
              Read More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

      {/* Load More CTA */}
      <div className="text-center service-card">
        <Link
          href="/registration"
          className="btn-magnetic group relative overflow-hidden rounded-full bg-transparent border border-white/20 text-white px-8 py-3.5 font-medium transition-all hover:bg-white/10 inline-flex items-center gap-2"
        >
          Request Custom Case Study <RefreshCw className="w-5 h-5 inline-block" />
        </Link>
      </div>
    </div>
  );
}