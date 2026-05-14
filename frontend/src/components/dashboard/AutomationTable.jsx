import SkeletonTable from "../common/SkeletonTable";

import {
  formatCurrency,
  formatNumber,
} from "../../utils/formatters";

const AutomationTable = ({
  automationRanking,
  selectedTask,
  setSelectedTask,
}) => {
  // Loading State
  if (!automationRanking?.length) {
    return <SkeletonTable />;
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl mb-8 overflow-hidden backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">
            Automation Opportunities
          </h2>

          <p className="text-gray-400 mt-2">
            Click a task to filter
            dashboard insights
          </p>
        </div>

        {selectedTask && (
          <button
            onClick={() =>
              setSelectedTask(null)
            }
            className="px-4 py-2 rounded-2xl bg-red-500/20 text-red-400 text-sm font-semibold hover:bg-red-500/30 transition-all"
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4">
                Task
              </th>

              <th className="text-left py-4">
                Minutes
              </th>

              <th className="text-left py-4">
                Cost
              </th>

              <th className="text-left py-4">
                Score
              </th>
            </tr>
          </thead>

          <tbody>
            {automationRanking.map(
              (task, index) => (
                <tr
                  key={index}
                  onClick={() =>
                    setSelectedTask(
                      task.task_category
                    )
                  }
                  className={`border-b border-white/5 transition-all cursor-pointer hover:bg-white/5 ${
                    selectedTask ===
                    task.task_category
                      ? "bg-blue-500/10"
                      : ""
                  }`}
                >
                  <td className="py-4 font-medium">
                    {
                      task.task_category
                    }
                  </td>

                  <td className="py-4">
                    {formatNumber(
                      task.total_minutes
                    )}
                  </td>

                  <td className="py-4">
                    {formatCurrency(
                      task.total_cost
                    )}
                  </td>

                  <td className="py-4">
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 font-semibold">
                      {formatNumber(
                        task.automation_score
                      )}
                    </span>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AutomationTable;