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
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
      {/* Left */}
      <div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          COO Automation Dashboard
        </h1>

        <p className="text-gray-400 mt-2 text-lg">
          AI-powered operational
          analytics platform
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Export Button */}
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 transition-all text-white font-semibold shadow-lg"
        >
          <Download size={18} />

          Download Report
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