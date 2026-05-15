import {
  LayoutDashboard,
  Bot,
  AlertTriangle,
  Users,
  BarChart3,
} from "lucide-react";

const scrollToSection = (
  sectionId
) => {
  const element =
    document.getElementById(
      sectionId
    );

  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

const MobileBottomNav = ({
  darkMode,
}) => {
  const items = [
    {
      section: "dashboard",
      label: "Home",
      icon: LayoutDashboard,
    },

    {
      section: "automation",
      label: "Auto",
      icon: Bot,
    },

    {
      section: "analytics",
      label: "Trends",
      icon: BarChart3,
    },

    {
      section: "anomalies",
      label: "Alerts",
      icon: AlertTriangle,
    },

    {
      section: "employees",
      label: "Team",
      icon: Users,
    },
  ];

  return (
    <nav
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-xl px-1 pt-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] ${
        darkMode
          ? "bg-[#0B1120]/95 border-white/10"
          : "bg-white/95 border-gray-200"
      }`}
      aria-label="Dashboard sections"
    >
      <div className="flex items-stretch justify-around gap-0.5 max-w-lg mx-auto">
        {items.map(
          ({
            section,
            label,
            icon: Icon,
          }) => (
            <button
              key={section}
              type="button"
              onClick={() =>
                scrollToSection(
                  section
                )
              }
              className={`flex flex-1 min-w-0 flex-col items-center justify-center gap-0.5 rounded-2xl py-1.5 px-0.5 text-[10px] font-medium transition-colors ${
                darkMode
                  ? "text-gray-400 active:bg-white/10 hover:text-white"
                  : "text-gray-600 active:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon
                className="shrink-0"
                size={20}
                strokeWidth={
                  2
                }
                aria-hidden
              />

              <span className="truncate max-w-full">
                {label}
              </span>
            </button>
          )
        )}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
