import { Moon, Sun } from "lucide-react";

const ThemeToggle = ({
  darkMode,
  setDarkMode,
}) => {
  return (
    <button
      onClick={() =>
        setDarkMode(!darkMode)
      }
      className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl hover:scale-105 transition-all"
    >
      {darkMode ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}

      <span>
        {darkMode
          ? "Light Mode"
          : "Dark Mode"}
      </span>
    </button>
  );
};

export default ThemeToggle;