import ThemeToggle from "../common/ThemeToggle";

import {
  Download,
} from "lucide-react";

import exportReport from "../../utils/exportReport";

const Header = ({
  darkMode,
  setDarkMode,
  metrics,
  automationRanking,
  anomalies,
}) => {
  const handleExport = () => {
    exportReport({
      metrics,
      automationRanking,
      anomalies,
    });
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 min-w-0">
      {/* Left */}
      <div className="min-w-0">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight break-words">
          COO Automation Dashboard
        </h1>

        <p className="text-gray-400 mt-2 text-sm sm:text-base md:text-lg">
          AI-powered operational
          analytics platform
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 shrink-0 min-w-0">
        {/* Export Button */}
        <button
          onClick={handleExport}
          className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 transition-all text-white text-sm sm:text-base font-semibold shadow-lg w-full xs:w-auto"
        >
          <Download
            size={18}
            className="shrink-0"
          />

          <span className="truncate">
            Download Report
          </span>
        </button>

        {/* Theme Toggle */}
        <ThemeToggle
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </div>
    </div>
  );
};

export default Header;