{/* ส่วน Services Component - แสดงบริการและความเชี่ยวชาญ */}
import { motion } from "framer-motion";
import { FaCode, FaDatabase, FaTools, FaServer, FaMobileAlt, FaPaintBrush } from "react-icons/fa";

const Services = ({ darkMode, t }) => {
  // รายการบริการและความเชี่ยวชาญ
  const servicesList = [
    {
      icon: <FaCode className="text-2xl sm:text-3xl" />,
      title: t.services.webdev.title || "ซอฟต์แวร์และการพัฒนาเว็บไซต์",
      description: t.services.webdev.desc || "พัฒนาเว็บไซต์ด้วย React, Next.js, Vue.js และ Nuxt.js พร้อมการใช้ Tailwind CSS และ TypeScript สำหรับแอปพลิเคชันที่มีประสิทธิภาพและรองรับทุกอุปกรณ์",
      tools: ["React", "Next.js", "Vue.js", "Nuxt.js", "HTML", "CSS", "JavaScript", "TypeScript", "Tailwind CSS"]
    },
    {
      icon: <FaDatabase className="text-2xl sm:text-3xl" />,
      title: t.services.database.title || "ฐานข้อมูล",
      description: t.services.database.desc || "ออกแบบและจัดการฐานข้อมูลทั้งแบบ SQL และ NoSQL เพื่อจัดเก็บข้อมูลอย่างมีประสิทธิภาพและปลอดภัย",
      tools: ["MySQL", "PostgreSQL", "MongoDB"]
    },
    {
      icon: <FaServer className="text-2xl sm:text-3xl" />,
      title: t.services.backend.title || "การพัฒนา Backend",
      description: t.services.backend.desc || "พัฒนา API และระบบ Backend ด้วย Node.js, Express และ Python เพื่อรองรับการทำงานของแอปพลิเคชัน",
      tools: ["Node.js", "Express", "Rest API"]
    },
    {
      icon: <FaPaintBrush className="text-2xl sm:text-3xl" />,
      title: t.services.design.title || "การออกแบบ UI/UX",
      description: t.services.design.desc || "ออกแบบส่วนติดต่อผู้ใช้ที่สวยงามและใช้งานง่าย ด้วยหลักการ UX/UI ที่ทันสมัย",
      tools: ["Figma", "Canva", "Photoshop", "Responsive Design"]
    },
    {
      icon: <FaTools className="text-2xl sm:text-3xl" />,
      title: t.services.devtools.title || "เครื่องมือและเทคโนโลยีการพัฒนา",
      description: t.services.devtools.desc || "ชำนาญในการใช้เครื่องมือต่างๆ เพื่อเพิ่มประสิทธิภาพในกระบวนการพัฒนาซอฟต์แวร์",
      tools: ["Git", "GitHub", "Docker","Postman", "ChatGPT", "Vercel", ]
    }
  ];

  return (
    <section
      id="services"
      className={`py-12 sm:py-16 md:py-20 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* ส่วนหัวข้อ Services */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
            <h2
            className={`text-2xl sm:text-3xl my-3 font-bold  ${
                darkMode ? "text-white" : "text-gray-800"
            }`}
            >
            {t.services?.title || "บริการ"}
            </h2>
          {/* เส้นใต้หัวข้อ */}
          <div
            className={`h-1 w-20 sm:w-24 mx-auto ${
              darkMode ? "bg-indigo-500" : "bg-indigo-400"
            } rounded-full`}
          ></div>
          <p
            className={`mt-4 max-w-2xl mx-auto text-lg ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
          </p>
        </motion.div>

        {/* แสดงการ์ดบริการต่างๆ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesList.map((service, index) => (
            <motion.div
              key={index}
              className={`rounded-xl overflow-hidden shadow-lg ${
                darkMode 
                  ? "bg-gray-800 hover:bg-gray-700 hover:shadow-indigo-500/30" 
                  : "bg-white hover:shadow-indigo-300/30"
              } transition-all duration-300`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* ส่วนหัวการ์ด */}
              <div
                className={`${
                  darkMode ? "bg-gray-700" : "bg-indigo-50"
                } p-6 flex items-start`}
              >
                <div
                  className={`p-3 rounded-lg mr-4 ${
                    darkMode ? "bg-indigo-600 text-indigo-200" : "bg-indigo-100 text-indigo-600"
                  }`}
                >
                  {service.icon}
                </div>
                <h3
                  className={`text-xl font-bold ${
                    darkMode ? "text-indigo-300" : "text-indigo-600"
                  }`}
                >
                  {service.title}
                </h3>
              </div>

              {/* ส่วนเนื้อหาการ์ด */}
              <div className="p-6">
                <p
                  className={`mb-4 text-base ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {service.description}
                </p>

                {/* ส่วนแสดง Tools และ Technologies */}
                <div className="mt-4">
                  <h4
                    className={`text-sm font-semibold mb-2 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {t.services?.tools || "เครื่องมือและเทคโนโลยี"}:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {service.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2 py-1 rounded-full ${
                          darkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;