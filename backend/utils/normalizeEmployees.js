const deduplicateEmployees = (employees) => {
    const uniqueEmployees = {};
  
    employees.forEach((employee) => {
      const existingEmployee =
        uniqueEmployees[employee.employee_id];
  
      if (!existingEmployee) {
        uniqueEmployees[employee.employee_id] =
          employee;
      } else {
        if (
          employee.annual_salary_inr >
          existingEmployee.annual_salary_inr
        ) {
          uniqueEmployees[employee.employee_id] =
            employee;
        }
      }
    });
  
    return Object.values(uniqueEmployees);
  };
  
  const normalizeEmployees = (employees) => {
    const normalizedEmployees = employees.map(
      (employee) => {
        return {
          employee_id:
            employee.employee_id ||
            employee.EmployeeID ||
            null,
  
          name:
            employee.name ||
            employee.Name ||
            "Unknown",
  
          department:
            employee.department ||
            employee.Dept ||
            "Unknown",
  
          role:
            employee.role ||
            employee.Role ||
            employee.meta?.role ||
            "Unknown",
  
          tenure_months:
            employee.tenure_months ||
            employee.tenureMonths ||
            employee.meta?.tenure_months ||
            0,
  
          status:
            employee.status ||
            employee.Status ||
            "active",
  
          annual_salary_inr:
            employee.annual_ctc_inr ||
            employee.meta?.compensation?.annual ||
            (employee.salary_LPA
              ? Number(
                (employee.salary_LPA * 100000)
                  .toFixed(2)
              )
              : null),
  
          hourly_rate_inr:
            employee.hourly_rate_inr ||
  
            (employee.annual_ctc_inr
              ? employee.annual_ctc_inr /
                12 /
                22 /
                8
              : null) ||
  
            (employee.meta?.compensation
              ?.annual
              ? employee.meta.compensation
                  .annual /
                12 /
                22 /
                8
              : null) ||
  
            (employee.salary_LPA
              ? (employee.salary_LPA *
                  100000) /
                12 /
                22 /
                8
              : null),
        };
      }
    );
  
    return deduplicateEmployees(
      normalizedEmployees
    );
  };
  
  module.exports = normalizeEmployees;