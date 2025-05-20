import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaVuejs,
  FaNodeJs,
  FaGitAlt,
  FaNpm,
  FaPython,
  FaJava,
  FaDocker,
} from "react-icons/fa";
import {
  SiTypescript,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiTailwindcss,
  SiNextdotjs,
  SiPrisma,
  SiPhp,
  SiGithub,
  SiFigma,
  SiPostman,
  SiOpenai,
  SiCanva,
  SiGithubcopilot,
  SiNuxtdotjs,
  SiVite,
  SiAngular,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import Marquee from "react-fast-marquee";

// แยกข้อความภาษาไทย
import textTH from "../lang/th";
import textEN from "../lang/en";

export default function Skills({ darkMode, lang }) {
  // แยกข้อความตามภาษา
  const t = lang === "th" ? textTH : textEN;

  
  const skillCategories = [
    {
      name: "Languages", 
      skills: [
        { icon: FaJs, name: "JavaScript", color: "text-yellow-400" },
        { icon: SiTypescript, name: "TypeScript", color: "text-blue-500" },
        { icon: FaPython, name: "Python", color: "text-blue-600" },
        { icon: FaJava, name: "Java", color: "text-red-500" },
        { icon: SiPhp, name: "PHP", color: "text-purple-500" },
      ],
    },
    {
      name: t.frontend || "Frontend", 
      skills: [
        { icon: FaHtml5, name: "HTML", color: "text-orange-500" },
        { icon: FaCss3Alt, name: "CSS", color: "text-blue-500" },
        { icon: SiTailwindcss, name: "Tailwindcss", color: "text-blue-400" },
        { icon: FaReact, name: "React", color: "text-cyan-400" },
        { icon: FaVuejs, name: "Vue", color: "text-green-500" },
        { icon: SiAngular, name: "Angular", color: "text-red-600" },
      ],
    },
    {
      name: t.backend || "Backend", 
      skills: [
        { icon: FaNodeJs, name: "Node.js", color: "text-green-600" },
        {
          icon: SiExpress,
          name: "Express",
          color: darkMode ? "text-gray-300" : "text-gray-700",
        },
        { icon: SiMongodb, name: "MongoDB", color: "text-green-500" },
        { icon: SiPostgresql, name: "PostgreSQL", color: "text-blue-700" },
        { icon: SiMysql, name: "MySQL", color: "text-blue-500" },
        { icon: SiPrisma, name: "Prisma", color: "text-purple-500" },
      ],
    },
    {
      name: t.framework || "Framework", 
      skills: [
        {
          icon: SiNextdotjs,
          name: "Next.js",
          color: darkMode ? "text-gray-300" : "text-gray-700",
        },
        { icon: FaReact, name: "React Native", color: "text-cyan-500" },
        { icon: SiNuxtdotjs, name: "Nuxt.js", color: "text-green-500" },
         { icon: SiVite, name: "Vite", color: "text-purple-600" },
      ],
    },
    {
      name: "Development Tools", 
      skills: [
        { icon: VscVscode, name: "VS Code", color: "text-blue-500" },
        { icon: SiOpenai, name: "ChatGPT",  color: darkMode ? "text-gray-300" : "text-gray-700", },
        { icon: FaGitAlt, name: "Git", color: "text-orange-600" },
        {
          icon: SiGithub,
          name: "GitHub",
          color: darkMode ? "text-gray-300" : "text-gray-700",
        },
        { icon: FaDocker, name: "Docker", color: "text-blue-600" },
        { icon: SiFigma, name: "Figma", color: "text-purple-400" },
        { icon: SiPostman, name: "Postman", color: "text-orange-500" },
        { icon: FaNpm, name: "NPM", color: "text-red-500" },

        { icon: SiCanva, name: "Canva", color: "text-blue-400" },

        {
          icon: SiGithubcopilot,
          name: "GitHub Copilot",
          color: darkMode ? "text-gray-300" : "text-gray-700",
        },
      ],
    },
  ];

  // เอฟเฟคต์การเคลื่อนไหวของไอคอนแบบเรียบง่าย
  const iconAnimation = {
    rest: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  // เอฟเฟคต์การเคลื่อนไหวของข้อความ
  const textAnimation = {
    rest: { opacity: 0.8 },
    hover: { opacity: 1, transition: { duration: 0.3 } },
  };

  // กำหนดทิศทางการเคลื่อนที่ของ Marquee ให้สลับกันไปมา
  const getMarqueeDirection = (index) => {
    return index % 2 === 0 ? "left" : "right";
  };

  return (
    <section
      id="skills"
      className={`py-16 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* หัวข้อส่วนทักษะ */}
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t.skills}
          <div
            className={`h-1 w-24 mx-auto mt-4 ${
              darkMode ? "bg-indigo-500" : "bg-indigo-400"
            } rounded-full`}
          ></div>
        </motion.h2>

        {/* คำอธิบายทักษะ */}
        <motion.p
          className={`text-center max-w-2xl mx-auto mb-12 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t.skillsDesc}
        </motion.p>

        {/* แสดงทักษะตามหมวดหมู่ */}
        <div className="space-y-16">
          {skillCategories.map((category, catIndex) => (
            <div key={catIndex}>
              {/* ชื่อหมวดหมู่ */}
              <motion.h3
                className={`text-2xl font-semibold text-center mb-8 ${
                  darkMode ? "text-indigo-400" : "text-indigo-600"
                }`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {category.name}
              </motion.h3>

              <div className="py-4">
                <Marquee
                  speed={70}
                  gradient={false}
                  pauseOnHover={true}
                  direction={getMarqueeDirection(catIndex)}
                >
                  <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 px-4">
                    {category.skills.map((skill, index) => {
                      const Icon = skill.icon;
                      return (
                        <motion.div
                          key={index}
                          className="flex flex-col items-center justify-center gap-3 px-4"
                          initial="rest"
                          whileHover="hover"
                          whileTap="hover"
                        >
                          <motion.div variants={iconAnimation}>
                            <Icon
                              className={`text-4xl sm:text-5xl md:text-6xl ${skill.color} transition-all`}
                            />
                          </motion.div>
                          <motion.p
                            variants={textAnimation}
                            className={`text-base sm:text-lg font-medium transition-all`}
                          >
                            {skill.name}
                          </motion.p>
                        </motion.div>
                      );
                    })}
                  </div>
                </Marquee>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
