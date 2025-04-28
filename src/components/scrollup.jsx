import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

// แยกข้อความภาษาไทย
import textTH from "../lang/th";
import textEN from "../lang/en";

function Scrollup({ darkMode, lang }) {
  // สถานะสำหรับตรวจสอบตำแหน่งการเลื่อน
  const [showScrollTop, setShowScrollTop] = useState(false);
  // สถานะสำหรับการเปลี่ยนแปลงทิศทางการเลื่อน
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  // เก็บตำแหน่งเลื่อนก่อนหน้า
  const [lastScrollY, setLastScrollY] = useState(0);
  // สถานะสำหรับตรวจสอบการ hover
  const [isHovered, setIsHovered] = useState(false);
  // แยกข้อความตามภาษา
  const t = lang === "th" ? textTH : textEN;

  useEffect(() => {
    // ฟังก์ชันตรวจสอบการเลื่อนหน้า
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // ตรวจสอบทิศทางการเลื่อน
      if (currentScrollY < lastScrollY) {
        setIsScrollingUp(true);
      } else {
        setIsScrollingUp(false);
      }

      // บันทึกตำแหน่งล่าสุด
      setLastScrollY(currentScrollY);

      // แสดงปุ่มเมื่อเลื่อนลงมากกว่า 300px
      setShowScrollTop(currentScrollY > 300);
    };

    // เพิ่ม event listener
    window.addEventListener("scroll", handleScroll);

    // ทำความสะอาดเมื่อ component ถูกถอดออก
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // ฟังก์ชันเลื่อนขึ้นด้านบน
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: isScrollingUp ? 1.05 : 1,
          }}
          exit={{ opacity: 0, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          aria-label="Scroll to top"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* ปุ่มหลัก */}
          <motion.div
            className={`
              w-12 h-12
              flex items-center justify-center
              rounded-full 
              shadow-lg
              cursor-pointer
              ${
                darkMode
                  ? "bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600"
                  : "bg-gradient-to-tr from-indigo-500 via-indigo-400 to-purple-500"
              }
              ${darkMode ? "shadow-indigo-900/30" : "shadow-indigo-300/50"}
              relative
            `}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* ไอคอนลูกศรพร้อมอนิเมชัน */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <FaArrowUp className="w-4 h-4 text-white" />
            </motion.div>

            {/* เส้นขอบที่เคลื่อนไหว */}
            <motion.div
              className={`absolute inset-0 rounded-full border-2 ${
                darkMode ? "border-indigo-400" : "border-indigo-300"
              } opacity-0`}
              animate={{
                opacity: [0, 0.5, 0],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            />

            {/* เอฟเฟคสีเมื่อชี้เมาส์ */}
            <motion.div
              className="absolute inset-0 rounded-full bg-white opacity-0"
              whileHover={{ opacity: 0.2 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* ข้อความที่แสดงเมื่อ hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className={`
                  absolute 
                  right-14 top-1/2 -translate-y-1/2
                  px-3 py-2
                  rounded-md
                  text-sm
                  whitespace-nowrap
                  ${
                    darkMode
                      ? "bg-indigo-900 text-white"
                      : "bg-white text-indigo-800"
                  }
                  shadow-md
                `}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                {t.Scrollup.scrollToTop}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default Scrollup;
