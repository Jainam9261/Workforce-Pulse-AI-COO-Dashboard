import { Moon, Sun } from "lucide-react";

const ThemeToggle = ({
  darkMode,
  setDarkMode,
}) => {
  return (
    <button
      type="button"
      onClick={() =>
        setDarkMode(!darkMode)
      }
      aria-label={
        darkMode
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl hover:scale-105 transition-all w-full xs:w-auto"
    >
      {darkMode ? (
        <Sun
          size={18}
          className="shrink-0"
        />
      ) : (
        <Moon
          size={18}
          className="shrink-0"
        />
      )}

      <span className="text-sm sm:text-base">
        <span className="sm:hidden">
          {darkMode ? "Light" : "Dark"}
        </span>

        <span className="hidden sm:inline">
          {darkMode
            ? "Light Mode"
            : "Dark Mode"}
        </span>
      </span>
    </button>
  );
};

export default ThemeToggle;