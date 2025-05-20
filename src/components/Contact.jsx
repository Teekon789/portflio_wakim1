import React, { useState, useEffect } from "react";
import { FaGithub, FaEnvelope, FaLinkedin } from "react-icons/fa";
import { SiLine } from "react-icons/si";

const Contact = ({ darkMode, t }) => {
  // ระบุให้ติดตามว่าผู้ใช้ใช้โทรศัพท์มือถือหรือไม่
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileRegex =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      setIsMobile(mobileRegex.test(userAgent));
    };
    // ตรวจสอบว่าเป็นมือถือหรือไม่เมื่อโหลดคอมโพเนนต์
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ฟังก์ชันเพื่อสร้างลิงก์อีเมลที่แตกต่างกันสำหรับมือถือและเดสก์ท็อป
  const getEmailLink = () => {
    const email = "wakim.transaction@gmail.com";
    const subject = "Contact from Web Portfolio_Wakim";
    const body = "Hello Wakim...";

    if (isMobile) {
      return `mailto:${email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    }

    // สำหรับเดสก์ท็อป
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      title: "Email",
      value: "wakim.transaction@gmail.com",
      // ลิงค์ไดนามิกที่เปลี่ยนแปลงตามอุปกรณ์
      getDynamicLink: getEmailLink,
    },
    {
      icon: <FaGithub className="w-5 h-5" />,
      title: "GitHub",
      value: "Github.com/Teekon789",
      link: "https://github.com/Teekon789",
    },
    {
      icon: <SiLine className="w-5 h-5" />,
      title: "Line",
      value: "Wakim Sutthi (id: Teekon789)",
      link: "https://line.me/ti/p/3DTC34SsXy",
    },
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      title: "LinkedIn",
      value: t.LinkedIn || "wakim-sutthi",
      // ลิงค์ไดนามิกที่เปลี่ยนแปลงตามอุปกรณ์
      link: "https://www.linkedin.com/in/wakim-sutthi/",
    },
  ];

  return (
    <section
      id="contact"
      className={`py-16 ${
        darkMode
          ? "bg-gradient-to-b from-gray-800 to-gray-900"
          : "bg-gradient-to-b from-gray-100 to-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className={`text-2xl sm:text-3xl font-bold mb-3 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {t?.contactMe || "Contact Me"}
          </h2>
          <div
            className={`h-1 w-20 mx-auto mt-3 rounded-full ${
              darkMode ? "bg-indigo-400" : "bg-indigo-500"
            }`}
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactInfo.map((item, index) => (
              <a
                key={index}
                href={item.getDynamicLink ? item.getDynamicLink() : item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center p-6 rounded-lg transition-all transform hover:scale-105 ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700 shadow-lg text-gray-200"
                    : "bg-white hover:bg-gray-50 shadow-lg text-gray-700"
                }`}
              >
                <div
                  className={`p-4 rounded-full mr-5 ${
                    darkMode
                      ? "bg-gray-700 text-indigo-300"
                      : "bg-indigo-100 text-indigo-600"
                  }`}
                >
                  {item.icon}
                </div>
                <div>
                  <h3
                    className={`text-lg font-semibold mb-1 ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm">{item.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
