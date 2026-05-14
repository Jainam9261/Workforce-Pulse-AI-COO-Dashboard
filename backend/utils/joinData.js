const joinEmployeeActivityData = (
    activityLogs,
    employees
  ) => {
    return activityLogs.map((log) => {
      const employee = employees.find(
        (emp) =>
          emp.employee_id ===
          log.employee_id
      );
  
      return {
        ...log,
  
        employee_name:
          employee?.name || "Unknown",
  
        role:
          employee?.role || "Unknown",
  
        hourly_rate_inr:
          employee?.hourly_rate_inr || 0,
  
        annual_salary_inr:
          employee?.annual_salary_inr || 0,
  
        employee_status:
          employee?.status || "Unknown",
  
        employee_found:
          !!employee,
      };
    });
  };
  
  module.exports =
    joinEmployeeActivityData;