import {
    X,
    Briefcase,
    Building2,
    IndianRupee,
    ShieldAlert,
  } from "lucide-react";
  
  const EmployeeDetailsModal = ({
    employee,
    onClose,
    darkMode,
  }) => {
    if (!employee) return null;
  
    const repetitiveRisk =
      employee.tenure_months > 24
        ? "High"
        : employee.tenure_months > 12
        ? "Medium"
        : "Low";
  
    return (
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 min-w-0">
        {/* Modal */}
        <div
          className={`w-full max-w-2xl rounded-t-3xl sm:rounded-3xl border shadow-2xl backdrop-blur-xl transition-all duration-300 max-h-[90vh] overflow-y-auto overscroll-contain min-w-0 ${
            darkMode
              ? "bg-[#0F172A] border-white/10 text-white"
              : "bg-white border-gray-200 text-gray-900"
          }`}
        >
          {/* Header */}
          <div
            className={`flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between p-4 sm:p-6 border-b shrink-0 ${
              darkMode
                ? "border-white/10"
                : "border-gray-200"
            }`}
          >
            <div className="min-w-0">
              <h2 className="text-2xl sm:text-3xl font-bold break-words">
                {employee.name}
              </h2>

              <p className="text-gray-400 mt-1 text-sm sm:text-base">
                Employee Operational
                Insights
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="h-10 w-10 shrink-0 self-end sm:self-start rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* Department */}
            <div
              className={`rounded-2xl p-5 border ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <Building2 className="text-blue-400" />
  
                <h3 className="font-semibold text-lg">
                  Department
                </h3>
              </div>
  
              <p className="text-2xl font-bold">
                {employee.department}
              </p>
            </div>
  
            {/* Role */}
            <div
              className={`rounded-2xl p-5 border ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <Briefcase className="text-purple-400" />
  
                <h3 className="font-semibold text-lg">
                  Role
                </h3>
              </div>
  
              <p className="text-2xl font-bold">
                {employee.role}
              </p>
            </div>
  
            {/* Salary */}
            <div
              className={`rounded-2xl p-5 border ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <IndianRupee className="text-green-400" />
  
                <h3 className="font-semibold text-lg">
                  Annual Salary
                </h3>
              </div>
  
              <p className="text-2xl font-bold">
                INR{" "}
                {Number(
                  employee.annual_salary_inr
                ).toLocaleString()}
              </p>
            </div>
  
            {/* Risk */}
            <div
              className={`rounded-2xl p-5 border ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <ShieldAlert className="text-red-400" />
  
                <h3 className="font-semibold text-lg">
                  Repetitive Risk
                </h3>
              </div>
  
              <span
                className={`px-4 py-2 rounded-2xl text-sm font-semibold ${
                  repetitiveRisk ===
                  "High"
                    ? "bg-red-500/20 text-red-400"
                    : repetitiveRisk ===
                      "Medium"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {repetitiveRisk}
              </span>
            </div>
          </div>
  
          {/* Footer */}
          <div
            className={`p-4 sm:p-6 border-t ${
              darkMode
                ? "border-white/10"
                : "border-gray-200"
            }`}
          >
            <div
              className={`rounded-2xl p-5 ${
                darkMode
                  ? "bg-blue-500/10"
                  : "bg-blue-50"
              }`}
            >
              <h3 className="font-bold text-lg mb-2">
                AI Recommendation
              </h3>
  
              <p className="text-gray-400 leading-relaxed">
                {employee.role} in{" "}
                {employee.department} may
                benefit from workflow
                automation and repetitive
                task optimization based on
                operational activity
                trends.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default EmployeeDetailsModal;