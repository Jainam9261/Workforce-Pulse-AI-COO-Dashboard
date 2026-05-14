import {
  LayoutDashboard,
  Bot,
  AlertTriangle,
  Users,
  BarChart3,
} from "lucide-react";

const Sidebar = ({ darkMode }) => {
  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      section: "dashboard",
    },

    {
      title: "Automation",
      icon: <Bot size={20} />,
      section: "automation",
    },

    {
      title: "Analytics",
      icon: <BarChart3 size={20} />,
      section: "analytics",
    },

    {
      title: "Anomalies",
      icon: (
        <AlertTriangle size={20} />
      ),
      section: "anomalies",
    },

    {
      title: "Employees",
      icon: <Users size={20} />,
      section: "employees",
    },
  ];

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
      });
    }
  };

  return (
    <div
      className={`w-[260px] min-h-screen sticky top-0 border-r backdrop-blur-2xl p-6 hidden lg:flex flex-col transition-all duration-300 ${
        darkMode
          ? "bg-white/5 border-white/10 text-white"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          AI Ops
        </h1>

        <p
          className={`text-sm mt-1 ${
            darkMode
              ? "text-gray-400"
              : "text-gray-500"
          }`}
        >
          Productivity Intelligence
        </p>
      </div>

      {/* Menu */}
      <div className="space-y-2">
        {menuItems.map(
          (item, index) => (
            <button
              key={index}
              onClick={() =>
                scrollToSection(
                  item.section
                )
              }
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                index === 0
                  ? "bg-blue-500 text-white shadow-lg"
                  : darkMode
                  ? "hover:bg-white/10 text-gray-300"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {item.icon}

              <span className="font-medium">
                {item.title}
              </span>
            </button>
          )
        )}
      </div>

      {/* Bottom Card */}
      <div
        className={`mt-auto rounded-3xl border p-5 transition-all duration-300 ${
          darkMode
            ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-white/10"
            : "bg-gradient-to-br from-blue-100 to-purple-100 border-gray-200"
        }`}
      >
        <h3 className="font-semibold text-lg">
          AI Insights
        </h3>

        <p
          className={`text-sm mt-2 leading-relaxed ${
            darkMode
              ? "text-gray-300"
              : "text-gray-600"
          }`}
        >
          Detect automation opportunities and workforce anomalies using AI-powered analytics.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;