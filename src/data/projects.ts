// src/data/projects.ts

export const personalInfo = {
  name: "Prasoon Mishra",
  role: "Full-Stack Developer & Competitive Programmer",
  tagline: "Building scalable systems. Solving algorithmic challenges. Leading communities.",
  email: "prasoonmishra9c@gmail.com",
  avatarUrl: "/iamp.jpg",
  socials: {
    github: "https://github.com/Mr-DaRkAgeNt",
    linkedin: "https://www.linkedin.com/in/prasoon-mishra-798351327",
    instagram: "https://instagram.com/iprsnmsra",
  },
};

export const greetings = [
  { text: "Namaste", lang: "Hindi" },
  { text: "Hello", lang: "English" },
  { text: "\u4F60\u597D", lang: "Chinese" },
  { text: "\u3053\u3093\u306B\u3061\u306F", lang: "Japanese" },
  { text: "Hola", lang: "Spanish" },
  { text: "Bonjour", lang: "French" },
  { text: "\u0645\u0631\u062D\u0628\u0627", lang: "Arabic" },
  { text: "\u0C28\u0C2E\u0C38\u0C4D\u0C24\u0C47", lang: "Telugu" },
  { text: "\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD", lang: "Tamil" },
  { text: "Ciao", lang: "Italian" },
  { text: "Ol\u00E1", lang: "Portuguese" },
  { text: "\u041F\u0440\u0438\u0432\u0435\u0442", lang: "Russian" },
  { text: "\uC548\uB155\uD558\uC138\uC694", lang: "Korean" },
  { text: "Hallo", lang: "German" },
  { text: "\u0E2A\u0E27\u0E31\u0E2A\u0E14\u0E35", lang: "Thai" },
  { text: "Xin ch\u00E0o", lang: "Vietnamese" },
  { text: "Merhaba", lang: "Turkish" },
  { text: "Hej", lang: "Swedish" },
  { text: "Sawubona", lang: "Zulu" },
  { text: "Aloha", lang: "Hawaiian" },
];

export const experiences = [
  {
    id: 1,
    company: "Google",
    role: "Gemini Student Ambassador",
    joinDate: "Joined July 2026",
    description: "Selected as a Google Gemini Student Ambassador to evangelize AI/ML tools and Google's Gemini ecosystem across campus. Organized workshops, hackathons, and study jams to help students leverage cutting-edge AI technologies.",
    logoPlaceholder: "/logos/google.png",
    imagePlaceholder: "/experience/google_welcome_kit.png",
  },
  {
    id: 2,
    company: "HackerRank",
    role: "Campus Ambassador",
    joinDate: "Joined 2024",
    description: "Appointed as the official HackerRank Campus Ambassador at VIT Bhopal. Promoting competitive programming culture, organizing coding challenges, and building a community of problem solvers.",
    logoPlaceholder: "/logos/hackerrank.png",
    imagePlaceholder: "/experience/hackerrank_welcome_kit.png",
  },
  {
    id: 3,
    company: "MERN Stack Club",
    role: "Club Lead",
    joinDate: "Joined 2024",
    description: "Leading the MERN Stack Club at VIT Bhopal, mentoring students in full-stack web development, organizing hands-on workshops and build-along sessions covering MongoDB, Express, React, and Node.js.",
    logoPlaceholder: "/logos/mernclub.png",
    imagePlaceholder: "/experience/mern_club.png",
  },
];

export const projectCategories = [
  { id: "core-cs", title: "Core CS Projects", description: "Full-stack applications, AI tools, and production systems", icon: "code" },
  { id: "blender", title: "Blender", description: "3D modeling, animation, and visual effects projects", icon: "cube" },
  { id: "game-dev", title: "Game Dev", description: "Unity & Unreal Engine game development projects", icon: "gamepad" },
  { id: "epic-creative", title: "Epic Creative Creations", description: "Design, art, and creative technology experiments", icon: "sparkles" },
];

export const categoryProjects: Record<string, Array<{
  id: number;
  title: string;
  description: string;
  techStack: string[];
  keyFeatures: string[];
  repoLink: string;
  liveLink: string;
}>> = {
  "core-cs": [
    { id: 1, title: "Kestrel AI Threat Analyzer", description: "An AI-driven threat analysis tool that identifies vulnerabilities and suggests remediation strategies. Secured 3rd place at the HackSecure Hackathon.", techStack: ["React", "Node.js", "AI/ML", "Cybersecurity", "Python"], keyFeatures: ["Real-time threat detection", "AI-powered vulnerability scanning", "Interactive dashboard", "Automated report generation"], repoLink: "https://github.com/Mr-DaRkAgeNt/Kestrel-AI", liveLink: "" },
    { id: 2, title: "EY Hackathon Chatbot", description: "A functional chatbot prototype for Tata Capital developed during the EY Hackathon. Handles customer queries with AI-powered natural language processing.", techStack: ["MERN Stack", "AI Integration", "NLP", "REST API"], keyFeatures: ["Natural language understanding", "Context-aware responses", "Multi-turn conversation support", "Analytics dashboard"], repoLink: "https://github.com/Mr-DaRkAgeNt/TataChatbot", liveLink: "https://tatachatbot.example.com" },
    { id: 3, title: "RetroSync-Engine", description: "A collaborative, real-time code editor built for seamless developer interaction with live synchronization.", techStack: ["React", "WebSockets", "Node.js", "Socket.io"], keyFeatures: ["Real-time collaboration", "Syntax highlighting", "Room-based sessions", "Code execution sandbox"], repoLink: "https://github.com/Mr-DaRkAgeNt/RetroSync", liveLink: "" },
    { id: 4, title: "Aero-Box", description: "Currently in development for the AMD Slingshot Hackathon. A hardware-software integration platform.", techStack: ["Next.js", "Hardware Integration", "IoT", "AMD SDK"], keyFeatures: ["Hardware-software bridge", "Real-time data streaming", "Custom dashboard", "IoT sensor integration"], repoLink: "#", liveLink: "" },
    { id: 5, title: "Portfolio Website", description: "This very portfolio — a manga-inspired professional website built with Next.js, featuring custom animations, dynamic routing, and a unique aesthetic.", techStack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"], keyFeatures: ["Manga-style design", "Dynamic project pages", "Multilingual greeting intro", "85% width responsive layout"], repoLink: "https://github.com/Mr-DaRkAgeNt/prasoon-portfolio", liveLink: "https://prsnmsra.vercel.app" },
  ],
  "blender": [
    { id: 1, title: "Sci-Fi Environment Scene", description: "A detailed sci-fi environment created in Blender with volumetric lighting and procedural textures.", techStack: ["Blender", "Cycles Renderer", "Procedural Textures"], keyFeatures: ["Volumetric lighting", "Procedural materials", "Post-processing compositing", "4K render output"], repoLink: "#", liveLink: "" },
    { id: 2, title: "Character Model — Luffy", description: "A stylized 3D model of Monkey D. Luffy from One Piece, rigged and ready for animation.", techStack: ["Blender", "Sculpting", "Rigging", "UV Mapping"], keyFeatures: ["Full body rig", "Facial expressions", "Anime-style shading", "Export-ready for Unity"], repoLink: "#", liveLink: "" },
    { id: 3, title: "Product Visualization", description: "Photorealistic product renders for a mock brand showcase, demonstrating commercial 3D visualization skills.", techStack: ["Blender", "HDRI Lighting", "PBR Materials"], keyFeatures: ["Photorealistic rendering", "Studio lighting setup", "Material library", "Turntable animation"], repoLink: "#", liveLink: "" },
    { id: 4, title: "Low-Poly Game Assets", description: "A collection of low-poly 3D assets designed for game environments, optimized for real-time rendering.", techStack: ["Blender", "Low-Poly Modeling", "Texture Atlas"], keyFeatures: ["Optimized polygon count", "Shared texture atlas", "Modular design", "Game-engine ready"], repoLink: "#", liveLink: "" },
    { id: 5, title: "Motion Graphics Reel", description: "A compilation of motion graphics and abstract animations created with Blender's geometry nodes.", techStack: ["Blender", "Geometry Nodes", "EEVEE Renderer"], keyFeatures: ["Geometry node setups", "Abstract animations", "Real-time preview", "Looping sequences"], repoLink: "#", liveLink: "" },
  ],
  "game-dev": [
    { id: 1, title: "Survival Horror Prototype", description: "A first-person survival horror game prototype built in Unity with AI-driven enemy behavior.", techStack: ["Unity", "C#", "NavMesh AI", "Post Processing"], keyFeatures: ["AI pathfinding", "Dynamic lighting", "Inventory system", "Save/Load system"], repoLink: "#", liveLink: "" },
    { id: 2, title: "2D Platformer — Pixel Quest", description: "A retro-styled 2D platformer with pixel art, procedural level generation, and boss fights.", techStack: ["Unity", "C#", "Pixel Art", "Tilemap"], keyFeatures: ["Procedural levels", "Boss AI patterns", "Parallax scrolling", "Soundtrack integration"], repoLink: "#", liveLink: "" },
    { id: 3, title: "Unreal FPS Multiplayer", description: "A multiplayer first-person shooter prototype built with Unreal Engine 5, featuring realistic graphics.", techStack: ["Unreal Engine 5", "C++", "Blueprints", "Lumen"], keyFeatures: ["Multiplayer networking", "Lumen global illumination", "Weapon system", "Matchmaking"], repoLink: "#", liveLink: "" },
    { id: 4, title: "AR Mobile Experience", description: "An augmented reality mobile app that places 3D objects in the real world using AR Foundation.", techStack: ["Unity", "AR Foundation", "C#", "Mobile"], keyFeatures: ["Plane detection", "3D object placement", "Gesture controls", "Cross-platform (iOS/Android)"], repoLink: "#", liveLink: "" },
    { id: 5, title: "Racing Game Prototype", description: "An arcade-style racing game with physics-based car handling and procedural track generation.", techStack: ["Unity", "C#", "Physics Engine", "Shader Graph"], keyFeatures: ["Vehicle physics", "Procedural tracks", "Custom shaders", "Leaderboard system"], repoLink: "#", liveLink: "" },
  ],
  "epic-creative": [
    { id: 1, title: "Manga-Style UI Kit", description: "A complete UI design kit inspired by manga and anime aesthetics, built for web applications.", techStack: ["Figma", "CSS", "SVG", "Framer Motion"], keyFeatures: ["Hand-drawn borders", "Ink splash effects", "Custom typography", "Dark/Light variants"], repoLink: "#", liveLink: "" },
    { id: 2, title: "One Piece Fan Art Gallery", description: "A digital art gallery featuring original One Piece fan art, created with digital painting tools.", techStack: ["Photoshop", "Procreate", "Digital Painting"], keyFeatures: ["Original artwork", "Interactive gallery", "High-resolution downloads", "Artist commentary"], repoLink: "#", liveLink: "" },
    { id: 3, title: "Animated Typography Experiment", description: "Creative typography animations exploring kinetic type, morphing letters, and text-as-art.", techStack: ["After Effects", "CSS Animations", "GSAP", "SVG"], keyFeatures: ["Kinetic typography", "Path animations", "Responsive design", "Performance optimized"], repoLink: "#", liveLink: "" },
    { id: 4, title: "Interactive Data Viz Dashboard", description: "A creative data visualization dashboard using D3.js with artistic, hand-drawn chart styles.", techStack: ["D3.js", "React", "SVG", "Canvas API"], keyFeatures: ["Hand-drawn chart style", "Real-time data", "Interactive filters", "Export functionality"], repoLink: "#", liveLink: "" },
    { id: 5, title: "Generative Art Collection", description: "A series of algorithm-generated artworks using p5.js, exploring the intersection of code and art.", techStack: ["p5.js", "JavaScript", "Canvas", "Algorithms"], keyFeatures: ["Algorithm-driven art", "Infinite variations", "Downloadable prints", "Open source code"], repoLink: "#", liveLink: "" },
  ],
};

export const skills = [
  { name: "React", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "TypeScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "C++", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "Python", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "MongoDB", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "Unity", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg" },
  { name: "Unreal Engine", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unrealengine/unrealengine-original.svg" },
  { name: "Blender", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg" },
  { name: "Git", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "GitHub", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
  { name: "AWS", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Tailwind CSS", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "JavaScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "C#", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" },
];

export const certifications = [
  { id: 1, title: "AWS AI Practitioner", issuer: "Amazon Web Services", date: "Aug 2024", credentialUrl: "https://aws.amazon.com/credentials", imageUrl: "/certs/cert_1.png" },
  { id: 2, title: "MERN Stack Certification", issuer: "Coursera / VIT Bhopal", date: "Jun 2024", credentialUrl: "https://coursera.org/verify/xyz", imageUrl: "/certs/cert_2.png" },
  { id: 3, title: "NPTEL IoT (Silver)", issuer: "SWAYAM NPTEL India", date: "May 2024", credentialUrl: "#", imageUrl: "/certs/cert_3.png" },
  { id: 4, title: "Certification 4", issuer: "Issuer Name", date: "2024", credentialUrl: "#", imageUrl: "/certs/cert_4.png" },
  { id: 5, title: "Certification 5", issuer: "Issuer Name", date: "2024", credentialUrl: "#", imageUrl: "/certs/cert_5.png" },
  { id: 6, title: "Certification 6", issuer: "Issuer Name", date: "2024", credentialUrl: "#", imageUrl: "/certs/cert_6.png" },
  { id: 7, title: "Certification 7", issuer: "Issuer Name", date: "2024", credentialUrl: "#", imageUrl: "/certs/cert_7.png" },
];

export const freeResources = [
  { id: 1, title: "Java Cheat Sheet", fileUrl: "/notes/Java_Cheatsheet.pdf" },
  { id: 2, title: "C++ Cheat Sheet", fileUrl: "/notes/CPP_Cheatsheet.pdf" },
  { id: 3, title: "C# Cheat Sheet", fileUrl: "/notes/CSharp_Cheatsheet.pdf" },
  { id: 4, title: "DSA Cheat Sheet", fileUrl: "/notes/DSA_Cheatsheet.pdf" },
  { id: 5, title: "WebDev Cheat Sheet", fileUrl: "/notes/WebDev_Cheatsheet.pdf" },
  { id: 6, title: "Animation & 3D Modelling", fileUrl: "/notes/Animation_3D_Cheatsheet.pdf" },
  { id: 7, title: "C++ Grandmaster — One Piece Edition", fileUrl: "/notes/CPP_Grandmaster_OnePiece.pdf" },
  { id: 8, title: "DSA Grandmaster — One Piece Edition", fileUrl: "/notes/DSA_Grandmaster_OnePiece.pdf" },
];

export const achievements = [
  { id: 1, type: "hackathon", title: "HackSecure Hackathon — 3rd Place", description: "Secured 3rd place with Kestrel AI, an AI-driven threat analysis tool that impressed judges with its real-time vulnerability detection capabilities.", perks: "Cash prize, certificates, and mentorship opportunity", imagePlaceholder: "/achievements/hacksecure.png" },
  { id: 2, type: "hackathon", title: "EY Hackathon — Finalist", description: "Developed a functional chatbot prototype for Tata Capital, reaching the finals among 200+ teams.", perks: "Certificate of excellence, networking opportunities", imagePlaceholder: "/achievements/ey_hackathon.png" },
  { id: 3, type: "achievement", title: "500+ DSA Problems Solved", description: "Consistently solving algorithmic challenges across Codeforces, CodeChef, LeetCode, and HackerRank. Achieved Expert rating.", perks: "Expert rating on Codeforces", imagePlaceholder: "/achievements/dsa_milestone.png" },
  { id: 4, type: "achievement", title: "Google Gemini Student Ambassador", description: "Selected among a competitive pool of applicants to represent Google's Gemini ecosystem on campus.", perks: "Google swag kit, mentorship, exclusive events access", imagePlaceholder: "/achievements/gemini_ambassador.png" },
];

export const gymImages = [
  "/gym/gym_1.jpeg",
  "/gym/gym_2.jpeg",
  "/gym/gym_3.jpeg",
  "/gym/gym_4.jpeg",
];