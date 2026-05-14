const REPETITIVE_THRESHOLD =
  300;

const detectAnomalies = (data) => {
  const employeeMap = {};

  data.forEach((record) => {
    if (!record.is_repetitive) {
      return;
    }

    const employeeId =
      record.employee_id;

    if (!employeeMap[employeeId]) {
      employeeMap[employeeId] = {
        employee_id: employeeId,

        employee_name:
          record.employee_name,

        department:
          record.department,

        repetitive_minutes: 0,

        repetitive_tasks: 0,
      };
    }

    employeeMap[
      employeeId
    ].repetitive_minutes +=
      record.duration_minutes;

    employeeMap[
      employeeId
    ].repetitive_tasks += 1;
  });

  const anomalies = Object.values(
    employeeMap
  )
    .filter(
      (employee) =>
        employee.repetitive_minutes >
        REPETITIVE_THRESHOLD
    )
    .map((employee) => {
      return {
        ...employee,

        anomaly_reason:
          "High repetitive workload",

        severity:
          employee.repetitive_minutes >
          600
            ? "high"
            : "medium",
      };
    });

  return anomalies.sort(
    (a, b) =>
      b.repetitive_minutes -
      a.repetitive_minutes
  );
};

module.exports = detectAnomalies;