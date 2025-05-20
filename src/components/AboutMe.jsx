import { motion } from "framer-motion";
import {
  FaDownload,
  FaGraduationCap,
  FaUniversity,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { LiaCertificateSolid } from "react-icons/lia";
import resumeFile from "../assets/Resume.pdf"; // Adjust path as needed

export default function AboutMe({ darkMode, t, profileImage }) {
  // ฟังก์ชันดาวน์โหลดเรซูเม่
  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = resumeFile; // เปลี่ยนเป็นที่อยู่ของไฟล์เรซูเม่
    link.download = "Resume.pdf"; // ชื่อไฟล์เมื่อดาวน์โหลด
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ข้อมูลการศึกษา
  const educationInfo = [
    {
      icon: <FaGraduationCap className="text-xl sm:text-2xl" />,
      title: t.about.education,
      description: t.about.major,
    },
    {
      icon: <FaUniversity className="text-xl sm:text-2xl" />,
      title: t.about.university_name,
      description: t.about.university,
    },
    // เพิ่มรายการเพิ่มเติม
  ];

  // ข้อมูลประกาศนียบัตร
  const certificateInfo = [
    {
      icon: <LiaCertificateSolid className="text-xl sm:text-2xl" />,
      title: t.certificate.title,
      description: t.certificate.desc,
      link: "https://app.futureskill.co/api/certificate?courseId=898&userId=243133", // ปรับลิงก์ตามความเหมาะสม
      linkText: t.certificate.view,
    },
    // สามารถเพิ่มประกาศนียบัตรอื่นๆ ที่นี่
  ];

  return (
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
            className={`text-2xl sm:text-3xl my-3 font-bold ${
              darkMode ? "text-white" : "text-gray-800"
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
                src={profileImage}
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

              {/* ส่วนข้อมูลการศึกษา */}
              <div
                className={`p-4 sm:p-6 rounded-xl ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                } shadow-md w-full text-left`}
              >
                <h3
                  className={`text-lg sm:text-xl font-semibold mb-4 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Education
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  {/* วนซ้ำผ่านรายการข้อมูลการศึกษา */}
                  {educationInfo.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full"
                    >
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                          darkMode
                            ? "bg-indigo-800 text-indigo-200"
                            : "bg-indigo-100 text-indigo-600"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div className="w-full">
                        <h3
                          className={`text-lg sm:text-xl font-semibold ${
                            darkMode ? "text-indigo-300" : "text-indigo-600"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={`mt-1 text-sm sm:text-base ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ส่วนประกาศนียบัตร */}
              <motion.div
                className={`p-4 sm:p-6 rounded-xl ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                } shadow-md w-full text-left`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <h3
                  className={`text-lg sm:text-xl font-semibold mb-4 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Certificates
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  {/* วนซ้ำผ่านรายการข้อมูลประกาศนียบัตร */}
                  {certificateInfo.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full"
                    >
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                          darkMode
                            ? "bg-indigo-800 text-indigo-200"
                            : "bg-indigo-100 text-indigo-600"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div className="w-full">
                        <h3
                          className={`text-lg sm:text-xl font-semibold ${
                            darkMode ? "text-indigo-300" : "text-indigo-600"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={`mt-1 text-sm sm:text-base ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {item.description}
                        </p>
                        {/* ลิงก์ดูประกาศนียบัตร */}
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 mt-2 text-sm sm:text-base font-medium transition-colors ${
                            darkMode
                              ? "text-indigo-300 hover:text-indigo-200"
                              : "text-indigo-600 hover:text-indigo-800"
                          }`}
                        >
                          {item.linkText}{" "}
                          <FaExternalLinkAlt className="text-xs sm:text-sm ml-1" />
                          <span
                            className={`${
                              darkMode
                                ? "text-indigo-300"
                                : "text-indigo-600"
                            } text-xs sm:text-sm font-bold`}
                          >
                            2025
                          </span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

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
  );
}
