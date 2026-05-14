import SkeletonChart from "../common/SkeletonChart";

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
  // Loading State
  if (!automationRanking?.length) {
    return <SkeletonChart />;
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl mb-8 backdrop-blur-xl">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold">
          Automation Analysis
        </h2>

        <p className="text-gray-400 mt-2">
          Task automation potential
          across operational
          workflows
        </p>
      </div>

      {/* Chart */}
      <div className="h-[450px]">
        <ResponsiveContainer>
          <BarChart
            data={automationRanking.slice(
              0,
              7
            )}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.1}
            />

            <XAxis
              dataKey="task_category"
            />

            <YAxis />

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