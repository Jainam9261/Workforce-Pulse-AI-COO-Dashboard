import {
    useMemo,
    useState,
  } from "react";
  
  import {
    Search,
    Filter,
  } from "lucide-react";
  
  import EmployeeDetailsModal from "./EmployeeDetailsModal";
  
  const EmployeeTable = ({
    employees,
    darkMode,
  }) => {
    const [search, setSearch] =
      useState("");
  
    const [
      selectedDepartment,
      setSelectedDepartment,
    ] = useState("All");
  
    const [
      selectedEmployee,
      setSelectedEmployee,
    ] = useState(null);
  
    // Unique Departments
    const departments = useMemo(() => {
      const uniqueDepartments =
        new Set(
          employees.map(
            (employee) =>
              employee.department
          )
        );
  
      return [
        "All",
        ...uniqueDepartments,
      ];
    }, [employees]);
  
    // Filtered Employees
    const filteredEmployees =
      employees.filter((employee) => {
        const matchesSearch =
          employee.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          employee.role
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );
  
        const matchesDepartment =
          selectedDepartment ===
            "All" ||
          employee.department ===
            selectedDepartment;
  
        return (
          matchesSearch &&
          matchesDepartment
        );
      });
  
    return (
      <>
        {/* Modal */}
        <EmployeeDetailsModal
          employee={selectedEmployee}
          onClose={() =>
            setSelectedEmployee(null)
          }
          darkMode={darkMode}
        />
  
        {/* Table Container */}
        <div
          className={`rounded-3xl border shadow-2xl backdrop-blur-xl p-4 sm:p-6 transition-all duration-300 min-w-0 ${
            darkMode
              ? "bg-white/5 border-white/10"
              : "bg-white border-gray-200"
          }`}
        >
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4 sm:mb-6 min-w-0">
            <div className="min-w-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                Employees
              </h2>

              <p className="text-gray-400 mt-2 text-sm sm:text-base">
                Workforce analytics and
                employee insights
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 min-w-0 w-full lg:w-auto">
              {/* Search */}
              <div
                className={`flex items-center gap-2 min-w-0 flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border ${
                  darkMode
                    ? "bg-[#111827] border-white/10"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <Search
                  size={18}
                  className="text-gray-400 shrink-0"
                />

                <input
                  type="text"
                  placeholder="Search employees..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  className={`min-w-0 flex-1 w-full bg-transparent outline-none text-sm sm:text-base ${
                    darkMode
                      ? "text-white placeholder:text-gray-500"
                      : "text-gray-900"
                  }`}
                />
              </div>

              {/* Department Filter */}
              <div
                className={`flex items-center gap-2 min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border ${
                  darkMode
                    ? "bg-[#111827] border-white/10"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <Filter
                  size={18}
                  className="text-gray-400 shrink-0"
                />

                <select
                  value={
                    selectedDepartment
                  }
                  onChange={(e) =>
                    setSelectedDepartment(
                      e.target.value
                    )
                  }
                  className={`min-w-0 flex-1 outline-none rounded-xl px-2 py-1 text-sm sm:text-base transition-all ${
                    darkMode
                      ? "bg-[#111827] text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {departments.map(
                    (
                      department,
                      index
                    ) => (
                      <option
                        key={index}
                        value={department}
                        className={
                          darkMode
                            ? "bg-[#111827] text-white"
                            : "bg-white text-black"
                        }
                      >
                        {department}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </div>
  
          {/* Count */}
          <div className="mb-4">
            <p className="text-sm text-gray-400">
              Showing{" "}
              <span className="font-semibold text-blue-400">
                {
                  filteredEmployees.length
                }
              </span>{" "}
              employees
            </p>
          </div>
  
          {/* Table */}
          <div className="overflow-x-auto -mx-1 px-1 sm:mx-0 sm:px-0 touch-pan-x">
            <table className="w-full min-w-[320px] text-sm sm:text-base">
              <thead>
                <tr
                  className={`border-b ${
                    darkMode
                      ? "border-white/10"
                      : "border-gray-200"
                  }`}
                >
                  <th className="text-left py-3 sm:py-4 pr-2">
                    Name
                  </th>

                  <th className="text-left py-3 sm:py-4 px-2">
                    Department
                  </th>

                  <th className="text-left py-3 sm:py-4 px-2">
                    Role
                  </th>

                  <th className="text-left py-3 sm:py-4 px-2 whitespace-nowrap">
                    Salary
                  </th>

                  <th className="text-left py-3 sm:py-4 pl-2 whitespace-nowrap">
                    Status
                  </th>
                </tr>
              </thead>
  
              <tbody>
                {filteredEmployees.map(
                  (
                    employee,
                    index
                  ) => (
                    <tr
                      key={index}
                      onClick={() =>
                        setSelectedEmployee(
                          employee
                        )
                      }
                      className={`border-b transition-all cursor-pointer ${
                        darkMode
                          ? "border-white/5 hover:bg-white/5"
                          : "border-gray-100 hover:bg-gray-50"
                      }`}
                    >
                      <td className="py-3 sm:py-4 font-medium max-w-[7rem] sm:max-w-none align-top">
                        <span className="line-clamp-2 sm:line-clamp-none">
                          {employee.name}
                        </span>
                      </td>

                      <td className="py-3 sm:py-4 align-top">
                        <span className="line-clamp-2 sm:line-clamp-none">
                          {
                            employee.department
                          }
                        </span>
                      </td>

                      <td className="py-3 sm:py-4 align-top">
                        <span className="line-clamp-2 sm:line-clamp-none">
                          {employee.role}
                        </span>
                      </td>

                      <td className="py-3 sm:py-4 whitespace-nowrap align-top">
                        INR{" "}
                        {Number(
                          employee.annual_salary_inr
                        ).toLocaleString()}
                      </td>

                      <td className="py-3 sm:py-4 align-top">
                        <span
                          className={`inline-block px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap ${
                            employee.status ===
                            "active"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {
                            employee.status
                          }
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };
  
  export default EmployeeTable;