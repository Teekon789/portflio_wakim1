import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaEnvelope, FaHtml5, FaCss3Alt, FaJs, FaReact, FaVuejs } from 'react-icons/fa';
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiNuxtdotjs } from "react-icons/si";
import { FiSun, FiMoon } from "react-icons/fi"; 
import Marquee from "react-fast-marquee";
import mn_2 from './assets/mn_2.png';
import wakim from './assets/wakim.jpg';

// แยกข้อความภาษาไทย
import textTH from './lang/th';
import textEN from './lang/en';

export default function Portfolio() {
  const [lang, setLang] = useState('th'); 
  const [darkMode, setDarkMode] = useState(true); 
  const t = lang === 'th' ? textTH : textEN;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const projects = [
    {
      title: t.projects_name.title,
      desc: t.projects_name.desc,
      demo: 'https://egovtrip.vercel.app/',
      code: 'https://github.com/Teekon789/my-nextjs-project',
      image: mn_2,
    },
  ];

  return (
    <div className={`${darkMode ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-gradient-to-b from-gray-100 to-white'} min-h-screen font-sans relative transition-colors duration-300`}>
      <div className="text-center">
        {/* ส่วนปุ่มควบคุม */}
        <div className="absolute top-4 right-6 z-10 flex space-x-4">
          <button 
            onClick={toggleDarkMode} 
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' : 'bg-blue-100 text-gray-800 hover:bg-blue-200'}`}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>
          
          <button 
            onClick={() => setLang(lang === 'th' ? 'en' : 'th')} 
            className={`text-sm px-4 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-blue-100 text-gray-800 hover:bg-blue-200'}`}
          >
            {lang === 'th' ? 'English' : 'ภาษาไทย'}
          </button>
        </div>

        {/* ส่วน Hero */}
        <section className={`flex flex-col items-center justify-center text-center py-20 px-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t.greeting} <span className={`${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{t.fullname}</span>
          </motion.h1>
          <motion.p 
            className={`text-lg md:text-xl max-w-xl mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {t.role}
          </motion.p>
          <motion.a 
            href="#projects" 
            className="bg-indigo-500 hover:bg-indigo-600 px-6 py-2 rounded-full text-white font-semibold transition"
            whileHover={{ scale: 1.05 }}
          >
            {t.viewProjects}
          </motion.a>
        </section>

        {/* ส่วน About Me */}
        <section id="about" className={`px-6 py-20 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {t.about.title}
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>
                  {t.about.title}
                </h3>
                <p className="mb-6 leading-relaxed">
                  {t.about.content}
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className={`font-medium ${darkMode ? 'text-indigo-200' : 'text-indigo-500'}`}>
                      {t.about.education}
                    </h4>
                    <p className="text-sm opacity-80">{t.about.major}</p>
                  </div>
                  <div>
                    <h4 className={`font-medium ${darkMode ? 'text-indigo-200' : 'text-indigo-500'}`}>
                      {t.about.university_name}
                    </h4>
                    <p className="text-sm opacity-80">{t.about. university}</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center"
              >
                <div className={`w-64 h-64 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} mb-6 overflow-hidden`}>
                  <img 
                    src={wakim} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              
              </motion.div>
            </div>
          </div>
        </section>

        {/* ส่วน Skills */}
        <div className={`py-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
          <h2 className="text-3xl font-bold text-center mb-4">{t.skills}</h2>
          <Marquee speed={100}>
            <div className="flex flex-wrap justify-center gap-20 px-4 py-8">
              <div className="flex flex-col items-center gap-3 group">
                <FaHtml5 className="text-5xl md:text-6xl text-orange-500 group-hover:scale-110 transition-transform" />
                <p className={`text-xl font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>HTML</p>
              </div>
              
              <div className="flex flex-col items-center gap-3 group">
                <FaCss3Alt className="text-5xl md:text-6xl text-blue-500 group-hover:scale-110 transition-transform" />
                <p className={`text-xl font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>CSS</p>
              </div>
              
              <div className="flex flex-col items-center gap-3 group">
                <FaJs className="text-5xl md:text-6xl text-yellow-400 group-hover:scale-110 transition-transform" />
                <p className={`text-xl font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>JavaScript</p>
              </div>
              
              <div className="flex flex-col items-center gap-3 group">
                <FaReact className="text-5xl md:text-6xl text-cyan-400 group-hover:scale-110 transition-transform" />
                <p className={`text-xl font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>React</p>
              </div>

              <div className="flex flex-col items-center gap-3 group">
                <RiTailwindCssFill className="text-5xl md:text-6xl text-blue-400 group-hover:scale-110 transition-transform" />
                <p className={`text-xl font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Tailwind</p>
              </div>

              <div className="flex flex-col items-center gap-3 group">
                <FaVuejs className="text-5xl md:text-6xl text-green-400 group-hover:scale-110 transition-transform" />
                <p className={`text-xl font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Vue</p>
              </div>
              
              <div className="flex flex-col items-center gap-3 group">
                <RiNextjsFill className={`text-5xl md:text-6xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} group-hover:scale-110 transition-transform`} />
                <p className={`text-xl font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Next</p>
              </div>

              <div className="flex flex-col items-center gap-3 group">
                <SiNuxtdotjs className={`text-5xl md:text-6xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} group-hover:scale-110 transition-transform`} />
                <p className={`text-xl font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Nuxt</p>
              </div>
            </div>
          </Marquee>
        </div>

        

        {/* ส่วน Projects */}
        <section id="projects" className={`px-6 py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <h2 className={`text-3xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{t.featuredProjects}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                className={`text-justify p-6 rounded-2xl shadow-lg transition ${
                  darkMode 
                    ? 'bg-gray-700 hover:shadow-indigo-500/50' 
                    : 'bg-white hover:shadow-indigo-300'
                }`}
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex flex-row mb-4 gap-x-4 rounded-lg items-center"> 
                  <span className="w-16 h-16 rounded-full bg-gray-200">
                    <img src={project.image} alt={project.title} />
                  </span>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{project.title}</h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{project.desc}</p>
                <div className="flex gap-4">
                  <a href={project.demo} className={`${darkMode ? 'text-indigo-400' : 'text-indigo-600'} hover:underline`}>{t.viewDemo}</a>
                  <a href={project.code} className={`${darkMode ? 'text-indigo-400' : 'text-indigo-600'} hover:underline`}>{t.viewCode}</a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ส่วน Contact */}
        <section className={`px-6 py-20 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          <h2 className="text-3xl font-bold text-center mb-8">{t.contactMe}</h2>
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/Teekon789" target="_blank" rel="noopener noreferrer">
              <FaGithub className={`w-6 h-6 ${darkMode ? 'hover:text-indigo-400' : 'hover:text-indigo-600'}`} />
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=teeboy789456@gmail.com" target="_blank" rel="noopener noreferrer">
              <FaEnvelope className={`w-6 h-6 ${darkMode ? 'hover:text-indigo-400' : 'hover:text-indigo-600'}`} />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}