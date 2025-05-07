// components/Projects.jsx
import { motion } from "framer-motion";
import mn_2 from "../assets/mn_2.png";

const Projects = ({ darkMode, t }) => {
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
    <section
      id="projects"
      className={`px-4 sm:px-6 py-12 sm:py-16 md:py-20 ${
        darkMode
          ? "bg-gradient-to-b from-gray-700 to-gray-800"
          : "bg-gradient-to-b from-gray-100 to-gray-200"
      }`}
    >
      {/* หัวข้อส่วนโปรเจกต์ */}
      <h2
        className={`text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        {t.featuredProjects}
        {/* เส้นใต้หัวข้อ */}
        <div
          className={`h-1 w-20 mx-auto my-3 ${
            darkMode ? "bg-indigo-500" : "bg-indigo-400"
          } rounded-full`}
        ></div>
      </h2>

      {/* กริดแสดงรายการโปรเจกต์ */}
      <div className="max-w-6xl mx-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project, index) => (
          <ProjectCard 
            key={index} 
            project={project} 
            darkMode={darkMode} 
            t={t} 
          />
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ project, darkMode, t }) => {
    return (
      <motion.div
        className={`text-justify p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg transition flex flex-col h-full ${
          darkMode
            ? "bg-gray-700 hover:shadow-indigo-500/50"
            : "bg-white hover:shadow-indigo-300"
        }`}
        whileHover={{ scale: 1.03 }}
      >
        {/* ส่วนหัวการ์ด - รูปภาพและชื่อโปรเจกต์ */}
        <div className="flex flex-row mb-3 sm:mb-4 gap-x-3 sm:gap-x-4 rounded-lg items-center">
          <span className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-200 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </span>
        </div>
        
        {/* ชื่อโปรเจกต์ */}
        <h3
          className={`text-lg sm:text-xl font-semibold mb-2 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {project.title}
        </h3>
        
        {/* คำอธิบายโปรเจกต์ */}
        <p
          className={`mb-3 sm:mb-4 text-sm sm:text-base flex-grow ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {project.desc}
        </p>
        
        {/* ลิงก์ Demo และ Code */}
        <div className="flex gap-3 sm:gap-4 text-sm sm:text-base mt-auto">
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
  };

export default Projects;