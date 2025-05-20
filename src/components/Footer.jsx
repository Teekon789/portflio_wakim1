import React from 'react';

export default function Footer({ darkMode }) {
  return (
    <footer className={`
      ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-700'}
      py-6
    `}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Left Section */}
          <div className="text-center md:text-left">
            <p className="text-sm">
              © {new Date().getFullYear()} PortfolioWakim
            </p>
          </div>

          {/* Center Section */}
          <div className="text-center">
            <p className="text-sm font-medium">
              Made with by Wakim
            </p>
          </div>

          {/* Right Section */}
          <div className="text-center md:text-right">
            <p className="text-sm font-light hover:text-indigo-500 transition-colors duration-300">
              Design by Wakim.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}