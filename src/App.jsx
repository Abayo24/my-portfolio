import React, { useState, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Smartphone,
  Download,
  ExternalLink,
  Code2,
  Palette,
  Terminal,
  Database,
  Cpu,
  Layout,
  Menu,
  X,
  ChevronRight,
  Award,
  BookOpen
} from 'lucide-react';

// --- Data ---

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

const experiences = [
  {
    company: "Fertitude",
    role: "Software Engineer Intern",
    period: "Aug 2025 - Present",
    type: "Remote",
    description: "Redesigning core web architecture and ensuring code quality.",
    achievements: [
      "Built modular UI components in React.js to overhaul the website's visual identity.",
      "Implemented strict commit message standards to improve repository maintainability.",
      "Collaborated with stakeholders to estimate timelines and verify product success metrics."
    ],
    tech: ["React.js", "Git", "UI/UX"]
  },
  {
    company: "Bundi Insights",
    role: "Backend Intern",
    period: "July 2025 - Aug 2025",
    type: "Remote",
    description: "Developing robust backend logic for client-facing applications.",
    achievements: [
      "Designed and developed scalable backend applications using Agile/Scrum methodologies.",
      "Ensured cohesive functionality by tightly integrating backend logic with frontend requirements.",
      "Optimized code efficiency to meet strict client performance requirements."
    ],
    tech: ["Python", "Backend Dev", "Agile"]
  },
  {
    company: "Memail Global",
    role: "UI/UX Designer",
    period: "Oct 2024 - July 2025",
    type: "Hybrid",
    description: "Bridging the gap between user needs and technical implementation.",
    achievements: [
      "Designed user-centered mobile interfaces and conducted usability testing.",
      "Built a scalable design system in Figma to streamline the developer handoff process.",
      "Created high-fidelity prototypes to visualize complex user flows."
    ],
    tech: ["Figma", "Prototyping", "Design Systems"]
  },
  {
    company: "Diamond Trust Bank",
    role: "Job Shadower (ICT)",
    period: "Sept 2024",
    type: "On-site",
    description: "Gained cross-functional exposure to enterprise IT operations.",
    achievements: [
      "Rotated through critical units including DevOps, SOC, Cloud, and Software Development.",
      "Analyzed how Identity Access Management and Data Governance integrate in banking systems."
    ],
    tech: ["DevOps", "Cloud", "Enterprise IT"]
  },
  {
    company: "Konza Technopolis",
    role: "Attachee",
    period: "May 2023 - Aug 2023",
    type: "On-site",
    description: "Full-stack web development and IT support in a smart-city environment.",
    achievements: [
      "Researched and integrated emerging web technologies into existing project architectures.",
      "Converted business requirements into responsive HTML/CSS/JS coding solutions."
    ],
    tech: ["HTML/CSS", "JavaScript", "SDLC"]
  }
];

const skills = [
  { category: "Languages", icon: <Code2 size={20} />, items: ["TypeScript", "JavaScript", "Python", "Java", "C++", "SQL"] },
  { category: "Frontend", icon: <Layout size={20} />, items: ["React.js", "Next.js", "React Native", "Tailwind CSS", "MaterialUI"] },
  { category: "Backend & Tools", icon: <Terminal size={20} />, items: ["Express.js", "Node.js", "MySQL", "Git", "Bash"] },
  { category: "Design", icon: <Palette size={20} />, items: ["Figma", "User Research", "Prototyping", "Wireframing", "Design Systems"] },
];

const certifications = [
  "Software Engineering - ALX",
  "Foundations of User Experience (UX) Design - Google",
  "Introduction to Cybersecurity - Cisco",
  "NSE 1 Network Security Associate - Fortinet",
  "JavaScript Essentials - Cisco Networking Academy",
  "Web Development Program Boot Camp - eMobilis",
  "Certificate in Business IT - Institute of Advanced Technology"
];

const projects = [
  {
    title: "Fertitude Platform Redesign",
    link: "https://www.fertitude.com/",
    description: "A complete UI overhaul using modular React and Material UI components. Improved code maintainability and user engagement metrics.",
    tags: ["Typescript", "React.js", "MaterialUI", "Git"],
    image: "/fertitude.png", // Replace with your own image path
    themeColor: "blue"
  },
  {
    title: "Mobile Design System",
    link: "https://www.figma.com/design/18118ozHp5li89AzZhnwPf/Me4U-UI-UX?node-id=0-1&t=yDhXvkIJX8LCXExI-1",
    description: "Created a scalable design system and high-fidelity prototypes in Figma to streamline mobile app development.",
    tags: ["Figma", "Prototyping", "Mobile"],
    image: "/Me4U.png", // Replace with your own image path
    themeColor: "purple"
  },
  {
    title: "Bundi Insights Backend",
    link: "https://afridatainsights.co.ke/",
    description: "Robust backend architecture development focusing on efficiency and frontend integration.",
    tags: ["Python", "API", "Agile"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800&h=500", // Replace with your own image path
    themeColor: "teal"
  }
];

// --- Components ---

const SectionTitle = ({ children, id }) => (
  <h2 id={id} className="text-3xl md:text-4xl font-bold mb-8 text-white flex items-center gap-3">
    <span className="w-2 h-8 bg-blue-500 rounded-full inline-block"></span>
    {children}
  </h2>
);

const Badge = ({ children, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    teal: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[color] || colors.blue}`}>
      {children}
    </span>
  );
};

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Smooth scroll handler
  const scrollTo = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-sans selection:bg-blue-500/30">

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 font-bold text-xl text-white tracking-tighter">
              ABAYO<span className="text-blue-500">.DEV</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollTo(link.href.substring(1))}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === link.href.substring(1)
                        ? 'text-blue-400'
                        : 'text-slate-300 hover:text-white'
                      }`}
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href.substring(1))}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6 border border-blue-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Available for opportunities
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Building Logic. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Designing Experience.
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
            I'm <strong className="text-white">Abayo Akinyi</strong>, a Software Engineer and UI/UX Designer.
            I bridge the gap between aesthetic design and robust code, combining strategic thinking with
            practical execution to deliver impactful mobile and web solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollTo('projects')}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
            >
              View My Work <ChevronRight size={18} />
            </button>
            <a
              href="/abayo-akinyi-CV.pdf" // Placeholder path
              download
              className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 border border-slate-700"
            >
              Download CV <Download size={18} />
            </a>
          </div>

          <div className="mt-12 flex gap-6 text-slate-500">
            <a href="https://github.com/Abayo24" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Github size={24} /></a>
            <a href="https://linkedin.com/in/abayoakinyi" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors"><Linkedin size={24} /></a>
            <a href="mailto:abayoakinyi@outlook.com" className="hover:text-purple-400 transition-colors"><Mail size={24} /></a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle>About Me</SectionTitle>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-lg text-slate-400">
              <p>
                My journey in technology began at <span className="text-white font-medium">Riara University</span>, where I earned my Bachelor of Computer Science. Since then, I've cultivated a unique hybrid skill set that allows me to speak the languages of both designers and developers.
              </p>
              <p>
                At <span className="text-white font-medium">Memail Global</span>, I learned the importance of user-centric design. At <span className="text-white font-medium">Fertitude</span> and <span className="text-white font-medium">Bundi Insights</span>, I learned how to build the systems that power those designs.
              </p>
              <p>
                I don't just write code; I build products. Whether it's crafting a pixel-perfect UI in Figma or optimizing a Python backend for efficiency, I focus on the end-to-end user experience.
              </p>
            </div>

            {/* Education Card */}
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <BookOpen size={100} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Education</h3>
              <div className="mb-4">
                <div className="text-blue-400 font-medium">Bachelor of Computer Science</div>
                <div className="text-slate-300">Riara University</div>
                <div className="text-sm text-slate-500">Jan 2021 - June 2024</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">Key Coursework</div>
                <div className="flex flex-wrap gap-2">
                  {["OOP in C++", "Compilers", "Algorithms", "Data Structures", "OS"].map(course => (
                    <span key={course} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 max-w-6xl mx-auto px-4">
        <SectionTitle>Experience</SectionTitle>
        <div className="relative border-l border-slate-800 ml-3 md:ml-6 space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-8 md:pl-12">
              {/* Timeline Dot */}
              <div className="absolute -left-[5px] top-2 h-3 w-3 rounded-full bg-blue-500 border border-slate-900 shadow-[0_0_0_4px_rgba(15,23,42,1)]"></div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                <span className="text-slate-400 font-medium">@ {exp.company}</span>
              </div>

              <div className="text-sm text-slate-500 mb-4 flex gap-3">
                <span>{exp.period}</span>
                <span>•</span>
                <span>{exp.type}</span>
              </div>

              <p className="text-slate-300 mb-4 italic">{exp.description}</p>

              <ul className="space-y-2 mb-4">
                {exp.achievements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-600 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.tech.map((t, i) => (
                  <Badge key={i} color="blue">{t}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-slate-800/30">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle>Featured Work</SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {projects.map((project, index) => {
              // Dynamic color classes based on the theme color we set in the data
              const themeClasses = {
                blue: { border: "hover:border-blue-500/50", text: "text-blue-400" },
                purple: { border: "hover:border-purple-500/50", text: "text-purple-400" },
                teal: { border: "hover:border-teal-500/50", text: "text-teal-400" }
              };
              const theme = themeClasses[project.themeColor] || themeClasses.blue;

              return (
                <div key={index} className={`group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden ${theme.border} transition-all duration-300 flex flex-col`}>
                  {/* Image Container with hover zoom effect */}
                  <div className="h-48 overflow-hidden relative bg-slate-800">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Dark overlay to make it blend well with the dark mode aesthetic */}
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-300"></div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      <a href={project.link} target="_blank" rel="noreferrer" className={`text-slate-500 hover:${theme.text} transition-colors`}>
                        <ExternalLink size={18} />
                      </a>
                    </div>
                    <p className="text-slate-400 text-sm mb-4 flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className={`text-xs font-medium ${theme.text}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 max-w-6xl mx-auto px-4">
        <SectionTitle>Technical Arsenal</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skillGroup, index) => (
            <div key={index} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors">
              <div className="flex items-center gap-3 mb-4 text-blue-400">
                {skillGroup.icon}
                <h3 className="font-bold text-white">{skillGroup.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map(item => (
                  <span key={item} className="text-sm text-slate-400 bg-slate-900/50 px-2 py-1 rounded border border-slate-700/50">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Mini-Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <Award className="text-purple-400" /> Certifications
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-800">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <span className="text-slate-300 text-sm">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-t from-slate-900 to-slate-800/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <SectionTitle>Let's Build Something Together</SectionTitle>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            I'm currently available for freelance projects and full-time roles.
            Whether you need a full-stack developer or a UI/UX expert, I'm ready to deliver.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <a href="mailto:abayoakinyi@outlook.com" className="p-6 bg-slate-800 rounded-xl border border-slate-700 hover:border-blue-500 transition-all group flex flex-col items-center gap-3">
              <div className="p-3 bg-blue-500/10 rounded-full text-blue-400 group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <span className="text-white font-medium">Email Me</span>
              <span className="text-xs text-slate-500">abayoakinyi@outlook.com</span>
            </a>

            <a href="https://linkedin.com/in/abayoakinyi" target="_blank" rel="noreferrer" className="p-6 bg-slate-800 rounded-xl border border-slate-700 hover:border-blue-500 transition-all group flex flex-col items-center gap-3">
              <div className="p-3 bg-blue-500/10 rounded-full text-blue-400 group-hover:scale-110 transition-transform">
                <Linkedin size={24} />
              </div>
              <span className="text-white font-medium">LinkedIn</span>
              <span className="text-xs text-slate-500">Connect with me</span>
            </a>

            <a href="tel:+254769622996" className="p-6 bg-slate-800 rounded-xl border border-slate-700 hover:border-blue-500 transition-all group flex flex-col items-center gap-3">
              <div className="p-3 bg-blue-500/10 rounded-full text-blue-400 group-hover:scale-110 transition-transform">
                <Smartphone size={24} />
              </div>
              <span className="text-white font-medium">Call Me</span>
              <span className="text-xs text-slate-500">+254-769-622-996</span>
            </a>
          </div>

          <footer className="mt-20 pt-8 border-t border-slate-800 text-slate-600 text-sm">
            <p>&copy; {new Date().getFullYear()} Abayo Akinyi. Built with React & Tailwind CSS.</p>
          </footer>
        </div>
      </section>
    </div>
  );
}