import { motion } from "framer-motion";
import { FaGithub, FaEnvelope } from "react-icons/fa";
import { SiLine } from "react-icons/si";

const Contact = ({ darkMode, t }) => {
  // ข้อมูลการติดต่อ
  const contactInfo = [
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: "Email",
      value: "wakim.transaction@gmail.com",
      link: "wakim.transaction@gmail.com",
    },
    {
      icon: <FaGithub className="text-2xl" />,
      title: "GitHub",
      value: "Github.com/Teekon789",
      link: "https://github.com/Teekon789",
    },
    {
      icon: <SiLine className="text-2xl" />,
      title: "Line",
      value: "Wakim Sutthi",
      link: "https://line.me/ti/p/3DTC34SsXy",
    },
  ];

  return (
    <section
      id="contact"
      className={`py-20 ${
        darkMode
          ? "bg-gradient-to-b from-gray-800 to-gray-900"
          : "bg-gradient-to-b from-gray-100 to-gray-200"
      }`}
    >
      {/* หัวข้อส่วน Contact */}
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-3xl font-bold text-center mb-12 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {t.contactMe}
          <div
            className={`h-1 w-20 mx-auto mt-3 ${
              darkMode ? "bg-indigo-500" : "bg-indigo-600"
            } rounded-full`}
          />
        </motion.h2>

        {/* การ์ดข้อมูลติดต่อ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 p-8 rounded-2xl shadow-xl ${
              darkMode
                ? "bg-gray-800 shadow-purple-500/20"
                : "bg-white shadow-indigo-200"
            }`}
          >
            {contactInfo.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className={`flex flex-col items-center p-6 rounded-xl transition-all ${
                  darkMode
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-gray-50 text-gray-600"
                }`}
              >
                <div
                  className={`p-4 rounded-full mb-4 ${
                    darkMode
                      ? "bg-gray-700 text-indigo-400"
                      : "bg-indigo-100 text-indigo-600"
                  }`}
                >
                  {item.icon}
                </div>
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-center">{item.value}</p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;