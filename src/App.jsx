import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaEnvelope, FaDownload } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import mn_2 from "./assets/mn_2.png";
import wakim from "./assets/wakim.jpg";
import Navbar from "./components/navbar";
import Scrollup from "./components/scrollup";
import Services from "./components/Services";
import Skills from "./components/Skills";
import AboutMe from "./components/AboutMe";
import Contact from "./components/Contact";

// แยกข้อความภาษาไทย
import textTH from "./lang/th";
import textEN from "./lang/en";

export default function Portfolio() {
  const [lang, setLang] = useState("en");
  const [darkMode, setDarkMode] = useState(true);
  const t = lang === "en" ? textEN : textTH;

  // รายการโปรเจกต์
  const projects = [
    {
      title: t.projects_name.title,
      desc: t.projects_name.desc,
      demo: "https://egovtrip.vercel.app/",
      code: "https://github.com/Teekon789/my-nextjs-project",
      image: mn_2,
    },
    {
      title: t.projects_name.title2,
      desc: t.projects_name.desc2,
      demo: "https://next-dashboard-futureskill.vercel.app/",
      code: "https://github.com/Teekon789/next_futureskill",
      image: "https://i.imgur.com/6k7mDkR.png",
    },
  ];

  return (
    <div
      className={`${
        darkMode
          ? "bg-gradient-to-b from-gray-900 to-black"
          : "bg-gradient-to-b from-gray-100 to-white"
      } min-h-screen font-sans relative transition-colors duration-300`}
    >
      {/* Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        lang={lang}
        setLang={setLang}
        t={t}
      />

      {/* ส่วน Hero */}
      <section
        id="home"
        className={`flex flex-col items-center justify-center min-h-screen text-center px-4 font-thai leading-thai-normal ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 overflow-visible leading-thai-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span
            className={`
              inline-block
              py-1
              ${
                darkMode
                  ? "bg-gradient-to-br from-purple-400 via-pink-400 to-red-400"
                  : "bg-gradient-to-br from-purple-600 via-pink-600 to-red-600"
              }
              bg-clip-text 
              text-transparent
              font-bold
              transition-all 
              duration-300
              hover:scale-105
              thai-text
              ${
                darkMode
                  ? "drop-shadow-[0_2px_2px_rgba(236,72,153,0.3)]"
                  : "drop-shadow-[0_2px_2px_rgba(219,39,119,0.3)]"
              }
            `}
          >
            {t.greeting}
          </span>{" "}
          <span
            className={`
              relative 
              inline-block
              overflow-visible
              py-1
              thai-text
              ${
                darkMode
                  ? "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
                  : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
              }
              bg-clip-text 
              text-transparent
              transition-all 
              duration-300
              hover:scale-105
            `}
          >
            <TypeAnimation
              key={`${t.language}-${t.fullname}`}
              sequence={[t.fullname, 1000, "", 500]}
              wrapper="span"
              speed={50}
              style={{
                display: "inline-block",
                textShadow: darkMode
                  ? "0 0 20px rgba(129, 140, 248, 0.5)"
                  : "0 0 20px rgba(79, 70, 229, 0.3)",
                whiteSpace: "nowrap",
                overflow: "visible",
                lineHeight: "1.6",
                paddingTop: "0.25em",
                paddingBottom: "0.25em",
                height: "auto",
              }}
              repeat={Infinity}
            />
            <span
              className={`
                absolute 
                bottom-0 
                left-0 
                w-0 
                h-0.5 
                transition-all 
                duration-300 
                group-hover:w-full
                ${
                  darkMode
                    ? "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
                    : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
                }
              `}
            ></span>
          </span>
        </motion.h1>

        <motion.p
          className={`text-lg sm:text-xl md:text-2xl max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl mb-8 leading-relaxed py-1 thai-text ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {t.role}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.a
            href="#projects"
            className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-full text-white font-semibold transition-all shadow-lg hover:shadow-xl text-base sm:text-lg thai-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.viewProjects}
          </motion.a>

          <motion.a
            href="#contact"
            className={`px-8 py-3 rounded-full font-semibold border-2 text-base sm:text-lg thai-text
              ${
                darkMode
                  ? "border-gray-300 text-gray-300 hover:bg-gray-300 hover:text-gray-900"
                  : "border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
              } transition-all shadow-lg hover:shadow-xl`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.contactMe}
          </motion.a>
        </motion.div>
      </section>

      {/* ส่วน About Me */}
      <AboutMe darkMode={darkMode} t={t} profileImage={wakim} />

      {/* ส่วน Projects */}
      <section
        id="projects"
        className={`px-4 sm:px-6 py-12 sm:py-16 md:py-20 ${
          darkMode ? "bg-gray-700 " : "bg-gray-300"
        }`}
      >
        <h2
          className={`text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {t.featuredProjects}
          <div
            className={`h-1 w-20 mx-auto my-3 ${
              darkMode ? "bg-indigo-500" : "bg-indigo-400"
            } rounded-full`}
          ></div>
        </h2>
        <div className="max-w-6xl mx-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`text-justify p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg transition ${
                darkMode
                  ? "bg-gray-700 hover:shadow-indigo-500/50"
                  : "bg-white hover:shadow-indigo-300"
              }`}
              whileHover={{ scale: 1.03 }}
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
          ))}
        </div>
      </section>

      {/* ส่วน Skills  */}
      <Skills darkMode={darkMode} lang={lang} />

      {/* ส่วน Services */}
      <Services darkMode={darkMode} lang={lang} />

      {/* ส่วน Contact */}
      <Contact darkMode={darkMode} t={t} />

      {/* ปุ่มเลื่อนขึ้นด้านบน */}
      <Scrollup darkMode={darkMode} lang={lang} />
    </div>
  );
}
