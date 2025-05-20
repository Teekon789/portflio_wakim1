import React from 'react';

export default function Footer({ darkMode }) {
  return (
    <footer className={`
      ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-700'}
      py-6
    `}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Left Section */}
          <div className="text-center md:text-left">
            <div className="text-base font-medium inline-block">
              <span>© {new Date().getFullYear()} </span>
              <span className="relative inline-block overflow-visible transition-all duration-300 hover:transform hover:scale-105">
                <span className={`${darkMode ? "text-indigo-400" : "text-indigo-600"}`}>Portfolio</span>
                <span className={`${darkMode ? "text-indigo-300" : "text-indigo-500"}`}>Wakim</span>
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 hover:w-full ${
                  darkMode ? "bg-indigo-300" : "bg-indigo-500"
                }`}></span>
              </span>
            </div>
          </div>

          {/* Right Section */}
          <div className="text-center md:text-right">
            <p className="text-sm font-medium hover:text-indigo-500 transition-colors duration-300">
              Design by Wakim.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}