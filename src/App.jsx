import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
} from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiNuxtdotjs } from "react-icons/si";
import Marquee from "react-fast-marquee";
import mn_2 from "./assets/mn_2.png";
import wakim from "./assets/wakim.jpg";
import resumeFile from "./assets/Resume.pdf";
import Navbar from "./components/navbar";

// แยกข้อความภาษาไทย
import textTH from "./lang/th";
import textEN from "./lang/en";

export default function Portfolio() {
  const [lang, setLang] = useState("th");
  const [darkMode, setDarkMode] = useState(true);
  const t = lang === "th" ? textTH : textEN;

  // ฟังก์ชันดาวน์โหลดเรซูเม่
  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = resumeFile; // เปลี่ยนเป็นที่อยู่ของไฟล์เรซูเม่
    link.download = "Resume.pdf"; // ชื่อไฟล์เมื่อดาวน์โหลด
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const projects = [
    {
      title: t.projects_name.title,
      desc: t.projects_name.desc,
      demo: "https://egovtrip.vercel.app/",
      code: "https://github.com/Teekon789/my-nextjs-project",
      image: mn_2,
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
        className={`flex flex-col items-center justify-center text-center pt-16 pb-12 sm:py-20 px-4 ${
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
        <motion.a
          href="#projects"
          className="bg-indigo-500 hover:bg-indigo-600 px-5 sm:px-6 py-2 rounded-full text-white font-semibold transition text-sm sm:text-base"
          whileHover={{ scale: 1.05 }}
        >
          {t.viewProjects}
        </motion.a>
      </section>

      {/* ส่วน About Me */}
      <section
        id="about"
        className={`py-12 sm:py-16 md:py-20 ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
        }`}
      >
        {/* Container หลัก */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* ส่วนหัวข้อ About Me */}
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
            {/* เส้นใต้หัวข้อ */}
            <div
              className={`h-1 w-20 sm:w-24 mx-auto ${
                darkMode ? "bg-indigo-500" : "bg-indigo-400"
              } rounded-full`}
            ></div>
          </motion.div>

          {/* ส่วนเนื้อหา - จัดวางแบบ Flex */}
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
            {/* ส่วนรูปโปรไฟล์ - ตรงกลางเสมอ */}
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

            {/* ส่วนข้อความ */}
            <motion.div
              className="w-full lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6 sm:space-y-8">
                {/* ข้อความเกี่ยวกับตัวฉัน */}
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
                    {/* รายการการศึกษา */}
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

                    {/* รายการมหาวิทยาลัย */}
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

                {/* ปุ่มดาวน์โหลด Resume */}
                <div className="flex justify-center lg:justify-start">
                  <motion.button
                    onClick={handleDownloadResume}
                    className={`flex items-center gap-2 sm:gap-3 px-5 sm:px-6 py-2 sm:py-3 rounded-full text-base sm:text-lg font-medium ${
                      darkMode
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-indigo-500 hover:bg-indigo-600"
                    } text-white transition-colors cursor-pointer hover:cursor-pointer`}
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

      {/* ส่วน Skills */}
      <div
        id="skills"
        className={`py-4 ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 sm:mb-4">
          {t.skills}
        </h2>
        <div
          className={`h-1 w-20 mx-auto ${
            darkMode ? "bg-indigo-500" : "bg-indigo-400"
          } rounded-full`}
        ></div>
        <Marquee
          speed={100}
          pauseOnHover={true}
          gradient={false}
          className={`py-4 ${
            darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
          }`}
        >
          <div className="flex flex-wrap justify-center gap-10 sm:gap-20 px-4 py-6 sm:py-8">
            {[
              { icon: FaHtml5, name: "HTML", color: "text-orange-500" },
              { icon: FaCss3Alt, name: "CSS", color: "text-blue-500" },
              { icon: FaJs, name: "JavaScript", color: "text-yellow-400" },
              { icon: FaJs, name: "TypeScript", color: "text-blue-500" },
              { icon: FaReact, name: "React", color: "text-cyan-400" },
              {
                icon: RiTailwindCssFill,
                name: "Tailwind",
                color: "text-blue-400",
              },
              { icon: FaVuejs, name: "Vue", color: "text-green-400" },
              {
                icon: RiNextjsFill,
                name: "Next",
                color: darkMode ? "text-gray-400" : "text-gray-600",
              },
              {
                icon: SiNuxtdotjs,
                name: "Nuxt",
                color: darkMode ? "text-gray-400" : "text-gray-600",
              },
            ].map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 sm:gap-3 group"
                >
                  <Icon
                    className={`text-4xl sm:text-5xl md:text-6xl ${skill.color} group-hover:scale-110 transition-transform`}
                  />
                  <p
                    className={`text-lg sm:text-xl font-medium ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {skill.name}
                  </p>
                </div>
              );
            })}
          </div>
        </Marquee>
      </div>

      {/* ส่วน Projects */}
      <section
        id="projects"
        className={`px-4 sm:px-6 py-12 sm:py-16 md:py-20 ${
          darkMode ? "bg-gray-800" : "bg-gray-200"
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

      {/* ส่วน Contact */}
      <section
        className={`px-4 sm:px-6 py-12 sm:py-16 md:py-20 ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
          {t.contactMe}
          <div
            className={`h-1 w-20 mx-auto my-3  ${
              darkMode ? "bg-indigo-500" : "bg-indigo-400"
            } rounded-full`}
          ></div>
        </h2>
        <div className="flex justify-center space-x-4 sm:space-x-6">
          <a
            href="https://github.com/Teekon789"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <FaGithub
              className={`w-6 h-6 ${
                darkMode ? "text-gray-200" : "text-gray-800"
              }`}
            />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=teeboy789456@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <FaEnvelope
              className={`w-6 h-6 ${
                darkMode ? "text-gray-200" : "text-gray-800"
              }`}
            />
          </a>
        </div>
      </section>
    </div>
  );
}
