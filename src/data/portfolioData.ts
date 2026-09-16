export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  category: 'Full Stack' | 'Frontend' | 'Mobile' | 'Tools';
  frontendUrl?: string;
  backendUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  image: string;
  highlights: string[];
}

export interface SkillCategory {
  category: string;
  iconName: string;
  skills: { name: string; level: number; tag?: string }[];
}

export interface CompetitiveStat {
  platform: string;
  solved: string;
  profileUrl: string;
  badge: string;
  topics: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Ravi Tiwari",
    role: "Full-Stack Software Developer",
    statusBadge: "Open to Full-Time Roles & Internships",
    location: "India",
    email: "raviashoktiwari9559@gmail.com",
    mobile: "+91 8957181088",
    github: "https://github.com/Ravi024tiwari",
    leetcode: "https://leetcode.com/u/Ravi_Tiwari2005/",
    gfg: "https://www.geeksforgeeks.org/profile/raviashoktkrsk",
    bio: "Full-Stack Software Engineer specializing in high-performance web applications using Next.js, TypeScript, PostgreSQL, and Node.js. Experienced in designing scalable backend systems and fluid, responsive interfaces, backed by a strong foundation in algorithmic problem-solving (800+ LeetCode problems solved).",
    summaryBullets: [
      "Currently engaged in a professional software development internship.",
      "Solved 800+ DSA problems on LeetCode & 100+ on GeeksforGeeks in C++.",
      "Expertise in Next.js, MERN stack, TypeScript & MongoDB Geospatial Indexing.",
      "Building high-performance web systems, RESTful APIs, and scalable architectures.",
      "Skilled in modern state management, real-time WebSockets, and secure integrations."
    ]
  },

  stats: [
    { label: "LeetCode Solved", value: "800+", detail: "C++ Data Structures & Algo" },
    { label: "GeeksforGeeks", value: "100+", detail: "Algorithms & Problem Solving" },
    { label: "Core Focus", value: "MERN + Next.js", detail: "TypeScript, SSR, REST APIs" },
    { label: "Geospatial & Realtime", value: "Razorpay / Socket", detail: "Full Stack Systems" }
  ],

  competitiveProgramming: [
    {
      platform: "LeetCode",
      solved: "800+ Problems",
      profileUrl: "https://leetcode.com/u/Ravi_Tiwari2005/",
      badge: "Top Solver",
      topics: ["Dynamic Programming", "KMP Algorithm", "DFS & Tree Traversal", "Vector Pair Sorting", "Graph Theory"]
    },
    {
      platform: "GeeksforGeeks",
      solved: "100+ Problems",
      profileUrl: "https://www.geeksforgeeks.org/profile/raviashoktkrsk",
      badge: "Algorithm Specialist",
      topics: ["Data Structures", "Divide & Conquer", "Matrix Manipulations", "Greedy Algorithms"]
    }
  ],

  skillCategories: [
    {
      category: "Languages",
      iconName: "Code2",
      skills: [
        { name: "TypeScript", level: 92, tag: "Primary Production" },
        { name: "C++", level: 95, tag: "Competitive Programming" },
        { name: "JavaScript (ES6+)", level: 90, tag: "Core Web" },
        { name: "HTML5 / CSS3", level: 90, tag: "UI Layouts" }
      ]
    },
    {
      category: "Frontend Web",
      iconName: "Layout",
      skills: [
        { name: "React.js", level: 92, tag: "UI Components" },
        { name: "Next.js 14/15", level: 88, tag: "App Router / SSR" },
        { name: "Tailwind CSS", level: 94, tag: "Utility Styling" },
        { name: "Framer Motion", level: 85, tag: "Micro-Animations" }
      ]
    },
    {
      category: "Backend & Database",
      iconName: "Server",
      skills: [
        { name: "Node.js", level: 90, tag: "Runtime Architecture" },
        { name: "Express.js", level: 90, tag: "REST APIs" },
        { name: "MongoDB", level: 88, tag: "Geospatial Indexing & Mongoose" },
        { name: "PostgreSQL", level: 85, tag: "Relational DB & SQL" },
        { name: "Socket.io", level: 86, tag: "Real-Time WebSockets" }
      ]
    },
    {
      category: "Tools & Integrations",
      iconName: "Wrench",
      skills: [
        { name: "Razorpay API", level: 88, tag: "Payment Gateways" },
        { name: "Vercel Serverless", level: 90, tag: "Edge & Serverless Deployment" },
        { name: "Git & GitHub", level: 92, tag: "Version Control" },
        { name: "Postman", level: 88, tag: "API Testing" }
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: "local-service-management",
      title: "Local Service Management Platform",
      tagline: "Role-Based Discovery Platform with Geospatial Radius Matching & Razorpay Payments",
      description: "A comprehensive service discovery ecosystem supporting Customer, Provider, and Admin roles. Utilizes MongoDB geospatial indexing ($near 20km radius queries) to connect clients with nearby verified professionals, featuring seamless Razorpay online payment integration.",
      techStack: ["MERN Stack", "TypeScript", "Geospatial Indexing", "Razorpay API", "MongoDB", "Express", "Node.js"],
      category: "Full Stack",
      frontendUrl: "https://local-service-management-a9mr.vercel.app",
      backendUrl: "https://local-service-management-7dog.vercel.app",
      githubUrl: "https://github.com/Ravi024tiwari",
      featured: true,
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200&auto=format&fit=crop",
      highlights: [
        "Customer, Service Provider & Admin multi-role authentication flow",
        "Geospatial $near queries for 20km radius local service discovery",
        "Secure digital payment gateway integration via Razorpay API",
        "Full Mongoose strict typing & RESTful API architecture"
      ]
    },
    {
      id: "aura-chat-app",
      title: "AURA — Real-Time Chat Application",
      tagline: "Ultra-Fast Messaging Platform with WebSocket State Persistence",
      description: "A secure, lightning-fast real-time messaging application engineered with Socket.io and MERN stack. Features instant message delivery, online user presence tracking, persistent conversation history, and responsive UI.",
      techStack: ["MERN Stack", "Socket.io", "TypeScript", "Tailwind CSS", "React", "Node.js"],
      category: "Full Stack",
      liveUrl: "https://frontend-chatapp-rouge.vercel.app",
      githubUrl: "https://github.com/Ravi024tiwari",
      featured: true,
      image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=1200&auto=format&fit=crop",
      highlights: [
        "Bi-directional real-time chat via active Socket.io WebSockets",
        "User presence status & instant message delivery indicators",
        "State persistence for seamless chat session recovery",
        "Custom responsive dark-themed UI built with React & TypeScript"
      ]
    },
    {
      id: "library-management",
      title: "Library Management System",
      tagline: "Serverless Book Tracking & Inventory Governance Platform",
      description: "A complete end-to-end library governance platform automating book tracking, inventory management, user borrowing cycles, and fine calculations deployed on Vercel Serverless.",
      techStack: ["React.js", "Node.js", "Vercel Serverless", "Tailwind CSS", "Express API"],
      category: "Frontend",
      liveUrl: "https://library-management-8tjg.vercel.app",
      githubUrl: "https://github.com/Ravi024tiwari",
      featured: true,
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200&auto=format&fit=crop",
      highlights: [
        "Vercel Serverless backend execution for high scalability & zero idle cost",
        "Comprehensive inventory catalog with real-time stock availability",
        "User borrowing history & digital return tracking",
        "Intuitive admin portal for catalog updates"
      ]
    },

  ] as Project[],

  experienceTimeline: [
    {
      period: "Current - Present",
      title: "Software Development Intern",
      organization: "Software Engineering Team",
      type: "Work Experience",
      description: "Engaged in full-stack web application engineering using MERN stack, Next.js, TypeScript, and PostgreSQL. Participating in backend optimizations, API query tuning, and micro-interactive component design.",
      skills: ["React.js", "Next.js", "Node.js", "TypeScript", "MongoDB", "Git"]
    },
    {
      period: "2023 - 2027",
      title: "B.Tech in Computer Science & Engineering",
      organization: "Guru Ghasidas Vishwavidyalaya, Chhattisgarh, India",
      type: "Education & Certifications",
      description: "Currently pursuing B.Tech in CSE with a current grade of 8.5 CGPA. Focusing on core computer science fundamentals, design patterns, database management, and high-performance programming. Active competitive programmer with 800+ LeetCode problems solved.",
      skills: ["C++ Algorithms", "DSA", "System Design", "Database Management", "Problem Solving"]
    }
  ]
};
