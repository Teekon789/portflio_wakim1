// Navbar Component พร้อมปุ่มควบคุม Dark Mode และภาษา
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";

const Navbar = ({ darkMode, setDarkMode, lang, setLang, t }) => {
  // สร้าง state สำหรับเปิด/ปิด mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // สร้าง state เพื่อตรวจสอบการเลื่อนหน้า
  const [scrolled, setScrolled] = useState(false);

  // ฟังก์ชันสำหรับการเปิด/ปิด menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // ฟังก์ชันสำหรับปิด menu (เมื่อคลิกที่ link)
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // ฟังก์ชันสำหรับเปลี่ยน Dark/Light Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // ฟังก์ชันสำหรับเปลี่ยนภาษา
  const toggleLanguage = () => {
    setLang(lang === "th" ? "en" : "th");
  };

  // ตรวจสอบการเลื่อนหน้าเพื่อเปลี่ยนสี background ของ navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Cleanup event listener เมื่อ component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // รายการเมนูสำหรับการนำทาง
  const navItems = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.skills, href: "#skills" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.contact, href: "#contact" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? darkMode
            ? "bg-gray-900/95 shadow-md shadow-indigo-500/20"
            : "bg-white/95 shadow-md shadow-gray-300/30"
          : darkMode
          ? "bg-transparent"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4 md:py-5">
          {/* โลโก้ */}
          <a 
            href="#home" 
            className={`text-xl font-bold ${
              darkMode ? "text-indigo-400" : "text-indigo-600"
            }`}
          >
            {t.fullname}
          </a>

          {/* เมนูสำหรับหน้าจอขนาดใหญ่ (desktop) */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-300 ${
                  darkMode
                    ? "text-gray-300 hover:text-indigo-400"
                    : "text-gray-700 hover:text-indigo-600"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* ปุ่มควบคุม (ที่ย้ายมาจากเดิม) - สำหรับหน้าจอขนาดใหญ่ */}
          <div className="hidden md:flex items-center space-x-4">
            {/* ปุ่มเปลี่ยน Dark/Light Mode */}
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

            {/* ปุ่มเปลี่ยนภาษา */}
            <button
              onClick={toggleLanguage}
              className={`text-xs sm:text-sm px-3 sm:px-4 py-1 rounded-full cursor-pointer ${
                darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-blue-100 text-gray-800 hover:bg-blue-200"
              }`}
            >
              {lang === "th" ? "English" : "ภาษาไทย"}
            </button>
          </div>

          {/* ปุ่มแฮมเบอร์เกอร์ (เฉพาะบนมือถือ) */}
          <div className="md:hidden flex items-center">
            {/* ปุ่มเปลี่ยน Dark/Light Mode สำหรับมือถือ */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 mr-2 rounded-full cursor-pointer ${
                darkMode
                  ? "bg-gray-700 text-yellow-300"
                  : "bg-blue-100 text-gray-800"
              }`}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <FiSun className="w-4 h-4" />
              ) : (
                <FiMoon className="w-4 h-4" />
              )}
            </button>

            {/* ปุ่มเมนู */}
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-full focus:outline-none ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* เมนูบนมือถือ (แสดงเมื่อกดปุ่มแฮมเบอร์เกอร์) */}
      {isMenuOpen && (
        <motion.div
          className={`md:hidden ${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-lg`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  darkMode
                    ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                }`}
              >
                {item.name}
              </a>
            ))}
            
            {/* ปุ่มเปลี่ยนภาษาในเมนูมือถือ */}
            <div className="px-3 py-2">
              <button
                onClick={toggleLanguage}
                className={`text-sm px-4 py-1 rounded-full cursor-pointer w-full text-left ${
                  darkMode
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {lang === "th" ? "English" : "ภาษาไทย"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;