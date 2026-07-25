import React from 'react';
import Link from 'next/link';
import { Camera, Briefcase, Code, Video, Mail, Phone, MessageCircle, MapPin, ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black/50 backdrop-blur-sm border-t border-white/10 pt-20 pb-10 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-wider flex items-center gap-2 mb-6">
              <img 
                src="/assets/images/logo-transparent.png" 
                alt="NNP Logo" 
                className="h-8 w-auto"
              />
              <span>Network Navigator Pioneers</span>
            </Link>
            <p className="text-gray-400 font-body text-sm mb-6 leading-relaxed">
              A next-generation digital innovation ecosystem. We help startups, businesses, students, and organizations build AI-powered solutions, websites, software, and digital products.
            </p>
            <div className="flex gap-4">
              <a href="[INSTAGRAM_LINK]" className="w-10 h-10 rounded-full bg-black/5 dark:bg-surfaceLight flex items-center justify-center hover:bg-secondary hover:text-white transition-all"><Camera className="w-4 h-4" /></a>
              <a href="[LINKEDIN_LINK]" className="w-10 h-10 rounded-full bg-black/5 dark:bg-surfaceLight flex items-center justify-center hover:bg-secondary hover:text-white transition-all"><Briefcase className="w-4 h-4" /></a>
              <a href="[GITHUB_LINK]" className="w-10 h-10 rounded-full bg-black/5 dark:bg-surfaceLight flex items-center justify-center hover:bg-secondary hover:text-white transition-all"><Code className="w-4 h-4" /></a>
              <a href="[YOUTUBE_LINK]" className="w-10 h-10 rounded-full bg-black/5 dark:bg-surfaceLight flex items-center justify-center hover:bg-secondary hover:text-white transition-all"><Video className="w-4 h-4" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3 text-gray-400 font-body text-sm">
              <li><Link href="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-secondary transition-colors">Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-secondary transition-colors">Portfolio</Link></li>
              <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-lg">Ecosystem</h4>
            <ul className="space-y-3 text-gray-400 font-body text-sm">
              <li><Link href="/startup-hub" className="hover:text-secondary transition-colors">Startup Hub</Link></li>
              <li><Link href="/internship" className="hover:text-secondary transition-colors">Student Program</Link></li>
              <li><Link href="/careers" className="hover:text-secondary transition-colors">Careers</Link></li>
              <li><Link href="/ai" className="hover:text-secondary transition-colors">GI AI</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-lg">Contact</h4>
            <ul className="space-y-4 text-gray-400 font-body text-sm">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <a href="mailto:nnp.connect@gmail.com" className="hover:text-white transition-colors">nnp.connect@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <a href="tel:+919003573340" className="hover:text-white transition-colors">+91 90035 73340</a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-secondary shrink-0" />
                <a href="https://wa.me/919003573340" className="hover:text-white transition-colors">WhatsApp Only</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span>Labbaikudikadu, Perambalur, Tamil Nadu</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-black/10 dark:border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400 dark:text-gray-500 font-body">
          <p>&copy; 2026 Network Navigator Pioneers (NNP). All Rights Reserved.</p>
          <button id="back-to-top" className="hover:text-white transition-colors flex items-center gap-2">
            Back to top <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
