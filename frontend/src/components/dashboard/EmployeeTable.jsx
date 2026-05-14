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
          className={`rounded-3xl border shadow-2xl backdrop-blur-xl p-6 transition-all duration-300 ${
            darkMode
              ? "bg-white/5 border-white/10"
              : "bg-white border-gray-200"
          }`}
        >
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold">
                Employees
              </h2>
  
              <p className="text-gray-400 mt-2">
                Workforce analytics and
                employee insights
              </p>
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
                  placeholder="Search employees..."
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
  
              {/* Department Filter */}
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
                    selectedDepartment
                  }
                  onChange={(e) =>
                    setSelectedDepartment(
                      e.target.value
                    )
                  }
                  className={`outline-none rounded-xl px-2 py-1 transition-all ${
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className={`border-b ${
                    darkMode
                      ? "border-white/10"
                      : "border-gray-200"
                  }`}
                >
                  <th className="text-left py-4">
                    Name
                  </th>
  
                  <th className="text-left py-4">
                    Department
                  </th>
  
                  <th className="text-left py-4">
                    Role
                  </th>
  
                  <th className="text-left py-4">
                    Salary
                  </th>
  
                  <th className="text-left py-4">
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
                      <td className="py-4 font-medium">
                        {employee.name}
                      </td>
  
                      <td className="py-4">
                        {
                          employee.department
                        }
                      </td>
  
                      <td className="py-4">
                        {employee.role}
                      </td>
  
                      <td className="py-4">
                        INR{" "}
                        {Number(
                          employee.annual_salary_inr
                        ).toLocaleString()}
                      </td>
  
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
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