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
    <div className="bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl mb-6 sm:mb-8 overflow-hidden backdrop-blur-xl min-w-0">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 min-w-0">
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Automation Opportunities
          </h2>

          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Click a task to filter
            dashboard insights
          </p>
        </div>

        {selectedTask && (
          <button
            type="button"
            onClick={() =>
              setSelectedTask(null)
            }
            className="shrink-0 self-start px-4 py-2 rounded-2xl bg-red-500/20 text-red-400 text-sm font-semibold hover:bg-red-500/30 transition-all"
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-1 px-1 sm:mx-0 sm:px-0 touch-pan-x">
        <table className="w-full min-w-[320px] text-sm sm:text-base">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 sm:py-4 pr-2">
                Task
              </th>

              <th className="text-left py-3 sm:py-4 px-2 whitespace-nowrap">
                Minutes
              </th>

              <th className="text-left py-3 sm:py-4 px-2 whitespace-nowrap">
                Cost
              </th>

              <th className="text-left py-3 sm:py-4 pl-2 whitespace-nowrap">
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
                  <td className="py-3 sm:py-4 font-medium max-w-[10rem] sm:max-w-none align-top">
                    <span className="line-clamp-2 sm:line-clamp-none">
                      {
                        task.task_category
                      }
                    </span>
                  </td>

                  <td className="py-3 sm:py-4 whitespace-nowrap align-top">
                    {formatNumber(
                      task.total_minutes
                    )}
                  </td>

                  <td className="py-3 sm:py-4 whitespace-nowrap align-top">
                    {formatCurrency(
                      task.total_cost
                    )}
                  </td>

                  <td className="py-3 sm:py-4 align-top">
                    <span className="inline-block px-2.5 sm:px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 font-semibold whitespace-nowrap">
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