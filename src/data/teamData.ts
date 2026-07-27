export interface TeamMember {
  id: string;
  name: string;
  slug: string;
  designation: string;
  executiveRole: string;
  professionalTitle: string;
  responsibility: string;
  aboutParagraphs: string[];
  careerObjective: string;
  image?: string;
  avatarPlaceholder: string;
  avatarGradient: string;
  skillCategories: {
    category: string;
    skills: string[];
  }[];
  experience: {
    role: string;
    company: string;
    period: string;
    description: string;
  }[];
  projects: {
    title: string;
    tech: string[];
    description: string[];
    tag: string;
  }[];
  education: {
    degree: string;
    field: string;
    institution: string;
    year: string;
    status: string;
  }[];
  certificates: {
    title: string;
    description: string;
  }[];
  strengths: string[];
  languages: string[];
  achievements: string[];
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'M. Mohamed Naseem',
    slug: 'mohamed-naseem',
    designation: 'Founder & CEO',
    executiveRole: 'Chief Executive Officer',
    professionalTitle: 'AI & Data Science Student • Full Stack Developer • Machine Learning Enthusiast',
    responsibility: 'Responsible for company vision, leadership, business strategy, and overall growth.',
    image: '/assets/images/team/mohamed-naseem.png',
    avatarPlaceholder: 'MN',
    avatarGradient: 'from-blue-600 via-indigo-600 to-purple-600',
    aboutParagraphs: [
      'Highly motivated Artificial Intelligence and Data Science undergraduate with a strong passion for Artificial Intelligence, Machine Learning, Software Development, and Full Stack Web Development.',
      'Interested in building intelligent, data-driven applications that solve real-world problems through modern technologies, scalable architectures, and innovative software solutions.',
      'Focused on continuous learning, innovation, and creating impactful digital products.'
    ],
    careerObjective: 'Seeking opportunities to contribute as an AI/ML Engineer, Software Developer, or Full Stack Developer. Passionate about designing intelligent software systems, scalable web applications, and AI-powered solutions that create measurable value for users and businesses.',
    skillCategories: [
      {
        category: 'Programming Languages',
        skills: ['Python', 'SQL', 'JavaScript']
      },
      {
        category: 'Artificial Intelligence',
        skills: ['Machine Learning', 'Deep Learning', 'TensorFlow', 'Keras', 'NLP']
      },
      {
        category: 'Web Development',
        skills: ['Full Stack Development', 'REST APIs', 'Responsive Web Design']
      },
      {
        category: 'Database & Tools',
        skills: ['SQL', 'Database Management', 'Git', 'GitHub']
      },
      {
        category: 'Other Competencies',
        skills: ['Data Analysis', 'Content Writing']
      }
    ],
    experience: [
      {
        role: 'Founder & Chief Executive Officer',
        company: 'Network Navigator Pioneers (NNP)',
        period: '2024 - Present',
        description: 'Directing overarching strategic direction, organizational expansion, AI/ML product innovation, and enterprise ecosystem building.'
      },
      {
        role: 'Freelance Web Developer',
        company: 'Independent Client Projects',
        period: '2023 - Present',
        description: 'Successfully delivered multiple client websites. Managed complete project lifecycle including planning, UI design, development, deployment, and client support with high quality standards.'
      }
    ],
    projects: [
      {
        title: 'AI Business Partner',
        tech: ['Python', 'NLP', 'Flask', 'LLM APIs'],
        description: [
          'Developed an AI-powered business intelligence platform capable of generating strategic insights, business analysis, and intelligent recommendations.',
          'Implemented conversational AI to assist entrepreneurs through interactive business advisory experiences.',
          'Integrated REST APIs for live market information and structured reporting.'
        ],
        tag: 'Artificial Intelligence'
      },
      {
        title: 'AI Echo Soul',
        tech: ['Python', 'Deep Learning', 'NLP', 'Sentiment Analysis'],
        description: [
          'Built an empathetic conversational AI capable of understanding emotions using sentiment analysis.',
          'Designed contextual conversations with multi-turn memory and real-time processing.',
          'Focused on creating emotionally intelligent AI interactions.'
        ],
        tag: 'Deep Learning & NLP'
      },
      {
        title: 'Medical Website Development',
        tech: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
        description: [
          'Designed and developed a fully responsive medical information portal.',
          'Created modern UI/UX with intuitive navigation.',
          'Optimized performance and SEO for improved accessibility and user experience.'
        ],
        tag: 'Web Development'
      },
      {
        title: 'Smart Solution Hackathon Project',
        tech: ['Python', 'Machine Learning', 'Rapid Prototyping'],
        description: [
          'Designed and developed a working prototype under strict hackathon timelines.',
          'Collaborated with team members to deliver a complete solution and successfully present the final project.'
        ],
        tag: 'Machine Learning'
      },
      {
        title: 'Freelance Web Development',
        tech: ['Full Stack Web', 'UI/UX Design', 'Client Deployment'],
        description: [
          'Successfully delivered multiple client websites.',
          'Managed complete project lifecycle including planning, UI design, development, deployment, and client support.',
          'Delivered quality work within deadlines while maintaining professional standards.'
        ],
        tag: 'Full Stack'
      }
    ],
    education: [
      {
        degree: 'Bachelor of Technology (B.Tech)',
        field: 'Artificial Intelligence and Data Science',
        institution: 'Dhanalakshmi Srinivasan Engineering College',
        year: '2023 – 2027',
        status: 'Third Year Undergraduate Student (3rd Year)'
      }
    ],
    certificates: [
      {
        title: 'Full Stack Development',
        description: 'Comprehensive certification covering frontend and backend technologies.'
      },
      {
        title: 'Presenting Data',
        description: 'Certification focused on data visualization and effective presentation of analytical insights.'
      }
    ],
    strengths: [
      'Confident',
      'Strong Communication',
      'Time Management',
      'High Initiative',
      'Team Motivation',
      'Deadline Driven',
      'Problem Solving',
      'Quick Learner'
    ],
    languages: ['Tamil', 'English'],
    achievements: [
      'Founded Network Navigator Pioneers (NNP) digital innovation ecosystem.',
      'Developed innovative AI Business Partner & AI Echo Soul projects.',
      'Delivered multiple commercial freelance web platforms with high satisfaction.'
    ],
    contact: {
      email: 'moahmeedmohai2020@gmail.com',
      phone: '+91 90035 73340',
      location: 'Tamil Nadu, India',
      linkedin: 'https://www.linkedin.com/in/mohamed-naseem-m-872445342?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      github: 'https://github.com/MohamedNaseem-M'
    }
  },
  {
    id: '2',
    name: 'S. Jasim Ahamed',
    slug: 'jasim-ahamed',
    designation: 'Founder & CTO',
    executiveRole: 'Chief Technology Officer',
    professionalTitle: 'Full-Stack Web Developer',
    responsibility: 'Leads technology, AI innovation, software architecture, and engineering.',
    image: '/assets/images/team/jasim-ahamed.jpg',
    avatarPlaceholder: 'JA',
    avatarGradient: 'from-cyan-500 via-blue-600 to-indigo-700',
    aboutParagraphs: [
      'Passionate Full-Stack Web Developer with a strong interest in building scalable, secure, and user-friendly web applications.',
      'Experienced in modern web technologies through academic projects and internship experience. Dedicated to creating high-quality digital solutions using modern development practices.'
    ],
    careerObjective: 'Final Year Computer Science and Engineering student seeking an entry-level Full Stack Developer role. Skilled in the MERN Stack with practical project and internship experience. Passionate about developing reliable, scalable, and user-friendly web applications while continuously learning new technologies.',
    skillCategories: [
      {
        category: 'Programming Languages',
        skills: ['Java (Basics)', 'JavaScript (ES6+)']
      },
      {
        category: 'Frontend Development',
        skills: ['HTML5', 'CSS3', 'React.js', 'Responsive Web Design']
      },
      {
        category: 'Database Systems',
        skills: ['MySQL', 'SQLite', 'MongoDB']
      },
      {
        category: 'Developer Tools & Practices',
        skills: ['Git', 'GitHub', 'REST APIs', 'MERN Stack']
      }
    ],
    experience: [
      {
        role: 'Chief Technology Officer',
        company: 'Network Navigator Pioneers (NNP)',
        period: '2024 - Present',
        description: 'Overseeing technology strategy, AI platform development, cloud architecture, and engineering standards across the NNP ecosystem.'
      },
      {
        role: 'Web Development Intern',
        company: 'CodeBind Technologies, Trichy',
        period: 'July 2025 – August 2025',
        description: 'Built responsive web pages using HTML, CSS, and JavaScript. Collaborated with development teams on real-world projects using Git/GitHub while following industry-standard coding practices and debugging techniques.'
      }
    ],
    projects: [
      {
        title: 'Clinic Management System',
        tech: ['React.js', 'MongoDB', 'REST APIs', 'Node.js', 'Express.js'],
        description: [
          'Developed a complete Clinic Management System with role-based dashboards for Doctors, Receptionists, and Pharmacy users.',
          'Implemented Patient Registration, Token Management, and Appointment Scheduling.',
          'Built Digital Prescription Management, Billing System, and Secure Authentication.',
          'Created a responsive, intuitive user interface for seamless clinical workflows.'
        ],
        tag: 'Full-Stack MERN'
      },
      {
        title: 'Business Management System',
        tech: ['HTML5', 'CSS3', 'PHP', 'MySQL'],
        description: [
          'Built a comprehensive business management portal for handling operations, records, and database queries.',
          'Integrated secure database management with structured backend scripts.'
        ],
        tag: 'Web & Database'
      }
    ],
    education: [
      {
        degree: 'Bachelor of Technology (B.Tech)',
        field: 'Computer Science and Engineering',
        institution: 'Dhanalakshmi Srinivasan University',
        year: '2023 – 2027',
        status: 'Final Year Student'
      },
      {
        degree: 'Higher Secondary Certificate (HSC)',
        field: 'Higher Secondary Education',
        institution: 'Government Model Higher Secondary School',
        year: '2021 – 2023',
        status: 'Completed'
      }
    ],
    certificates: [
      {
        title: 'Web Development Internship & Implant Training',
        description: 'CodeBind Technologies hands-on Web Development & Business Management System completion (HTML, CSS, PHP, MySQL).'
      },
      {
        title: 'Applied AI – Statistics to NLP',
        description: 'GUVI online certification covering AI fundamentals and NLP.'
      },
      {
        title: 'ChatGPT for Everyone',
        description: 'GUVI online certification on LLMs and generative AI tools.'
      },
      {
        title: 'Introduction to Data Analytics',
        description: 'IBM professional online certification in data analytics principles.'
      },
      {
        title: 'Cybersecurity Foundations',
        description: 'BCBUZZ certification in fundamental security protocols.'
      },
      {
        title: 'Workshops & Aptitude Training',
        description: 'Artificial Intelligence Workshop & Corporate Placement Aptitude Training.'
      }
    ],
    strengths: [
      'Full-Stack MERN',
      'System Architecture',
      'Code Optimization',
      'Team Collaboration',
      'Problem Solving',
      'Continuous Learning'
    ],
    languages: ['English', 'Tamil'],
    achievements: [
      'Co-founded Network Navigator Pioneers (NNP) and leading technical architecture.',
      'Developed complete MERN stack Clinic Management System with role-based dashboards.',
      'Completed Web Development Internship at CodeBind Technologies.'
    ],
    contact: {
      email: 'sabeerjasim1233@gmail.com',
      phone: '+91 80565 95689',
      location: 'Tamil Nadu, India',
      linkedin: 'https://www.linkedin.com/in/jasim-ahamed-791a80296',
      github: 'https://github.com/jasimstack'
    }
  },
  {
    id: '3',
    name: 'M. Mohamed Rasith',
    slug: 'mohamed-rasith',
    designation: 'Founder & COO',
    executiveRole: 'Chief Operating Officer',
    professionalTitle: 'Full Stack Developer (MERN)',
    responsibility: 'Oversees company operations, project execution, and team coordination.',
    image: '/assets/images/team/mohamed-rasith.jpg',
    avatarPlaceholder: 'MR',
    avatarGradient: 'from-emerald-500 via-teal-600 to-cyan-700',
    aboutParagraphs: [
      'Passionate Full Stack Developer pursuing a Bachelor of Technology in Artificial Intelligence and Data Science. Experienced in building responsive and scalable web applications using the MERN Stack, database management, and business analytics.',
      'Possesses internship experience in Deep Learning, Full Stack Development, and Business Analytics with a strong focus on problem-solving, debugging, collaboration, and delivering practical software solutions.'
    ],
    careerObjective: 'A dedicated Full Stack Developer with expertise in developing modern web applications using MongoDB, Express.js, React.js, and Node.js. Committed to building reliable, responsive, and user-centric applications while continuously improving technical skills in Artificial Intelligence, Data Analytics, and Full Stack Development.',
    skillCategories: [
      {
        category: 'Programming Languages',
        skills: ['Java (Basic)', 'JavaScript']
      },
      {
        category: 'Frontend Development',
        skills: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Responsive Design']
      },
      {
        category: 'Backend & Database',
        skills: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB']
      },
      {
        category: 'Tools & Platforms',
        skills: ['MERN Stack', 'Tableau', 'Git', 'GitHub', 'Visual Studio Code']
      },
      {
        category: 'Core Competencies',
        skills: ['Full Stack Development', 'Database Management', 'Data Analytics', 'Debugging & Testing', 'Problem Solving', 'Team Collaboration']
      }
    ],
    experience: [
      {
        role: 'Chief Operating Officer',
        company: 'Network Navigator Pioneers (NNP)',
        period: '2024 - Present',
        description: 'Managing end-to-end operational efficiency, client execution lifecycles, project governance, and internal team coordination.'
      },
      {
        role: 'Deep Learning Intern',
        company: 'TRIOS Technologies Pvt. Ltd.',
        period: '2024',
        description: 'Worked on Deep Learning concepts and Artificial Intelligence applications. Gained practical experience in model design and implementation.'
      },
      {
        role: 'Full Stack Development Intern',
        company: 'F5 Coders',
        period: '2024',
        description: 'Worked on frontend, backend, and database integration using the MERN Stack. Contributed to complete end-to-end web application development.'
      },
      {
        role: 'Business Analytics Intern',
        company: 'Cognifyz Technologies',
        period: '2024',
        description: 'Worked on business analytics, reporting, and data visualization using Tableau and analytics tools. Supported data-driven decision-making.'
      }
    ],
    projects: [
      {
        title: 'Hospital Management Portal',
        tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST APIs'],
        description: [
          'Built a complete Hospital Management Portal using the MERN Stack.',
          'Implemented Patient Record Management and Appointment Scheduling.',
          'Created Doctor–Patient Communication channels and REST API services.',
          'Integrated MongoDB database schemas with a clean, responsive user interface.'
        ],
        tag: 'Full Stack MERN'
      },
      {
        title: 'Student Sync Space',
        tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
        description: [
          'Developed a collaborative student platform for academic management, communication, and resource sharing.',
          'Implemented responsive React components and RESTful backend services for seamless real-time data updates.'
        ],
        tag: 'MERN Collaboration'
      }
    ],
    education: [
      {
        degree: 'Bachelor of Technology (B.Tech)',
        field: 'Artificial Intelligence & Data Science',
        institution: 'Nandha Engineering College',
        year: '2023 – 2027',
        status: 'Undergraduate Student (CGPA: 7.7 / 10)'
      }
    ],
    certificates: [
      {
        title: 'Full Stack Development',
        description: 'F5 Coders certification in end-to-end MERN Stack application building.'
      },
      {
        title: 'MongoDB Basics',
        description: 'MongoDB Skills certification covering NoSQL database management & queries.'
      },
      {
        title: 'Business Analytics',
        description: 'Cognifyz Technologies certification in data visualization and reporting.'
      }
    ],
    strengths: [
      'Full Stack MERN',
      'Database Management',
      'Business Analytics',
      'Debugging & Testing',
      'Problem Solving',
      'Team Collaboration'
    ],
    languages: ['English', 'Tamil'],
    achievements: [
      'Co-founded Network Navigator Pioneers (NNP) and leading company operations.',
      'Completed triple internships in Deep Learning (TRIOS), Full Stack (F5 Coders), and Business Analytics (Cognifyz).',
      'Developed Hospital Management Portal and Student Sync Space platforms.'
    ],
    contact: {
      email: 'mdrazzth@gmail.com',
      phone: '+91 63694 84756',
      location: 'Tamil Nadu, India',
      linkedin: 'https://www.linkedin.com/in/md-rasith?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      github: 'https://github.com/Rasith-27'
    }
  },
  {
    id: '4',
    name: 'S. Mahamood Majin',
    slug: 'mahamood-majin',
    designation: 'Founder & CPO',
    executiveRole: 'Chief Product Officer',
    professionalTitle: 'Artificial Intelligence & Data Science Student • Data Analytics Enthusiast • Python Developer',
    responsibility: 'Leads product strategy, user experience, and feature development.',
    image: '/assets/images/team/mahamood-majin.jpg',
    avatarPlaceholder: 'SM',
    avatarGradient: 'from-amber-500 via-rose-600 to-purple-600',
    aboutParagraphs: [
      'Passionate Artificial Intelligence and Data Science student with hands-on experience in Python, SQL, Data Analytics, and Machine Learning fundamentals.',
      'Completed a Data Analytics internship at Thiranex, gaining practical experience in real-world data analysis workflows. Experienced in building practical applications including a CGPA Calculator, Job Prediction System, Clinic Management System, and a Personal AI Assistant.',
      'Interested in Data Analytics, Business Intelligence, Artificial Intelligence, and solving real-world problems through data-driven solutions.'
    ],
    careerObjective: 'A dedicated AI & Data Science undergraduate with a strong foundation in statistics, database management, machine learning, and data analysis. Focused on transforming raw data into meaningful insights while developing intelligent software solutions through automation and analytical thinking.',
    skillCategories: [
      {
        category: 'Programming Languages',
        skills: ['Python']
      },
      {
        category: 'Database & Data Analytics',
        skills: ['SQL (Basics)', 'Data Analysis', 'Database Management (DBMS)']
      },
      {
        category: 'Tools & Platforms',
        skills: ['Git', 'GitHub', 'Visual Studio Code']
      },
      {
        category: 'Cloud & AI Foundations',
        skills: ['AWS Fundamentals', 'Machine Learning Basics', 'NLP Basics', 'Problem Solving']
      }
    ],
    experience: [
      {
        role: 'Chief Product Officer',
        company: 'Network Navigator Pioneers (NNP)',
        period: '2024 - Present',
        description: 'Directing global product design language, feature prioritization, UX engineering, product roadmap planning, and analytical user research.'
      },
      {
        role: 'Data Analytics Intern',
        company: 'Thiranex',
        period: '15 June 2026 – 14 July 2026',
        description: 'Worked on real-world data analytics workflows including data collection, cleaning, analysis, and visualization while gaining practical industry experience.'
      }
    ],
    projects: [
      {
        title: 'Job Prediction Using CGPA and Skills',
        tech: ['Python', 'Machine Learning', 'Data Analysis'],
        description: [
          'Developed a machine learning model that analyzes academic performance and skill-based datasets to recommend suitable job roles.',
          'Built and evaluated a classification model capable of generating intelligent career recommendations.'
        ],
        tag: 'Machine Learning (Completed)'
      },
      {
        title: 'CGPA Calculator',
        tech: ['Python', 'Data Processing'],
        description: [
          'Developed a Python application to calculate CGPA accurately using subject grades and credit information.',
          'Automated academic performance analysis while reducing manual calculation errors.'
        ],
        tag: 'Python App (Completed)'
      },
      {
        title: 'Clinic Management System',
        tech: ['Python', 'SQL'],
        description: [
          'Designing a database-driven clinic management system to manage patient records, appointments, billing, and operational reports.',
          'Focused on structured data handling and process automation.'
        ],
        tag: 'Database System (In Progress)'
      },
      {
        title: 'Personal AI Assistant',
        tech: ['Python', 'NLP Basics'],
        description: [
          'Developing a Python-based AI Assistant capable of understanding user queries and generating relevant responses.',
          'Exploring Natural Language Processing, text preprocessing, pattern recognition, and real-time automation.'
        ],
        tag: 'AI & NLP (In Progress)'
      }
    ],
    education: [
      {
        degree: 'Bachelor of Technology (B.Tech)',
        field: 'Artificial Intelligence and Data Science',
        institution: 'Dhanalakshmi Srinivasan Engineering College, Perambalur',
        year: '2024 – 2028',
        status: 'Undergraduate Student (CGPA: 8.08)'
      }
    ],
    certificates: [
      {
        title: 'Data Analytics Internship',
        description: 'Thiranex industry internship in data collection, cleaning, analysis & visualization.'
      },
      {
        title: 'AI for Beginners',
        description: 'HP LIFE professional credential in AI fundamentals.'
      },
      {
        title: 'Presenting Data',
        description: 'HP LIFE certification in data visualization techniques.'
      },
      {
        title: 'AI in Action (Job Simulation)',
        description: 'Forage job simulation in practical AI implementation.'
      },
      {
        title: 'Designing & Implementing Microsoft Azure AI Solution',
        description: 'Genius Academy 40-hour intensive Azure AI credential.'
      }
    ],
    strengths: [
      'Data Analytics',
      'Business Intelligence',
      'Python Automation',
      'Machine Learning',
      'Data Visualization',
      'Problem Solving'
    ],
    languages: ['English', 'Tamil'],
    achievements: [
      'Co-founded Network Navigator Pioneers (NNP) and leading product strategy.',
      'Achieved CGPA 8.08 in B.Tech Artificial Intelligence and Data Science.',
      'Completed Data Analytics Internship at Thiranex & 40-Hour Microsoft Azure AI Training.'
    ],
    contact: {
      email: 'mahamoodmajin122@gmail.com',
      phone: '+91 78268 31126',
      location: 'Tamil Nadu, India',
      linkedin: 'https://www.linkedin.com/in/mahamood-majin-s-b59441342',
      github: 'https://github.com/mahamoodmajin183-ui'
    }
  },
  {
    id: '5',
    name: 'V. Prakash',
    slug: 'prakash',
    designation: 'Co-Founder & CFO',
    executiveRole: 'Chief Financial Officer',
    professionalTitle: 'Software Developer • Full Stack Web Developer',
    responsibility: 'Manages finance, budgeting, investments, and business planning.',
    avatarPlaceholder: 'VP',
    avatarGradient: 'from-violet-600 via-purple-600 to-pink-600',
    aboutParagraphs: [
      'Passionate Software Developer with practical experience in building modern full-stack web applications using Java, JavaScript, React, Node.js, Express.js, and MongoDB.',
      'Experienced in freelance software development, RESTful API development, Object-Oriented Programming, and scalable application architecture.',
      'Committed to building reliable software products while continuously learning modern technologies and software engineering best practices.'
    ],
    careerObjective: 'A Full Stack Software Developer with experience delivering production-ready web applications through freelance projects. Strong knowledge of Java, MERN Stack, REST APIs, Object-Oriented Programming, Low-Level Design, and modern software development workflows.',
    skillCategories: [
      {
        category: 'Programming Languages',
        skills: ['Java', 'JavaScript', 'SQL']
      },
      {
        category: 'Frontend Development',
        skills: ['React', 'HTML5', 'CSS3']
      },
      {
        category: 'Backend Development',
        skills: ['Core Java', 'Node.js', 'Express.js', 'Socket.io', 'RESTful APIs']
      },
      {
        category: 'Database Systems',
        skills: ['MongoDB', 'MySQL']
      },
      {
        category: 'Software Engineering Concepts',
        skills: ['Object-Oriented Programming (OOP)', 'Low-Level Design (LLD)', 'System Design Fundamentals']
      },
      {
        category: 'Developer Tools',
        skills: ['Git', 'GitHub', 'Postman', 'IntelliJ IDEA', 'Docker']
      }
    ],
    experience: [
      {
        role: 'Co-Founder & Chief Financial Officer',
        company: 'Network Navigator Pioneers (NNP)',
        period: '2024 - Present',
        description: 'Overseeing corporate financial strategy, venture budgeting, investment modeling, and capital growth strategy across NNP operations.'
      },
      {
        role: 'Freelance Full Stack Developer',
        company: 'Self-Employed',
        period: 'May 2026 – Present',
        description: 'Developed a production-ready Clinic Management System digitizing Patient Registration, Appointments, Billing, Pharmacy, and EMR with AI Prescription OCR. Managed end-to-end client requirements through deployment.'
      }
    ],
    projects: [
      {
        title: 'Clinic Management System',
        tech: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'REST APIs'],
        description: [
          'Developed a complete Clinic Management System for healthcare organizations.',
          'Implemented Patient Registration, Appointment Scheduling, Billing System, and Electronic Medical Records (EMR).',
          'Integrated AI Prescription OCR and built responsive dashboards with REST API integration.',
          'Focused on performance optimization, scalable architecture, and production deployment.'
        ],
        tag: 'Full Stack MERN'
      },
      {
        title: 'Real Time Chat Application',
        tech: ['MERN Stack', 'JWT Authentication', 'Docker', 'Azure Web Apps', 'Vercel'],
        description: [
          'Built a secure real-time messaging application supporting One-to-One Messaging and JWT Authentication.',
          'Implemented persistent chat history, optimized MongoDB queries, and cloud deployment.'
        ],
        tag: 'Real-Time MERN'
      },
      {
        title: 'Vendor Lifecycle Management System',
        tech: ['Java', 'Object-Oriented Programming', 'Layered Architecture'],
        description: [
          'Developed a Vendor Lifecycle Management System automating Vendor Onboarding, Approval Workflow, and Profile Management.',
          'Applied SOLID Principles, Low-Level Design (LLD), Modular Architecture, and Scalable Database Design.'
        ],
        tag: 'Core Java & LLD'
      }
    ],
    education: [
      {
        degree: 'Bachelor of Technology (B.Tech)',
        field: 'Information Technology',
        institution: 'Rajalakshmi Engineering College, Chennai, Tamil Nadu',
        year: 'Graduation Year: 2023',
        status: 'Completed (CGPA: 7.67)'
      },
      {
        degree: 'Higher Secondary Education (HSC)',
        field: 'Higher Secondary',
        institution: 'Green Park Matric Higher Secondary School, Tholudur',
        year: '2021 – 2023',
        status: 'Completed (Score: 91.66%)'
      }
    ],
    certificates: [
      {
        title: 'Freelance Full Stack Production Delivery',
        description: 'Hands-on production web application development with React, Node.js, and MongoDB.'
      },
      {
        title: 'Object-Oriented & Low-Level System Design',
        description: 'Core Java, SOLID principles, modular architecture, and layered software design.'
      }
    ],
    strengths: [
      'Java & OOP',
      'Low-Level Design (LLD)',
      'Full Stack MERN',
      'System Architecture',
      'Problem Solving',
      'Hackathon Innovations'
    ],
    languages: ['English', 'Tamil'],
    achievements: [
      'Co-founded Network Navigator Pioneers (NNP) and leading corporate CFO financial strategy.',
      'Participated in Smart India Hackathon (SIH), TN Impact, and VIT Hackathon.',
      'Delivered production-ready Clinic Management System with AI Prescription OCR & Real-Time Chat App.'
    ],
    contact: {
      email: 'prakasuvelmurugan@gmail.com',
      phone: '+91 89404 04036',
      location: 'Chennai / Tamil Nadu, India',
      linkedin: 'https://www.linkedin.com/in/prakasuv',
      github: 'https://github.com/PrakasuV54'
    }
  },
  {
    id: '5',
    name: 'A. Reihana Parveen',
    slug: 'reihana-parveen',
    designation: 'Manager',
    executiveRole: 'Manager',
    professionalTitle: 'B.Tech Graduate • Python Developer • Operations & Team Manager',
    responsibility: 'Motivated and enthusiastic BTech graduate driving organizational growth, operational efficiency, and team coordination.',
    image: '/assets/images/team/reihana-parveen.jpg',
    avatarPlaceholder: 'RP',
    avatarGradient: 'from-purple-600 via-pink-600 to-rose-600',
    aboutParagraphs: [
      'Motivated and enthusiastic B.Tech graduate with strong technical knowledge in Python and problem-solving skills. Passionate about applying my skills in a dynamic work environment and contributing to organizational growth.',
      'Experienced in designing hardware systems such as sensor-based Obstacles Avoiding Cars, as well as building AI-driven decision-making systems like the AI Business Partner to streamline organizational strategy.'
    ],
    careerObjective: 'Motivated and enthusiastic BTech graduate seeking to apply strong Python technical knowledge and problem-solving skills to manage project workflows, support team objectives, and drive organizational growth.',
    skillCategories: [
      {
        category: 'Programming Languages',
        skills: ['Python Programming']
      },
      {
        category: 'Office & Productivity',
        skills: ['MS Office']
      },
      {
        category: 'Core Competencies',
        skills: ['Communication Skills', 'Teamwork', 'Problem Solving']
      }
    ],
    experience: [
      {
        role: 'Manager',
        company: 'Network Navigator Pioneers (NNP)',
        period: '2024 – Present',
        description: 'Overseeing organizational workflow execution, client project coordination, operational standards, and cross-functional team alignment.'
      }
    ],
    projects: [
      {
        title: 'Obstacles Avoiding Car (Mini Project)',
        tech: ['Python', 'Sensors', 'Hardware Automation'],
        description: [
          'Designed and developed an automated system to detect and avoid obstacles using hardware sensors and intelligent control algorithms.'
        ],
        tag: 'Hardware & Automation'
      },
      {
        title: 'AI Business Partner (Main Project)',
        tech: ['Python', 'Artificial Intelligence', 'Decision Intelligence'],
        description: [
          'Built an AI-based system to assist businesses and startups in automated decision-making and strategic planning.'
        ],
        tag: 'AI & Decision Support'
      }
    ],
    education: [
      {
        degree: 'Bachelor of Technology (B.Tech)',
        field: 'Engineering & Technology',
        institution: 'Dhanalakshmi Srinivasan Engineering College, Perambalur',
        year: '2024',
        status: 'Graduated'
      },
      {
        degree: 'Higher Secondary (12th)',
        field: 'Higher Secondary Education',
        institution: 'Sri Ramakrishna Matric Higher Secondary School',
        year: '2023',
        status: 'Completed'
      },
      {
        degree: 'SSLC (10th)',
        field: 'Secondary School Certificate',
        institution: 'Sri Ramakrishna Matric Higher Secondary School',
        year: '2021',
        status: 'Completed'
      }
    ],
    certificates: [
      {
        title: 'Full Stack Development',
        description: 'Comprehensive professional certification covering end-to-end web application architecture and modern software development.'
      }
    ],
    strengths: [
      'Python Programming',
      'Teamwork & Leadership',
      'Communication Skills',
      'Problem Solving',
      'MS Office Suite',
      'Project Management'
    ],
    languages: ['Tamil', 'English'],
    achievements: [
      'Appointed as Manager at Network Navigator Pioneers (NNP).',
      'Developed AI Business Partner decision assistance platform and Obstacles Avoiding Car project.',
      'Completed Full Stack Development Professional Certification.'
    ],
    contact: {
      email: 'reihanasalam106@gmail.com',
      phone: '+91 63806 52285',
      location: 'Perambalur, Tamil Nadu, India',
      linkedin: 'https://www.linkedin.com/in/reihana-parveen-a-2919ba342?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      github: ''
    }
  }
];

export function getTeamMembers(): TeamMember[] {
  return TEAM_MEMBERS;
}

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return TEAM_MEMBERS.find((m) => m.slug.toLowerCase() === slug.toLowerCase());
}
