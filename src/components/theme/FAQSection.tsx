'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 1,
    question: "How long does a typical project take?",
    answer: "Every project is unique, but most websites and web applications are delivered within 2 to 8 weeks, depending on the project scope, features, and client requirements. We follow a structured development process with regular updates to ensure quality, transparency, and on-time delivery."
  },
  {
    id: 2,
    question: "Do you provide post-launch support?",
    answer: "Yes. We provide post-launch support to ensure your application runs smoothly after deployment. This includes bug fixes, performance monitoring, security updates, technical assistance, and feature enhancements whenever required."
  },
  {
    id: 3,
    question: "Can you modernize an existing legacy system?",
    answer: "Absolutely. We can transform outdated systems into modern, secure, and scalable applications without disrupting your business operations. Our modernization process focuses on improving performance, user experience, maintainability, and long-term reliability."
  },
  {
    id: 4,
    question: "How do you handle client communication?",
    answer: "We believe clear communication is the foundation of every successful project. Clients receive regular progress updates, milestone reviews, and direct communication throughout the development process to ensure complete transparency and collaboration."
  },
  {
    id: 5,
    question: "What technologies do you specialize in?",
    answer: "We specialize in modern technologies including React, Next.js, Node.js, Python, Java, MongoDB, MySQL, PostgreSQL, Flutter, AWS Cloud, Firebase, OpenAI APIs, and AI-powered application development. Our technology stack is selected based on each project's unique requirements."
  },
  {
    id: 6,
    question: "Can you build AI-powered applications?",
    answer: "Yes. We develop intelligent applications powered by Artificial Intelligence, Machine Learning, Natural Language Processing (NLP), and OpenAI APIs. From AI assistants to business automation solutions, we create smart applications tailored to your goals."
  },
  {
    id: 7,
    question: "Will my application be secure?",
    answer: "Security is built into every stage of development. We implement secure authentication, encrypted communication, protected APIs, database security, and industry best practices to safeguard your application and user data."
  },
  {
    id: 8,
    question: "Can my project be expanded in the future?",
    answer: "Absolutely. Every solution we build follows scalable architecture, allowing your application to grow with your business. New features, integrations, and modules can be added without rebuilding the entire system."
  },
  {
    id: 9,
    question: "Do you develop mobile applications?",
    answer: "Yes. We develop responsive web applications as well as cross-platform mobile applications using modern technologies such as Flutter, ensuring a consistent experience across Android, iOS, and the web."
  },
  {
    id: 10,
    question: "How do I start a project with NNP?",
    answer: "Getting started is simple. Contact us through the website, share your project idea, and our team will discuss your requirements, recommend the best solution, and provide a clear development roadmap before the project begins."
  }
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1); // Open FAQ 1 by default

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="mb-32 max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-16 reveal-text">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs md:text-sm mb-4 font-semibold uppercase tracking-widest">
          <HelpCircle className="w-4 h-4" /> Got Questions?
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-accent to-purple-400">Questions</span>
        </h2>
        <p className="text-gray-400 font-body text-sm md:text-base max-w-2xl mx-auto">
          Everything you need to know about our services, development process, technologies, security, and project workflow.
        </p>
      </div>

      {/* Accordion Container */}
      <div className="space-y-4">
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 border ${
                isOpen
                  ? 'border-secondary/40 bg-white/[0.07] dark:bg-white/[0.04] shadow-[0_0_25px_rgba(59,130,246,0.25)]'
                  : 'border-white/10 hover:border-white/20 hover:bg-white/[0.03]'
              }`}
            >
              {/* Question Header */}
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full p-6 text-left flex justify-between items-center gap-4 transition-colors focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className={`text-base md:text-lg font-bold transition-colors ${
                  isOpen ? 'text-secondary' : 'text-white'
                }`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isOpen ? 'bg-secondary text-black rotate-180' : 'bg-white/5 text-gray-400'
                }`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              {/* Answer Content */}
              {isOpen && (
                <div className="px-6 pb-6 pt-0 animate-fadeIn">
                  <div className="pt-3 border-t border-white/10">
                    <p className="text-gray-300 font-body text-sm md:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
