'use client';

import React, { useState } from 'react';
import { Cpu, Layers, Sparkles, X, Info, CheckCircle2 } from 'lucide-react';

interface TechItem {
  id: string;
  name: string;
  category: string;
  description: string;
  summary: string;
  nnpUsage: string;
  highlights: string[];
  color: string;
  badgeBg: string;
  iconSvg: React.ReactNode;
}

const TECH_CATEGORIES = [
  { id: 'all', label: 'All Technologies' },
  { id: 'frontend', label: '🌐 Frontend' },
  { id: 'backend', label: '⚙️ Backend' },
  { id: 'database', label: '🗄️ Database' },
  { id: 'ai', label: '🤖 AI & ML' },
  { id: 'cloud', label: '☁️ Cloud & DevOps' },
  { id: 'mobile', label: '📱 Mobile & Analytics' },
];

const TECHNOLOGIES: TechItem[] = [
  // --- FRONTEND ---
  {
    id: 'html5',
    name: 'HTML5',
    category: 'frontend',
    description: 'Semantic markup & web standards',
    summary: 'HTML5 is the universal standard markup language used to structure web content, handle native multimedia elements, and define semantic document models.',
    nnpUsage: 'At NNP, we construct semantic, SEO-optimized, and fully accessible DOM structures to ensure ultra-fast rendering and perfect search engine indexing.',
    highlights: ['Semantic Markup', 'SEO Optimization', 'Web Accessibility'],
    color: '#E34F26',
    badgeBg: 'rgba(227, 79, 38, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#E34F26">
        <path d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L3.89 4.41l.698 8.051h9.106l-.352 3.926-3.71.996-3.725-.996-.239-2.677H3.041l.455 5.378 8.473 2.348 8.497-2.348 1.139-12.74H8.531z" />
      </svg>
    )
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'frontend',
    description: 'Modern styling & responsive layouts',
    summary: 'CSS3 is the style language used to define layout presentation, visual animations, responsive viewports, custom themes, and glassmorphism effects.',
    nnpUsage: 'NNP leverages advanced CSS3 properties, CSS variables, glassmorphism, flexbox, and grid layouts to build Apple-inspired dark mode user experiences.',
    highlights: ['Glassmorphism', 'Responsive Design', 'Custom Animations'],
    color: '#1572B6',
    badgeBg: 'rgba(21, 114, 182, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#1572B6">
        <path d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L3.89 4.41l.698 8.051h9.106l-.352 3.926-3.71.996-3.725-.996-.239-2.677H3.041l.455 5.378 8.473 2.348 8.497-2.348 1.139-12.74H8.531z" />
      </svg>
    )
  },
  {
    id: 'js',
    name: 'JavaScript (ES6+)',
    category: 'frontend',
    description: 'Dynamic scripting & logic engine',
    summary: 'JavaScript (ES6+) is the core dynamic programming language of the web, enabling interactive interfaces, asynchronous data fetching, and client-side logic.',
    nnpUsage: 'NNP writes modern ES6+ code featuring async/await, modular modules, promises, and dynamic event handling for zero-lag application responsiveness.',
    highlights: ['ES6+ Syntax', 'Async Programming', 'Event-Driven Logic'],
    color: '#F7DF1E',
    badgeBg: 'rgba(247, 223, 30, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#F7DF1E">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M3 3h18v18H3V3zm10.72 14.28c.45.83 1.18 1.41 2.22 1.41 1.08 0 1.77-.52 1.77-1.3 0-.9-.72-1.22-1.93-1.74l-.67-.29c-1.93-.82-3.21-1.84-3.21-3.99 0-2.38 1.84-4.14 4.74-4.14 2.1 0 3.55.76 4.43 2.37l-2.07 1.34c-.45-.8-1.06-1.16-1.85-1.16-.83 0-1.42.52-1.42 1.19 0 .8.54 1.13 1.73 1.64l.67.29c2.31.98 3.49 1.93 3.49 4.12 0 2.76-2.12 4.29-5.26 4.29-2.81 0-4.66-1.25-5.46-2.8l2.02-1.22zM5.57 17.07l2.07-1.23c.36.63.7.98 1.39.98.69 0 1.13-.39 1.13-1.44V7.5h2.64v8.03c0 2.5-1.47 3.65-3.76 3.65-2.01 0-3.17-.96-3.47-2.11z" />
      </svg>
    )
  },
  {
    id: 'ts',
    name: 'TypeScript',
    category: 'frontend',
    description: 'Type-safe scalable JavaScript',
    summary: 'TypeScript is a strongly typed superset of JavaScript developed by Microsoft that catches type errors at compile time and provides rich IDE tooling.',
    nnpUsage: 'NNP uses TypeScript across frontend and backend codebases to enforce strict interfaces, eliminate runtime crashes, and accelerate enterprise development.',
    highlights: ['Type Safety', 'Compile-Time Checks', 'Enterprise Scalability'],
    color: '#3178C6',
    badgeBg: 'rgba(49, 120, 198, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#3178C6">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#3178C6" />
        <path d="M11.5 16.5h-2v-7h-3v-2h8v2h-3v7zm8-2.3c0 1.6-1.2 2.5-3.3 2.5-1.4 0-2.5-.4-3.1-1l.8-1.4c.5.4 1.3.8 2.2.8 1.1 0 1.6-.4 1.6-1 0-.6-.5-.9-1.6-1.3l-.7-.3c-1.5-.5-2.2-1.4-2.2-2.5 0-1.6 1.2-2.5 3-2.5 1.2 0 2.1.3 2.7.8l-.8 1.4c-.4-.3-1.1-.6-1.9-.6-.9 0-1.3.4-1.3.9 0 .5.4.8 1.5 1.2l.7.3c1.6.5 2.4 1.4 2.4 2.7z" fill="#FFF" />
      </svg>
    )
  },
  {
    id: 'react',
    name: 'React.js',
    category: 'frontend',
    description: 'Component-driven interactive UI',
    summary: 'React.js is Meta\'s industry-standard frontend JavaScript library for building fast, declarative, component-driven user interfaces with virtual DOM diffing.',
    nnpUsage: 'NNP crafts modular, reusable UI components and handles client-side state management for seamless web apps and dashboard management systems.',
    highlights: ['Component Architecture', 'Virtual DOM Diffing', 'Modular Reusability'],
    color: '#61DAFB',
    badgeBg: 'rgba(97, 218, 251, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="1.5">
        <circle cx="12" cy="12" r="2" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
      </svg>
    )
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    description: 'Server-side rendering & App Router',
    summary: 'Next.js is Vercel\'s full-stack React framework featuring Server-Side Rendering (SSR), Static Site Generation (SSG), and Server Actions for high performance.',
    nnpUsage: 'NNP builds enterprise platforms using Next.js App Router for sub-second page loads, instant server hydration, and optimal SEO ranking.',
    highlights: ['Server-Side Rendering', 'App Router Architecture', 'SEO & Speed Performance'],
    color: '#FFFFFF',
    badgeBg: 'rgba(255, 255, 255, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#FFFFFF">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm4.5 17.5l-6.8-9.1V17.5H8V6.5h2.3l6.5 8.7V6.5h1.7v11h-2z" />
      </svg>
    )
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    description: 'Utility-first modern styling',
    summary: 'Tailwind CSS is a utility-first CSS framework designed for rapidly styling custom user interfaces directly inside markup without leaving your code.',
    nnpUsage: 'NNP utilizes custom Tailwind configurations to generate sleek dark modes, vibrant gradients, and responsive layouts across all device viewports.',
    highlights: ['Utility-First Classes', 'Custom Dark Mode', 'Rapid Responsive Layouts'],
    color: '#06B6D4',
    badgeBg: 'rgba(6, 182, 212, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#06B6D4">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    )
  },
  {
    id: 'three-gsap',
    name: 'Three.js & GSAP',
    category: 'frontend',
    description: '3D graphics & ultra-smooth animations',
    summary: 'Three.js is a WebGL 3D JavaScript engine, while GSAP (GreenSock) is the gold standard library for high-performance visual UI animations.',
    nnpUsage: 'NNP constructs immersive 3D space backgrounds, interactive particle physics, and smooth scroll animations to wow users at first glance.',
    highlights: ['WebGL 3D Graphics', 'Interactive Particle Physics', 'GSAP Scroll Triggers'],
    color: '#88CE02',
    badgeBg: 'rgba(136, 206, 2, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#88CE02" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    )
  },

  // --- BACKEND ---
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    description: 'Asynchronous event-driven runtime',
    summary: 'Node.js is an open-source, cross-platform JavaScript runtime built on Chrome\'s V8 engine that executes non-blocking asynchronous server code.',
    nnpUsage: 'NNP uses Node.js to power high-concurrency microservices, scalable backend server APIs, and asynchronous data streaming services.',
    highlights: ['Non-Blocking I/O', 'V8 Engine Speed', 'Microservice Backend'],
    color: '#339933',
    badgeBg: 'rgba(51, 153, 51, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#339933">
        <path d="M12 1.5l10.4 6v12L12 25.5 1.6 19.5v-12L12 1.5zm0 3.2L4.1 8.9v9.2l7.9 4.6 7.9-4.6V8.9L12 4.7z" />
      </svg>
    )
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'backend',
    description: 'Minimalist web framework for Node',
    summary: 'Express.js is a minimal, flexible Node.js web application framework providing a robust set of features for building RESTful APIs and web routing.',
    nnpUsage: 'NNP crafts secure API routes, middleware authentication handlers, and backend controller layers with Express.js.',
    highlights: ['API Middleware Routing', 'Fast Controller Execution', 'Secure REST Endpoints'],
    color: '#E0E0E0',
    badgeBg: 'rgba(224, 224, 224, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#E0E0E0">
        <path d="M24 18.25h-4.67l-2.83-4.57-2.83 4.57H9l5.08-7.83L9.33 3.75h4.67l2.5 4.17 2.5-4.17H23.6l-4.75 7.17L24 18.25zM0 18.25V3.75h7.5v2.5H2.5v3.33H7v2.5H2.5v3.67H7.5v2.5H0z" />
      </svg>
    )
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend',
    description: 'High-level language for backend & AI',
    summary: 'Python is a versatile programming language widely adopted for Artificial Intelligence, Data Analytics, Machine Learning, and backend automation.',
    nnpUsage: 'NNP uses Python for developing Machine Learning algorithms, Natural Language Processing pipelines, automated scrapers, and data intelligence tools.',
    highlights: ['AI & Machine Learning', 'Data Processing Pipelines', 'Automated Scripting'],
    color: '#3776AB',
    badgeBg: 'rgba(55, 118, 171, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#3776AB">
        <path d="M11.91 0C5.64 0 6.03 2.73 6.03 2.73l.01 2.83h5.97v.85H3.77S0 5.97 0 12.2c0 6.22 3.29 6 3.29 6h1.96v-2.76s-.11-3.29 3.25-3.29h5.58s3.15.06 3.15-3.05V3.15S17.7 0 11.91 0zM8.7 1.83a.98.98 0 1 1 0 1.96.98.98 0 0 1 0-1.96zm3.39 22.17c6.27 0 5.88-2.73 5.88-2.73l-.01-2.83h-5.97v-.85h8.24s3.77.44 3.77-5.79c0-6.22-3.29-6-3.29-6h-1.96v2.76s.11 3.29-3.25 3.29H9.92s-3.15-.06-3.15 3.05v5.97s-.47 3.15 5.32 3.15zm3.21-1.83a.98.98 0 1 1 0-1.96.98.98 0 0 1 0 1.96z" />
      </svg>
    )
  },
  {
    id: 'java',
    name: 'Java & OOP',
    category: 'backend',
    description: 'Enterprise LLD & robust architecture',
    summary: 'Java is an object-oriented programming language designed for enterprise systems, Low-Level Design (LLD), high security, and cross-platform stability.',
    nnpUsage: 'NNP applies SOLID principles, Low-Level Design patterns, and modular layered architectures for enterprise client solutions.',
    highlights: ['SOLID Principles', 'Low-Level Design (LLD)', 'Layered System Architecture'],
    color: '#5382A1',
    badgeBg: 'rgba(83, 130, 161, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#5382A1">
        <path d="M8.85 16.83c0 0-1.33.68.89.92 2.68.29 6.89.26 9.42-.64 0 0 .76.49 1.98.3-2.18.96-6.66 1.15-10.37.54-2.13-.35-3.72-1.07-1.92-1.12zm-.98-2.58c0 0-1.42.75.95 1.01 2.86.32 7.37.28 10.08-.7 0 0 .81.53 2.12.33-2.33 1.05-7.13 1.26-11.1.59-2.28-.39-3.98-1.17-2.05-1.23zm8.93-3.79s2.17 1.09-2.16 2.05c-3.83.84-10.1.72-13.62-.31 0 0-1.27-.47.88-.93 3.07-.66 8.52-.77 14.9.81zM11.66 0s2.74 3.06-1.57 6.54c-3.1 2.5-1.22 4.41 0 6.09-2.61-1.63-3.99-3.73-1.6-6.19 3.07-3.16 3.17-6.44 3.17-6.44z" />
      </svg>
    )
  },
  {
    id: 'rest-jwt',
    name: 'REST API & JWT',
    category: 'backend',
    description: 'Secure authentication & microservices',
    summary: 'RESTful API architecture standardizes web communication, while JSON Web Tokens (JWT) enable stateless, secure authentication across applications.',
    nnpUsage: 'NNP implements token authentication, rate limiting, and encrypted REST endpoints to safeguard user data across digital applications.',
    highlights: ['Stateless JWT Auth', 'Encrypted REST Controllers', 'Token Authorization'],
    color: '#00B4D8',
    badgeBg: 'rgba(0, 180, 216, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#00B4D8" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    )
  },
  {
    id: 'socketio',
    name: 'Socket.io',
    category: 'backend',
    description: 'Bi-directional real-time communication',
    summary: 'Socket.io enables real-time, bi-directional, event-based communication between web clients and backend servers over WebSockets.',
    nnpUsage: 'NNP uses Socket.io to power real-time messaging, instant AI streaming output, live notifications, and real-time collaboration tools.',
    highlights: ['WebSocket Communication', 'Live Chat Messaging', 'Real-Time Event Sync'],
    color: '#FFFFFF',
    badgeBg: 'rgba(255, 255, 255, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#FFFFFF">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.5 4.5l4.5 7.5h-3.5v7.5l-4.5-7.5h3.5v-7.5z" />
      </svg>
    )
  },

  // --- DATABASE ---
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'database',
    description: 'NoSQL document database',
    summary: 'MongoDB is a leading document-based NoSQL database designed for storing flexible JSON-like documents with high query performance.',
    nnpUsage: 'NNP structures dynamic schemas for user profiles, business plans, chat logs, medical records, and real-time dashboard data in MongoDB.',
    highlights: ['NoSQL JSON Documents', 'Dynamic Schemas', 'High Throughput'],
    color: '#47A248',
    badgeBg: 'rgba(71, 162, 72, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#47A248">
        <path d="M12 0s-5.8 4.2-5.8 11.2c0 4.1 2.3 7.8 5.8 9.3 3.5-1.5 5.8-5.2 5.8-9.3C17.8 4.2 12 0 12 0zm0 18.5c-2.4-1.2-4-3.9-4-7.3 0-4.6 3.2-8.3 4-9.1.8.8 4 4.5 4 9.1 0 3.4-1.6 6.1-4 7.3z" />
      </svg>
    )
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'database',
    description: 'Relational DBMS for high performance',
    summary: 'MySQL is a proven relational database management system (RDBMS) offering ACID compliance, structured SQL queries, and robust security.',
    nnpUsage: 'NNP structures relational data for business ERP systems, financial ledgers, vendor management workflows, and administrative portals.',
    highlights: ['ACID Compliance', 'Relational Schemas', 'Indexed SQL Queries'],
    color: '#4479A1',
    badgeBg: 'rgba(68, 121, 161, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#4479A1">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" />
      </svg>
    )
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    description: 'Advanced ACID compliant SQL engine',
    summary: 'PostgreSQL is an advanced, enterprise-grade open-source relational database known for its reliability, complex queries, and JSONB support.',
    nnpUsage: 'NNP uses PostgreSQL for complex data analytics, transactional integrity, and scalable cloud application backend storage.',
    highlights: ['Advanced SQL Engine', 'JSONB Document Support', 'Transactional Integrity'],
    color: '#4169E1',
    badgeBg: 'rgba(65, 105, 225, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#4169E1">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2V9h2v8z" />
      </svg>
    )
  },
  {
    id: 'sqlite',
    name: 'SQLite',
    category: 'database',
    description: 'Embedded fast relational database',
    summary: 'SQLite is a self-contained, serverless SQL database engine ideal for embedded devices, mobile apps, and rapid lightweight data storage.',
    nnpUsage: 'NNP utilizes SQLite for desktop offline caching, mobile application databases, and ultra-fast local testing environments.',
    highlights: ['Zero Configuration', 'Serverless SQL', 'Fast Local Cache'],
    color: '#003B57',
    badgeBg: 'rgba(0, 59, 87, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#003B57">
        <path d="M12 0L1.5 6v12L12 24l10.5-6V6L12 0zm0 3.2l7.5 4.3v9l-7.5 4.3-7.5-4.3v-9L12 3.2z" />
      </svg>
    )
  },
  {
    id: 'firebase',
    name: 'Firebase',
    category: 'database',
    description: 'Realtime Database & Firestore',
    summary: 'Firebase is Google\'s backend platform providing Firestore, real-time sync, cloud authentication, and push notifications.',
    nnpUsage: 'NNP integrates Firebase for instant real-time data sync, secure social authentication, and push notifications in mobile & web apps.',
    highlights: ['Google Cloud Service', 'Firestore Realtime Sync', 'Instant Auth & Push'],
    color: '#FFCA28',
    badgeBg: 'rgba(255, 202, 40, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#FFCA28">
        <path d="M3.89 15.672L6.56 2.457c.075-.375.58-.466.78-.135l2.67 4.545-6.12 8.805zm15.67-4.475l-2.4-12.015c-.08-.415-.62-.486-.8-.103L3.06 17.545l7.98 4.475a2.03 2.03 0 0 0 1.92 0l6.6-3.7 2.0-7.123z" />
      </svg>
    )
  },

  // --- AI & ML ---
  {
    id: 'openai',
    name: 'OpenAI API & LLMs',
    category: 'ai',
    description: 'GPT-4, Claude & Generative AI',
    summary: 'OpenAI API gives access to cutting-edge Large Language Models (LLMs) like GPT-4 for natural language understanding, reasoning, and text generation.',
    nnpUsage: 'NNP builds custom AI Business Partners, automated chat co-founders, and intelligent document summary engines.',
    highlights: ['GPT-4 Integration', 'AI Business Partner', 'Generative Intelligence'],
    color: '#10A37F',
    badgeBg: 'rgba(16, 163, 127, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#10A37F">
        <path d="M22.28 9.67a6.02 6.02 0 0 0-.52-5.07 6.08 6.08 0 0 0-6.61-2.9 6.03 6.03 0 0 0-4.66-2.1c-2.6 0-4.87 1.6-5.7 3.96a6.02 6.02 0 0 0-3.95 2.87 6.08 6.08 0 0 0 .76 7.2 6.02 6.02 0 0 0 .52 5.07 6.08 6.08 0 0 0 6.61 2.9 6.03 6.03 0 0 0 4.66 2.1c2.6 0 4.87-1.6 5.7-3.96a6.02 6.02 0 0 0 3.95-2.87 6.08 6.08 0 0 0-.76-7.2zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
      </svg>
    )
  },
  {
    id: 'tensorflow',
    name: 'TensorFlow & Keras',
    category: 'ai',
    description: 'Deep Learning & neural models',
    summary: 'TensorFlow and Keras are open-source libraries for developing deep learning neural networks, model training, and pattern recognition.',
    nnpUsage: 'NNP trains predictive models for career recommendations, sentiment classification, and automated data prediction systems.',
    highlights: ['Deep Neural Networks', 'TensorFlow Pipelines', 'Model Training'],
    color: '#FF6F00',
    badgeBg: 'rgba(255, 111, 0, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#FF6F00">
        <path d="M1.29 5.86L12 0l10.71 5.86V17.5L12 23.36 1.29 17.5V5.86zm10.71 2.83l-6.8-3.72v7.44l6.8 3.72V8.69zm1.43 0v7.44l6.8-3.72V4.97l-6.8 3.72z" />
      </svg>
    )
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    category: 'ai',
    description: 'Predictive models & classification',
    summary: 'Machine Learning enables software systems to learn from data patterns and make accurate predictions without explicit static programming.',
    nnpUsage: 'NNP applies ML models to predict job matching scores, evaluate financial strategy risks, and power recommendation algorithms.',
    highlights: ['Predictive Classification', 'Data Analytics Models', 'Pattern Recognition'],
    color: '#A855F7',
    badgeBg: 'rgba(168, 85, 247, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2">
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="12" cy="18" r="3" />
        <line x1="8.5" y1="7.5" x2="15.5" y2="7.5" />
        <line x1="7.5" y1="8.5" x2="10.5" y2="15.5" />
        <line x1="16.5" y1="8.5" x2="13.5" y2="15.5" />
      </svg>
    )
  },
  {
    id: 'nlp-cv',
    name: 'NLP & Computer Vision',
    category: 'ai',
    description: 'Text analysis, OCR & image AI',
    summary: 'Natural Language Processing (NLP) interprets human language, while Computer Vision processes and analyzes document images and visual text.',
    nnpUsage: 'NNP develops AI Prescription OCR scanners for clinics, empathetic sentiment chat engines, and document parsing tools.',
    highlights: ['AI Prescription OCR', 'Sentiment Analysis', 'Document Text Parsing'],
    color: '#EC4899',
    badgeBg: 'rgba(236, 72, 153, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  },

  // --- CLOUD & DEVOPS ---
  {
    id: 'aws',
    name: 'AWS Cloud',
    category: 'cloud',
    description: 'EC2, S3, Lambda & CloudFront',
    summary: 'Amazon Web Services (AWS) provides scalable cloud infrastructure including server hosting (EC2), cloud storage (S3), and serverless Lambda functions.',
    nnpUsage: 'NNP hosts enterprise cloud backend applications, static assets on CloudFront CDN, and secure S3 file uploads.',
    highlights: ['AWS EC2 & S3 Storage', 'Global CloudFront CDN', 'Serverless Deployments'],
    color: '#FF9900',
    badgeBg: 'rgba(255, 153, 0, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#FF9900">
        <path d="M6.763 10.035c0 .161.04.288.118.384.079.096.196.144.352.144h1.705c.144 0 .256-.048.336-.144.08-.096.12-.223.12-.384V6.657c0-.16-.04-.288-.12-.384-.08-.096-.192-.144-.336-.144H7.233c-.156 0-.273.048-.352.144-.078.096-.118.224-.118.384v3.378zm0 7.307c0 .16.04.288.118.384.079.096.196.144.352.144h1.705c.144 0 .256-.048.336-.144.08-.096.12-.224.12-.384v-3.378c0-.16-.04-.288-.12-.384-.08-.096-.192-.144-.336-.144H7.233c-.156 0-.273.048-.352.144-.078.096-.118.224-.118.384v3.378z" />
      </svg>
    )
  },
  {
    id: 'docker',
    name: 'Docker & Containerization',
    category: 'cloud',
    description: 'Isolated application containers',
    summary: 'Docker packages software code and dependencies into lightweight containers that run reliably across development, staging, and cloud production environments.',
    nnpUsage: 'NNP containerizes full-stack microservices for reliable dev testing and automated cloud orchestration.',
    highlights: ['Isolated Containers', 'Development Parity', 'Microservice Deployment'],
    color: '#2496ED',
    badgeBg: 'rgba(36, 150, 237, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#2496ED">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-3.254 0h2.119a.186.186 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-3.254 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H7.475a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185z" />
      </svg>
    )
  },
  {
    id: 'git-github',
    name: 'Git & GitHub',
    category: 'cloud',
    description: 'Version control & CI/CD workflows',
    summary: 'Git is a distributed version control tool, and GitHub is the cloud platform for collaboration, code reviews, and automated CI/CD pipelines.',
    nnpUsage: 'NNP maintains strict git branching conventions, automated code verification tests, and seamless team collaboration.',
    highlights: ['Distributed Version Control', 'Code Review Workflows', 'Automated Build Actions'],
    color: '#F05032',
    badgeBg: 'rgba(240, 80, 50, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#F05032">
        <path d="M2.6 10.59L11.41 1.78a2.53 2.53 0 0 1 3.58 0l7.23 7.23a2.53 2.53 0 0 1 0 3.58l-8.81 8.81a2.53 2.53 0 0 1-3.58 0L2.6 14.17a2.53 2.53 0 0 1 0-3.58zm8.79 8.79a.9.9 0 0 0 1.28 0l6.23-6.23a.9.9 0 0 0 0-1.28L12.67 5.64a.9.9 0 0 0-1.28 0l-2.07 2.07a1.8 1.8 0 0 0 .46 2.65l2.45 1.45a1.8 1.8 0 1 1-1.39 2.4l-1.92-1.14a1.8 1.8 0 1 0-1.07 1.84l1.9 1.13a1.8 1.8 0 0 0 1.44.37z" />
      </svg>
    )
  },
  {
    id: 'vercel',
    name: 'Vercel & Netlify',
    category: 'cloud',
    description: 'Global edge deployment & CDN',
    summary: 'Vercel and Netlify are modern cloud edge platforms optimized for deploying frontend web applications with instant global CDN distribution.',
    nnpUsage: 'NNP deploys Next.js web applications on Vercel Edge networks to achieve sub-second page delivery across international regions.',
    highlights: ['Global Edge CDN', 'Instant Git Deployments', 'Sub-Second Speeds'],
    color: '#FFFFFF',
    badgeBg: 'rgba(255, 255, 255, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#FFFFFF">
        <path d="M12 1L24 22H0L12 1z" />
      </svg>
    )
  },

  // --- MOBILE & ANALYTICS ---
  {
    id: 'flutter-rn',
    name: 'Flutter & React Native',
    category: 'mobile',
    description: 'Cross-platform native iOS & Android apps',
    summary: 'Flutter and React Native are cross-platform mobile frameworks for building compiled native iOS and Android apps from a single codebase.',
    nnpUsage: 'NNP develops mobile applications with native UI performance, smooth gestures, and universal cross-device responsiveness.',
    highlights: ['Native Mobile Performance', 'Cross-Platform Build', 'Single Codebase'],
    color: '#02569B',
    badgeBg: 'rgba(2, 86, 155, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#02569B">
        <path d="M14.314 0L2.3 12 6 15.7 21.684 0h-7.37zM6 15.7L12 21.7h7.37l-6-6L6 15.7z" />
      </svg>
    )
  },
  {
    id: 'tableau-powerbi',
    name: 'Tableau & Power BI',
    category: 'mobile',
    description: 'Business Intelligence & data visualization',
    summary: 'Tableau and Power BI are business analytics tools that transform complex raw data into interactive graphical reports and decision dashboards.',
    nnpUsage: 'NNP builds executive BI dashboards and visual reporting tools for data-driven strategic planning and business insights.',
    highlights: ['Executive BI Analytics', 'Interactive Reporting', 'Data Visualizations'],
    color: '#E97627',
    badgeBg: 'rgba(233, 118, 39, 0.15)',
    iconSvg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#E97627">
        <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" stroke="#E97627" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  }
];

export default function TechStackSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);

  const filteredTechnologies = activeCategory === 'all' 
    ? TECHNOLOGIES 
    : TECHNOLOGIES.filter(tech => tech.category === activeCategory);

  return (
    <div className="mb-32">
      {/* Section Title */}
      <div className="text-center mb-16 reveal-text">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-sm mb-4 font-semibold uppercase tracking-widest">
          <Cpu className="w-4 h-4" /> Enterprise Infrastructure
        </div>
        <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          Our Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-accent to-purple-400">Stack</span>
        </h2>
        <p className="text-gray-400 font-body text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
          We leverage 30+ industry-standard technologies to architect, develop, and scale modern web, mobile, and AI-powered enterprise software applications.
        </p>
        <p className="text-xs text-secondary/80 font-mono mt-3 uppercase tracking-widest">
          💡 Click any technology card to view details & NNP integration
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center flex-wrap gap-2.5 mb-12">
        {TECH_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-2xl text-xs md:text-sm font-semibold transition-all duration-300 flex items-center gap-2 border ${
                isActive
                  ? 'bg-secondary text-black border-secondary shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-105'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30 hover:bg-white/10'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Technologies Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {filteredTechnologies.map((tech) => (
          <div
            key={tech.id}
            onClick={() => setSelectedTech(tech)}
            className="group glass-card p-5 md:p-6 rounded-2xl relative overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:border-secondary/40 hover:shadow-[0_10px_35px_rgba(59,130,246,0.2)] flex flex-col items-center text-center justify-between"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.08)'
            }}
          >
            {/* Subtle brand glow on card hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
              style={{
                background: `radial-gradient(circle at center, ${tech.color}20 0%, transparent 70%)`
              }}
            />

            {/* Brand Logo Container */}
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-inner"
              style={{ backgroundColor: tech.badgeBg }}
            >
              {tech.iconSvg}
            </div>

            {/* Tech Title */}
            <h3 className="text-base font-bold text-white mb-1 group-hover:text-secondary transition-colors duration-300">
              {tech.name}
            </h3>

            {/* Tech Short Description */}
            <p className="text-gray-400 text-xs font-body leading-tight mb-2">
              {tech.description}
            </p>

            {/* Click info hint */}
            <span className="text-[10px] text-secondary/70 font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View Details →
            </span>
          </div>
        ))}
      </div>

      {/* Interactive Modal Dialog when a Tech Card is clicked */}
      {selectedTech && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedTech(null)}
        >
          <div 
            className="glass-card max-w-lg w-full p-6 md:p-8 rounded-3xl relative border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-left transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedTech(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with Logo */}
            <div className="flex items-center gap-4 mb-6">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
                style={{ backgroundColor: selectedTech.badgeBg }}
              >
                {selectedTech.iconSvg}
              </div>
              <div>
                <div className="inline-block px-3 py-0.5 rounded-full bg-secondary/15 border border-secondary/30 text-[11px] font-semibold text-secondary uppercase tracking-wider mb-1">
                  {selectedTech.category.toUpperCase()}
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">{selectedTech.name}</h3>
              </div>
            </div>

            {/* What it is */}
            <div className="mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-secondary mb-2 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-secondary" /> What is {selectedTech.name}?
              </h4>
              <p className="text-gray-300 font-body text-sm leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/5">
                {selectedTech.summary}
              </p>
            </div>

            {/* How NNP Uses It */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-accent mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-accent" /> How NNP Uses It
              </h4>
              <p className="text-gray-300 font-body text-sm leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/5">
                {selectedTech.nnpUsage}
              </p>
            </div>

            {/* Highlights Tags */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
              {selectedTech.highlights.map((h, i) => (
                <span key={i} className="px-3 py-1 rounded-xl bg-secondary/10 border border-secondary/20 text-secondary text-xs font-semibold">
                  ✓ {h}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
