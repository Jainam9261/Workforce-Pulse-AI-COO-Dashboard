import SkeletonChart from "../common/SkeletonChart";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const TrendChart = ({
  weeklyTrends,
  darkMode,
}) => {
  // Loading State
  if (!weeklyTrends?.length) {
    return <SkeletonChart />;
  }

  return (
    <div
      className={`rounded-3xl p-6 shadow-2xl border backdrop-blur-xl transition-all duration-300 mb-8 ${
        darkMode
          ? "bg-white/5 border-white/10"
          : "bg-white border-gray-200"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">
            Week-over-Week Trends
          </h2>

          <p className="text-gray-400 mt-2">
            Repetitive workload trend
            across operational
            activities
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-blue-500/20 text-blue-400 text-sm font-semibold">
          Live Trends
        </div>
      </div>

      {/* Chart */}
      <div className="h-[400px]">
        <ResponsiveContainer>
          <LineChart
            data={weeklyTrends}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.1}
            />

            <XAxis dataKey="week" />

            <YAxis />

            <Tooltip />

            {/* IMPORTANT FIX */}
            <Line
              type="monotone"
              dataKey="repetitive"
              stroke="#3B82F6"
              strokeWidth={4}
              dot={{
                r: 6,
                fill: "#3B82F6",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;