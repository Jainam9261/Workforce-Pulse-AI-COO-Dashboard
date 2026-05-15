import SkeletonChart from "../common/SkeletonChart";

import {
  useMediaQuery,
} from "../../hooks/useMediaQuery";

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
  const isWide =
    useMediaQuery(
      "(min-width: 640px)"
    );
  // Loading State
  if (!weeklyTrends?.length) {
    return <SkeletonChart />;
  }

  return (
    <div
      className={`rounded-3xl p-4 sm:p-6 shadow-2xl border backdrop-blur-xl transition-all duration-300 mb-6 sm:mb-8 min-w-0 ${
        darkMode
          ? "bg-white/5 border-white/10"
          : "bg-white border-gray-200"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 min-w-0">
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Week-over-Week Trends
          </h2>

          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Repetitive workload trend
            across operational
            activities
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-blue-500/20 text-blue-400 text-sm font-semibold shrink-0 self-start sm:self-auto">
          Live Trends
        </div>
      </div>

      {/* Chart */}
      <div className="h-[260px] xs:h-[320px] sm:h-[400px] w-full min-h-[220px] min-w-0">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={weeklyTrends}
            margin={{
              top: 8,
              right: isWide
                ? 8
                : 0,
              bottom: isWide
                ? 8
                : 16,
              left: isWide
                ? 0
                : -12,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.1}
            />

            <XAxis
              dataKey="week"
              tick={{
                fontSize: isWide
                  ? 12
                  : 10,
              }}
              angle={
                isWide ? 0 : -35
              }
              textAnchor={
                isWide
                  ? "middle"
                  : "end"
              }
              height={
                isWide ? 36 : 52
              }
              interval="preserveStartEnd"
            />

            <YAxis
              width={
                isWide ? 40 : 32
              }
              tick={{
                fontSize: isWide
                  ? 12
                  : 10,
              }}
            />

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