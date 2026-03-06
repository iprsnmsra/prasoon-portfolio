// src/data/projects.ts

export const personalInfo = {
  name: "Prasoon Mishra",
  role: "Full-Stack Developer & Game Enthusiast",
  location: "Lucknow, UP, India",
  email: "prasoonmishra9c@gmail.com",
  avatarUrl: "/iamp.jpg", // Make sure your image is named iamp.jpg in the public folder!
  socials: {
    github: "https://github.com/Mr-DaRkAgeNt",
    linkedin: "https://www.linkedin.com/in/prasoon-mishra-798351327",
    instagram: "https://instagram.com/iprsnmsra",
  }
};

export const projects = [
  { 
    id: 1, 
    title: "Kestrel AI Threat Analyzer", 
    category: "Cybersecurity / AI", 
    description: "An AI-driven threat analysis tool. Secured 3rd place at the HackSecure Hackathon.", 
    tech: ["React", "Node.js", "AI", "Cybersecurity"], 
    githubUrl: "https://github.com/Mr-DaRkAgeNt/Kestrel-AI", 
    liveUrl: "" 
  },
  { 
    id: 2, 
    title: "EY Hackathon Chatbot", 
    category: "AI / Web", 
    description: "Developed a functional chatbot prototype for Tata Capital during the EY Hackathon.", 
    tech: ["MERN Stack", "AI Integration"], 
    githubUrl: "https://github.com/Mr-DaRkAgeNt/TataChatbot", 
    liveUrl: "https://tatachatbot.example.com" 
  },
  { 
    id: 3, 
    title: "RetroSync-Engine", 
    category: "Full-Stack", 
    description: "A collaborative, real-time code editor built for seamless developer interaction.", 
    tech: ["React", "WebSockets", "Node.js"], 
    githubUrl: "https://github.com/Mr-DaRkAgeNt/RetroSync", 
    liveUrl: "" 
  },
  { 
    id: 4, 
    title: "Aero-Box", 
    category: "Hackathon Build", 
    description: "Currently in development for the AMD Slingshot Hackathon.", 
    tech: ["Next.js", "Hardware Integration"], 
    githubUrl: "#", 
    liveUrl: "" 
  }
];

export const gymImages = [
  "/gym/gym_1.jpg", 
  "/gym/gym_2.jpg", 
  "/gym/gym_3.jpg", 
  "/gym/gym_4.jpg", 
  "/gym/gym_5.jpg", 
];

export const detailedCertifications = [
  {
    id: 1,
    title: "AWS AI Practitioner",
    issuer: "Amazon Web Services",
    date: "Aug 2024",
    credentialId: "AWS-AI-123456",
    credentialUrl: "https://aws.amazon.com/credentials", 
    imageUrl: "/certs/aws_ai.png" 
  },
  {
    id: 2,
    title: "MERN Stack Certification",
    issuer: "Coursera / VIT Bhopal",
    date: "Jun 2024",
    credentialId: "VIT-MERN-7890",
    credentialUrl: "https://coursera.org/verify/xyz", 
    imageUrl: "/certs/mern_stack.png" 
  },
  {
    id: 3,
    title: "NPTEL IoT (Silver)",
    issuer: "SWAYAM NPTEL India",
    date: "May 2024",
    credentialId: "NPTEL-IOT-XYXY",
    credentialUrl: "#", 
    imageUrl: "/certs/nptel_iot.png" 
  },
];

export const freeResources = [
  {
    id: 1,
    title: "MERN Stack Cheat Sheet",
    description: "Essential syntax and architecture notes for MongoDB, Express, React, and Node.js.",
    type: "Cheat Sheet",
    fileUrl: "/notes/MERN_Cheatsheet.pdf"
  },
  {
    id: 2,
    title: "Cybersecurity Threat Handbooks",
    description: "Common attack vectors and AI-driven defense mechanisms for beginners.",
    type: "Handbook",
    fileUrl: "/notes/Cybersecurity_Threat_Handbook.pdf"
  },
  {
    id: 3,
    title: "Unity 3D Game Dev Guide",
    description: "My personal notes on C# scripting and environmental design in Unity.",
    type: "Notes",
    fileUrl: "/notes/Unity_Game_Dev_Notes.pdf"
  }
];