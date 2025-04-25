import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaEnvelope,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaVuejs,
  FaDownload,
  FaGraduationCap,
  FaUniversity,
  FaBriefcase,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaCode,
  FaDatabase,
  FaServer,
  FaUserFriends,
} from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiNuxtdotjs, SiTypescript, SiPython, SiNodedotjs, SiMongodb, SiExpress, SiFirebase } from "react-icons/si";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import Marquee from "react-fast-marquee";
import mn_2 from "./assets/mn_2.png";
import wakim from "./assets/wakim.jpg";
import resumeFile from "./assets/Resume.pdf";

// แยกข้อความภาษาไทย
import textTH from "./lang/th";
import textEN from "./lang/en";

// โครงสร้างเพิ่ม Project โดยเพิ่มตัวอย่างสำหรับโชว์
const additionalProjects = [
  {
    title: "E-Learning Platform",
    desc: "ระบบจัดการการเรียนการสอนออนไลน์ที่มีระบบการจัดการหลักสูตร การติดตามความก้าวหน้า และเครื่องมือวิเคราะห์ข้อมูล",
    demo: "https://e-learning-platform-demo.vercel.app/",
    code: "https://github.com/Teekon789/e-learning-platform",
    image: "https://via.placeholder.com/150",
    technologies: ["React", "Node.js", "MongoDB"]
  },
  {
    title: "Admin Dashboard",
    desc: "แดชบอร์ดสำหรับผู้ดูแลระบบที่มีการแสดงข้อมูลเชิงลึก การจัดการผู้ใช้ และเครื่องมือการนำเสนอข้อมูล",
    demo: "https://admin-dashboard-demo.vercel.app/",
    code: "https://github.com/Teekon789/admin-dashboard",
    image: "https://via.placeholder.com/150",
    technologies: ["Vue.js", "Express", "Firebase"]
  }
];

// คอมโพเนนต์การ์ด Service
const ServiceCard = ({ icon: Icon, title, description, darkMode }) => (
  <motion.div
    className={`p-6 rounded-xl shadow-md ${
      darkMode ? "bg-gray-700" : "bg-white"
    } flex flex-col items-center text-center h-full`}
    whileHover={{ y: -8, transition: { duration: 0.3 } }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <div 
      className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
        darkMode ? "bg-indigo-800" : "bg-indigo-100"
      }`}
    >
      <Icon 
        className={`text-2xl ${
          darkMode ? "text-indigo-200" : "text-indigo-600"
        }`} 
      />
    </div>
    <h3 
      className={`text-xl font-semibold mb-3 ${
        darkMode ? "text-white" : "text-gray-800"
      }`}
    >
      {title}
    </h3>
    <p 
      className={`${
        darkMode ? "text-gray-300" : "text-gray-600"
      }`}
    >
      {description}
    </p>
  </motion.div>
);

// คอมโพเนนต์การ์ด Project
const ProjectCard = ({ project, darkMode, t }) => (
  <motion.div
    className={`text-justify p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg transition ${
      darkMode
        ? "bg-gray-700 hover:shadow-indigo-500/50"
        : "bg-white hover:shadow-indigo-300"
    }`}
    whileHover={{ scale: 1.03 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <div className="flex flex-row mb-3 sm:mb-4 gap-x-3 sm:gap-x-4 rounded-lg items-center">
      <span className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-200 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </span>
    </div>
    <h3
      className={`text-lg sm:text-xl font-semibold mb-2 ${
        darkMode ? "text-white" : "text-gray-800"
      }`}
    >
      {project.title}
    </h3>
    <p
      className={`mb-3 sm:mb-4 text-sm sm:text-base ${
        darkMode ? "text-gray-400" : "text-gray-600"
      }`}
    >
      {project.desc}
    </p>
    {project.technologies && (
      <div className="flex flex-wrap gap-2 mb-3">
        {project.technologies.map((tech, idx) => (
          <span 
            key={idx} 
            className={`text-xs px-2 py-1 rounded-full ${
              darkMode 
                ? "bg-gray-600 text-gray-200" 
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tech}
          </span>
        ))}
      </div>
    )}
    <div className="flex gap-3 sm:gap-4 text-sm sm:text-base">
      <a
        href={project.demo}
        className={`${
          darkMode ? "text-indigo-400" : "text-indigo-600"
        } hover:underline`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t.viewDemo}
      </a>
      <a
        href={project.code}
        className={`${
          darkMode ? "text-indigo-400" : "text-indigo-600"
        } hover:underline`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t.viewCode}
      </a>
    </div>
  </motion.div>
);

export default function Portfolio() {
  const [lang, setLang] = useState("th");
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const headerRef = useRef(null);
  
  const t = lang === "th" ? textTH : textEN;

  // ข้อความภาษาไทย
  const thaiTextAdditions = {
    services: {
      title: "บริการของฉัน",
      items: [
        {
          title: "พัฒนาเว็บไซต์",
          description: "สร้างเว็บไซต์ที่สวยงามและตอบสนองการใช้งาน ด้วยเทคโนโลยีล่าสุด"
        },
        {
          title: "พัฒนาแอปพลิเคชัน",
          description: "พัฒนาแอปพลิเคชันที่ใช้งานง่ายและเข้าถึงผู้ใช้ได้อย่างมีประสิทธิภาพ"
        },
        {
          title: "ออกแบบ UI/UX",
          description: "ออกแบบส่วนติดต่อผู้ใช้งานที่สวยงามและใช้งานง่ายตามหลัก UX"
        },
        {
          title: "ให้คำปรึกษา",
          description: "ให้คำปรึกษาเกี่ยวกับการพัฒนาเว็บไซต์และแอปพลิเคชัน"
        }
      ]
    },
    contact: {
      title: "ติดต่อ",
      info: {
        email: "teeboy789456@gmail.com",
        phone: "+66 12 345 6789",
        location: "กรุงเทพมหานคร, ประเทศไทย"
      }
    },
    navigation: {
      home: "หน้าแรก",
      about: "เกี่ยวกับฉัน",
      skills: "ทักษะ",
      services: "บริการ",
      projects: "ผลงาน",
      contact: "ติดต่อ"
    },
    scrollTop: "เลื่อนขึ้น",
    footer: {
      copyright: "© 2025 สงวนลิขสิทธิ์",
      madeWith: "สร้างด้วยความรัก ❤️"
    }
  };

  // ข้อความภาษาอังกฤษ
  const englishTextAdditions = {
    services: {
      title: "My Services",
      items: [
        {
          title: "Web Development",
          description: "Creating beautiful and responsive websites using the latest technologies"
        },
        {
          title: "App Development",
          description: "Developing user-friendly and efficient applications"
        },
        {
          title: "UI/UX Design",
          description: "Designing beautiful and user-friendly interfaces according to UX principles"
        },
        {
          title: "Consulting",
          description: "Providing expert advice on web and app development"
        }
      ]
    },
    contact: {
      title: "Contact",
      info: {
        email: "teeboy789456@gmail.com",
        phone: "+66 12 345 6789",
        location: "Bangkok, Thailand"
      }
    },
    navigation: {
      home: "Home",
      about: "About",
      skills: "Skills",
      services: "Services",
      projects: "Projects",
      contact: "Contact"
    },
    scrollTop: "Scroll Top",
    footer: {
      copyright: "© 2025 All Rights Reserved",
      madeWith: "Made with love ❤️"
    }
  };

  // รวมข้อความสำหรับภาษาไทยและอังกฤษ
  const tExtended = {
    ...(lang === "th" ? { ...textTH, ...thaiTextAdditions } : { ...textEN, ...englishTextAdditions })
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setIsAnimating(true);
      const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;
      const yOffset = -headerHeight - 10;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = resumeFile;
    link.download = "Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // เพิ่มโปรเจคเข้าไปในอาร์เรย์
  const projects = [
    {
      title: t.projects_name.title,
      desc: t.projects_name.desc,
      demo: "https://egovtrip.vercel.app/",
      code: "https://github.com/Teekon789/my-nextjs-project",
      image: mn_2,
      technologies: ["Next.js", "Tailwind CSS", "Firebase"]
    },
    ...additionalProjects
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      
      if (!isAnimating) {
        const sections = ['home', 'about', 'skills', 'services', 'projects', 'contact'];
        let currentSection = activeSection;
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;
            
            if (rect.top <= headerHeight + 100 && rect.bottom >= headerHeight) {
              currentSection = section;
              break;
            }
          }
        }
        
        if (currentSection !== activeSection) {
          setActiveSection(currentSection);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [darkMode, activeSection, isAnimating]);

  // รายการ nav items สำหรับการนำทาง
  const navItems = [
    { id: 'home', label: tExtended.navigation.home },
    { id: 'about', label: tExtended.navigation.about },
    { id: 'skills', label: tExtended.navigation.skills },
    { id: 'services', label: tExtended.navigation.services },
    { id: 'projects', label: tExtended.navigation.projects },
    { id: 'contact', label: tExtended.navigation.contact }
  ];

  return (
    <div
      className={`${
        darkMode
          ? "bg-gradient-to-b from-gray-900 to-black dark"
          : "bg-gradient-to-b from-gray-100 to-white"
      } min-h-screen font-sans relative transition-colors duration-300`}
    >
      {/* Header */}
      <header 
        ref={headerRef}
        className={`sticky top-0 z-50 py-4 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          darkMode ? "bg-gray-900/90 backdrop-blur-md" : "bg-white/90 backdrop-blur-md shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className={`text-xl sm:text-2xl font-bold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            <span className={`${darkMode ? "text-indigo-400" : "text-indigo-600"}`}>
              {t.fullname.split(' ')[0]}
            </span>
            <span>{` ${t.fullname.split(' ')[1]}`}</span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors duration-300 ${
                  activeSection === item.id
                    ? darkMode
                      ? "text-indigo-400"
                      : "text-indigo-600"
                    : darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          
          {/* Control Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full cursor-pointer ${
                darkMode
                  ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
                  : "bg-blue-100 text-gray-800 hover:bg-blue-200"
              }`}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <FiSun className="w-5 h-5" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setLang(lang === "th" ? "en" : "th")}
              className={`text-xs sm:text-sm px-3 sm:px-4 py-1 rounded-full cursor-pointer ${
                darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-blue-100 text-gray-800 hover:bg-blue-200"
              }`}
            >
              {lang === "th" ? "English" : "ภาษาไทย"}
            </button>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FiX className={`w-6 h-6 ${darkMode ? "text-white" : "text-gray-800"}`} />
              ) : (
                <FiMenu className={`w-6 h-6 ${darkMode ? "text-white" : "text-gray-800"}`} />
              )}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden fixed z-40 top-16 left-0 right-0 ${
              darkMode ? "bg-gray-800" : "bg-white"
            } py-4 px-6 shadow-lg`}
          >
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-base font-medium p-2 rounded transition-colors duration-300 ${
                    activeSection === item.id
                      ? darkMode
                        ? "bg-gray-700 text-indigo-400"
                        : "bg-gray-100 text-indigo-600"
                      : darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center">
        {/* Hero Section */}
        <section
          id="home"
          className={`flex flex-col items-center justify-center text-center pt-20 pb-12 sm:py-24 md:py-28 px-4 min-h-[90vh] ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t.greeting}{" "}
            <span
              className={`${darkMode ? "text-indigo-400" : "text-indigo-600"}`}
            >
              {t.fullname}
            </span>
          </motion.h1>
          <motion.p
            className={`text-base sm:text-lg md:text-xl max-w-md sm:max-w-xl mb-6 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {t.role}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6"
          >
            <motion.a
              href="#projects"
              className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-full text-white font-semibold transition text-sm sm:text-base flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('projects');
              }}
            >
              <FaCode className="text-lg" />
              {t.viewProjects}
            </motion.a>
            
            <motion.a
              href="#contact"
              className={`px-6 py-3 rounded-full font-semibold transition text-sm sm:text-base border-2 flex items-center justify-center gap-2 ${
                darkMode 
                  ? "border-indigo-400 text-indigo-400 hover:bg-indigo-900/30" 
                  : "border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
            >
              <FaEnvelope className="text-lg" />
              {tExtended.contact.title}
            </motion.a>
          </motion.div>

          {/* Scroll Down Animation */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ 
              opacity: [0.2, 0.8, 0.2],
              y: [0, 10, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={darkMode ? "text-white" : "text-gray-800"}
            >
              <path 
                d="M12 4V20M12 20L18 14M12 20L6 14" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </section>

        {/* About Me Section */}
        <section
          id="about"
          className={`py-12 sm:py-16 md:py-20 ${
            darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2
                className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
                  darkMode ? "text-indigo-400" : "text-indigo-600"
                }`}
              >
                {t.about.title}
              </h2>
              <div
                className={`h-1 w-20 sm:w-24 mx-auto ${
                  darkMode ? "bg-indigo-500" : "bg-indigo-400"
                } rounded-full`}
              ></div>
            </motion.div>

            <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
              <motion.div
                className="w-full lg:w-1/2 flex justify-center"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div
                  className={`relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 ${
                    darkMode ? "border-indigo-500" : "border-indigo-400"
                  } shadow-xl`}
                >
                  <img
                    src={wakim}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                className="w-full lg:w-1/2 text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="space-y-6 sm:space-y-8">
                  <p
                    className={`text-base sm:text-lg md:text-xl leading-relaxed ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {t.about.content}
                  </p>

                  <div
                    className={`p-4 sm:p-6 rounded-xl ${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    } shadow-md w-full text-left`}
                  >
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                        <div
                          className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                            darkMode
                              ? "bg-indigo-800 text-indigo-200"
                              : "bg-indigo-100 text-indigo-600"
                          }`}
                        >
                          <FaGraduationCap className="text-xl sm:text-2xl" />
                        </div>
                        <div className="w-full">
                          <h3
                            className={`text-lg sm:text-xl font-semibold ${
                              darkMode ? "text-indigo-300" : "text-indigo-600"
                            }`}
                          >
                            {t.about.education}
                          </h3>
                          <p
                            className={`mt-1 text-sm sm:text-base ${
                              darkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {t.about.major}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                        <div
                          className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                            darkMode
                              ? "bg-indigo-800 text-indigo-200"
                              : "bg-indigo-100 text-indigo-600"
                          }`}
                        >
                          <FaUniversity className="text-xl sm:text-2xl" />
                        </div>
                        <div className="w-full">
                          <h3
                            className={`text-lg sm:text-xl font-semibold ${
                              darkMode ? "text-indigo-300" : "text-indigo-600"
                            }`}
                          >
                            {t.about.university_name}
                          </h3>
                          <p
                            className={`mt-1 text-sm sm:text-base ${
                              darkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {t.about.university}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center lg:justify-start">
                    <motion.button
                      onClick={handleDownloadResume}
                      className={`flex items-center gap-2 sm:gap-3 px-5 sm:px-6 py-2 sm:py-3 rounded-full text-base sm:text-lg font-medium ${
                        darkMode
                          ? "bg-indigo-600 hover:bg-indigo-700"
                          : "bg-indigo-500 hover:bg-indigo-600"
                      } text-white transition-colors`}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{
                        scale: 0.95,
                        transition: { duration: 0.1 },
                      }}
                    >
                      <FaDownload className="text-lg sm:text-xl" />
                      <span>{t.downloadResume}</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className={`py-12 sm:py-16 ${
            darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              className="text-center mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                {t.skills}
              </h2>
              <div
                className={`h-1 w-20 sm:w-24 mx-auto ${
                  darkMode ? "bg-indigo-500" : "bg-indigo-400"
                } rounded-full`}
              ></div>
            </motion.div>
            
            <div className="mb-10 sm:mb-12">
              <motion.h3
                className={`text-xl sm:text-2xl font-semibold mb-4 text-center ${
                  darkMode ? "text-indigo-300" : "text-indigo-600"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Frontend
              </motion.h3>
              
              <Marquee
                speed={50}
                pauseOnHover={true}
                gradient={false}
                className="py-4"
              >
                <div className="flex flex-wrap justify-center gap-10 sm:gap-16 px-4 py-6">
                  <div className="flex flex-col items-center gap-2 sm:gap-3 group">
                    <FaHtml5 className="text-4xl sm:text-5xl md:text-6xl text-orange-500 group-hover:scale-110 transition-transform" />
                    <p
                      className={`text-lg sm:text-xl font-medium ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      HTML
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-2 sm:gap-3 group">
                    <FaCss3Alt className="text-4xl sm:text-5xl md:text-6xl text-blue-500 group-hover:scale-110 transition-transform" />
                    <p
                      className={`text-lg sm:text-xl font-medium ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      CSS
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-2 sm:gap-3 group">
                    <FaJs className="text-4xl sm:text-5xl md:text-6xl text-yellow-400 group-hover:scale-110 transition-transform" />
                    <p
                      className={`text-lg sm:text-xl font-medium ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      JavaScript
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-2 sm:gap-3 group">
                    <SiTypescript className="text-4xl sm:text-5xl md:text-6xl text-blue-600 group-hover:scale-110 transition-transform" />
                    <p
                      className={`text-lg sm:text-xl font-medium ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      TypeScript
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-2 sm:gap-3 group">
                    <FaReact className="text-4xl sm:text-5xl md:text-6xl text-cyan-400 group-hover:scale-110 transition-transform" />
                    <p
                      className={`text-lg sm:text-xl font-medium ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      React
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-2 sm:gap-3 group">
                    <RiTailwindCssFill className="text-4xl sm:text-5xl md:text-6xl text-blue-400 group-hover:scale-110 transition-transform" />
                    <p
                      className={`text-lg sm:text-xl font-medium ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Tailwind
                    </p>
                  </div>
                </div>
              </Marquee>
            </div>

            <div className="mb-10 sm:mb-12">
              <motion.h3
                className={`text-xl sm:text-2xl font-semibold mb-4 text-center ${
                  darkMode ? "text-indigo-300" : "text-indigo-600"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Frameworks
              </motion.h3>
              
              <Marquee
                speed={50}
                pauseOnHover={true}
                gradient={false}
                direction="right"
                className="py-4"
              >
                <div className="flex flex-wrap justify-center gap-10 sm:gap-16 px-4 py-6">
                  <div className="flex flex-col items-center gap-2 sm:gap-3 group">
                    <FaVuejs className="text-4xl sm:text-5xl md:text-6xl text-green-400 group-hover:scale-110 transition-transform" />
                    <p
                      className={`text-lg sm:text-xl font-medium ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Vue
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-2 sm:gap-3 group">
                    <RiNextjsFill
                      className={`text-4xl sm:text-5xl md:text-6xl ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      } group-hover:scale-110 transition-transform`}
                    />
                    <p
                      className={`text-lg sm:text-xl font-medium ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Next
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-2 sm:gap-3 group">
                    <SiNuxtdotjs
                      className={`text-4xl sm:text-5xl md:text-6xl ${
                        darkMode ? "text-green-400" : "text-green-600"
                      } group-hover:scale-110 transition-transform`}
                    />
                    <p
                      className={`text-lg sm:text-xl font-medium ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Nuxt
                    </p>
                  </div>
                </div>
              </Marquee>
            </div>
            
            <div>
              <motion.h3
                className={`text-xl sm:text-2xl font-semibold mb-4 text-center ${
                  darkMode ? "text-indigo-300" : "text-indigo-600"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Backend
              </motion.h3>
              
              <Marquee
                speed={50}
                pauseOnHover={true}
                gradient={false}
                className="py-4"
              >
                <div className="flex flex-wrap justify-center gap-10 sm:gap-16 px-4 py-6">
                  <div className="flex flex-col items-center gap-2 sm:gap-3 group">
                    <SiNodedotjs className="text-4xl sm:text-5xl md:text-6xl text-green-500 group-hover:scale-110 transition-transform" />
                    <p
                      className={`text-lg sm:text-xl font-medium ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Node.js
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-2 sm:gap-3 group">
                    <SiExpress className="text-4xl sm:text-5xl md:text-6xl text-gray-400 group-hover:scale-110 transition-transform" />
                    <p
                      className={`text-lg sm:text-xl font-medium ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Express
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-2 sm:gap-3 group">
                    <SiMongodb className="text-4xl sm:text-5xl md:text-6xl text-green-600 group-hover:scale-110 transition-transform" />
                    <p
                      className={`text-lg sm:text-xl font-medium ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      MongoDB
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-2 sm:gap-3 group">
                    <SiFirebase className="text-4xl sm:text-5xl md:text-6xl text-yellow-500 group-hover:scale-110 transition-transform" />
                    <p
                      className={`text-lg sm:text-xl font-medium ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Firebase
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-2 sm:gap-3 group">
                    <SiPython className="text-4xl sm:text-5xl md:text-6xl text-blue-500 group-hover:scale-110 transition-transform" />
                    <p
                      className={`text-lg sm:text-xl font-medium ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Python
                    </p>
                  </div>
                </div>
              </Marquee>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className={`py-12 sm:py-16 md:py-20 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2
                className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
                  darkMode ? "text-indigo-400" : "text-indigo-600"
                }`}
              >
                {tExtended.services.title}
              </h2>
              <div
                className={`h-1 w-20 sm:w-24 mx-auto ${
                  darkMode ? "bg-indigo-500" : "bg-indigo-400"
                } rounded-full`}
              ></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {tExtended.services.items.map((service, index) => (
                <ServiceCard
                  key={index}
                  icon={[FaCode, FaServer, FaUserFriends, FaBriefcase][index]}
                  title={service.title}
                  description={service.description}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className={`px-4 sm:px-6 py-12 sm:py-16 md:py-20 ${
            darkMode ? "bg-gray-900" : "bg-gray-100"
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2
                className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
                  darkMode ? "text-indigo-400" : "text-indigo-600"
                }`}
              >
                {t.featuredProjects}
              </h2>
              <div
                className={`h-1 w-20 sm:w-24 mx-auto ${
                  darkMode ? "bg-indigo-500" : "bg-indigo-400"
                } rounded-full mb-8`}
              ></div>
              
              <p className={`max-w-2xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                {lang === "th" 
                  ? "นี่คือผลงานที่โดดเด่นของฉัน เชิญชมผลงานที่ฉันภูมิใจนำเสนอ" 
                  : "Here are some of my featured projects that I'm proud to showcase"
                }
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  darkMode={darkMode}
                  t={t}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
<section
  id="contact"
  className={`py-12 sm:py-16 md:py-20 ${
    darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
  }`}
>
  <div className="max-w-6xl mx-auto px-4 sm:px-6">
    {/* Title Section */}
    <motion.div
      className="text-center mb-12 sm:mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
          darkMode ? "text-indigo-400" : "text-indigo-600"
        }`}
      >
        {tExtended.contact.title}
      </h2>
      <div
        className={`h-1 w-20 sm:w-24 mx-auto ${
          darkMode ? "bg-indigo-500" : "bg-indigo-400"
        } rounded-full`}
      ></div>
    </motion.div>

    {/* Contact Content */}
    <div className="flex flex-col lg:flex-row gap-8 sm:gap-12">
      {/* Contact Info Card */}
      <motion.div
        className="w-full lg:w-1/2"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className={`p-8 rounded-xl shadow-lg ${
          darkMode ? "bg-gray-700" : "bg-gray-100"
        } h-full`}>
          <h3 className={`text-2xl font-bold mb-8 ${
            darkMode ? "text-indigo-300" : "text-indigo-600"
          }`}>
            {lang === "th" ? "ข้อมูลติดต่อ" : "Contact Info"}
          </h3>
          
          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full flex-shrink-0 ${
                darkMode ? "bg-indigo-800 text-indigo-300" : "bg-indigo-100 text-indigo-600"
              }`}>
                <FaEnvelope className="text-xl" />
              </div>
              <div className="min-w-[80px]">
                <h4 className={`text-lg font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } mb-2`}>
                  Email
                </h4>
              </div>
              <div>
                <a 
                  href="mailto:teeboy789456@gmail.com"
                  className={`text-base ${
                    darkMode ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-800"
                  } transition-colors break-all`}
                >
                  teeboy789456@gmail.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full flex-shrink-0 ${
                darkMode ? "bg-indigo-800 text-indigo-300" : "bg-indigo-100 text-indigo-600"
              }`}>
                <FaPhone className="text-xl" />
              </div>
              <div className="min-w-[80px]">
                <h4 className={`text-lg font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } mb-2`}>
                  {lang === "th" ? "โทรศัพท์" : "Phone"}
                </h4>
              </div>
              <div>
                <a 
                  href="tel:+66123456789"
                  className={`text-base ${
                    darkMode ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-800"
                  } transition-colors`}
                >
                  +66 12 345 6789
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full flex-shrink-0 ${
                darkMode ? "bg-indigo-800 text-indigo-300" : "bg-indigo-100 text-indigo-600"
              }`}>
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <div className="min-w-[80px]">
                <h4 className={`text-lg font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } mb-2`}>
                  {lang === "th" ? "ที่อยู่" : "Location"}
                </h4>
              </div>
              <div>
                <p className={`text-base ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  กรุงเทพมหานคร, ประเทศไทย
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Social Media Section */}
      <motion.div
        className="w-full lg:w-1/2"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className={`p-8 rounded-xl shadow-lg ${
          darkMode ? "bg-gray-700" : "bg-gray-100"
        } h-full flex flex-col`}>
          <h3 className={`text-2xl font-bold mb-8 ${
            darkMode ? "text-indigo-300" : "text-indigo-600"
          }`}>
            {lang === "th" ? "ช่องทางติดตาม" : "Follow Me"}
          </h3>
          
          <div className="flex-1 flex flex-col justify-center">
            <p className={`text-lg mb-8 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              {lang === "th" 
                ? "ติดตามผลงานและกิจกรรมล่าสุดของฉันได้ผ่านช่องทางเหล่านี้" 
                : "Follow my latest works and activities through these channels"}
            </p>
            
            <div className="flex flex-wrap justify-center sm:justify-start gap-4">
              {/* GitHub */}
              <a
                href="https://github.com/Teekon789"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-5 py-3 rounded-lg transition-colors ${
                  darkMode 
                    ? "bg-gray-600 hover:bg-gray-500" 
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                <FaGithub className="text-xl" />
                <span>GitHub</span>
              </a>
              
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-5 py-3 rounded-lg transition-colors ${
                  darkMode 
                    ? "bg-blue-800 hover:bg-blue-700" 
                    : "bg-blue-100 hover:bg-blue-200"
                }`}
              >
                <FaLinkedin className="text-xl" />
                <span>LinkedIn</span>
              </a>
              
              {/* Twitter */}
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-5 py-3 rounded-lg transition-colors ${
                  darkMode 
                    ? "bg-blue-400/10 hover:bg-blue-400/20" 
                    : "bg-blue-100 hover:bg-blue-200"
                }`}
              >
                <FaTwitter className="text-xl" />
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>


        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={`fixed right-6 bottom-6 z-40 p-3 rounded-full shadow-lg ${
                darkMode
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-indigo-500 hover:bg-indigo-600"
              } text-white`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={tExtended.scrollTop}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}