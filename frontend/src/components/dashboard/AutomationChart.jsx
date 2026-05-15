import SkeletonChart from "../common/SkeletonChart";

import {
  useMediaQuery,
} from "../../hooks/useMediaQuery";

import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

const AutomationChart = ({
  automationRanking,
}) => {
  const isWide =
    useMediaQuery(
      "(min-width: 640px)"
    );
  // Loading State
  if (!automationRanking?.length) {
    return <SkeletonChart />;
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl mb-6 sm:mb-8 backdrop-blur-xl min-w-0">
      {/* Header */}
      <div className="mb-4 sm:mb-6 min-w-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Automation Analysis
        </h2>

        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Task automation potential
          across operational
          workflows
        </p>
      </div>

      {/* Chart */}
      <div className="h-[300px] xs:h-[380px] sm:h-[450px] w-full min-h-[260px] min-w-0">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={automationRanking.slice(
              0,
              7
            )}
            margin={{
              top: 8,
              right: isWide
                ? 8
                : 4,
              bottom: isWide
                ? 8
                : 48,
              left: isWide
                ? 0
                : -8,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.1}
            />

            <XAxis
              dataKey="task_category"
              tick={{
                fontSize: isWide
                  ? 11
                  : 9,
              }}
              angle={
                isWide ? 0 : -45
              }
              textAnchor={
                isWide
                  ? "middle"
                  : "end"
              }
              height={
                isWide ? 48 : 72
              }
              interval={0}
            />

            <YAxis
              width={
                isWide ? 44 : 36
              }
              tick={{
                fontSize: isWide
                  ? 12
                  : 10,
              }}
            />

            <Tooltip />

            <Bar
              dataKey="automation_score"
              radius={[
                12, 12, 0, 0,
              ]}
              fill="#8B5CF6"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AutomationChart;