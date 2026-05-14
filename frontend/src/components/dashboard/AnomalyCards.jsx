// frontend/src/components/dashboard/AnomalyCards.jsx

import {
  useMemo,
  useState,
} from "react";

import {
  Search,
  AlertTriangle,
  Filter,
} from "lucide-react";

import {
  formatNumber,
} from "../../utils/formatters";

const AnomalyCards = ({
  anomalies,
  darkMode,
}) => {
  const [search, setSearch] =
    useState("");

  const [
    selectedSeverity,
    setSelectedSeverity,
  ] = useState("All");

  // Unique Severities
  const severities =
    useMemo(() => {
      const uniqueSeverities =
        new Set(
          anomalies.map(
            (item) =>
              item.severity
          )
        );

      return [
        "All",
        ...uniqueSeverities,
      ];
    }, [anomalies]);

  // Filtered Anomalies
  const filteredAnomalies =
    anomalies.filter((anomaly) => {
      const matchesSearch =
        anomaly.employee_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        anomaly.department
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesSeverity =
        selectedSeverity ===
          "All" ||
        anomaly.severity ===
          selectedSeverity;

      return (
        matchesSearch &&
        matchesSeverity
      );
    });

  return (
    <div
      className={`rounded-3xl p-6 border shadow-2xl backdrop-blur-xl transition-all duration-300 ${
        darkMode
          ? "bg-white/5 border-white/10"
          : "bg-white border-gray-200"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center">
              <AlertTriangle />
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                Anomaly Detection
              </h2>

              <p className="text-gray-400 mt-1">
                Workforce anomaly
                insights and
                repetitive workload
                analysis
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl border ${
              darkMode
                ? "bg-[#111827] border-white/10"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <Search
              size={18}
              className="text-gray-400"
            />

            <input
              type="text"
              placeholder="Search anomalies..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className={`bg-transparent outline-none ${
                darkMode
                  ? "text-white placeholder:text-gray-500"
                  : "text-gray-900"
              }`}
            />
          </div>

          {/* Severity Filter */}
          <div
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl border ${
              darkMode
                ? "bg-[#111827] border-white/10"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <Filter
              size={18}
              className="text-gray-400"
            />

            <select
              value={
                selectedSeverity
              }
              onChange={(e) =>
                setSelectedSeverity(
                  e.target.value
                )
              }
              className={`outline-none rounded-xl px-2 py-1 transition-all ${
                darkMode
                  ? "bg-[#111827] text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              {severities.map(
                (
                  severity,
                  index
                ) => (
                  <option
                    key={index}
                    value={severity}
                    className={
                      darkMode
                        ? "bg-[#111827] text-white"
                        : "bg-white text-black"
                    }
                  >
                    {severity}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      </div>

      {/* Count */}
      <div className="mb-5">
        <p className="text-sm text-gray-400">
          Showing{" "}
          <span className="font-semibold text-red-400">
            {
              filteredAnomalies.length
            }
          </span>{" "}
          anomalies
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredAnomalies.map(
          (anomaly, index) => (
            <div
              key={index}
              className={`rounded-3xl p-5 border transition-all hover:scale-[1.02] ${
                darkMode
                  ? "bg-[#111827] border-white/10"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* Top */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold">
                    {
                      anomaly.employee_name
                    }
                  </h3>

                  <p className="text-gray-400 mt-1">
                    {
                      anomaly.department
                    }
                  </p>
                </div>

                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${
                    anomaly.severity ===
                    "high"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {anomaly.severity}
                </span>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-gray-400">
                    Repetitive Minutes
                  </p>

                  <span className="font-semibold">
                    {formatNumber(
                      anomaly.repetitive_minutes
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-gray-400">
                    Tasks
                  </p>

                  <span className="font-semibold">
                    {formatNumber(
                      anomaly.repetitive_tasks
                    )}
                  </span>
                </div>
              </div>

              {/* Reason */}
              <div
                className={`mt-5 px-4 py-3 rounded-2xl text-sm ${
                  anomaly.severity ===
                  "high"
                    ? "bg-red-500/10 text-red-400"
                    : "bg-yellow-500/10 text-yellow-400"
                }`}
              >
                {
                  anomaly.anomaly_reason
                }
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AnomalyCards;