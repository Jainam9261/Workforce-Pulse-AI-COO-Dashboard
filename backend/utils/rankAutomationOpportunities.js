const rankAutomationOpportunities = (
    data
  ) => {
    const taskMap = {};
  
    data.forEach((record) => {
      if (!record.is_repetitive) {
        return;
      }
  
      const task =
        record.task_category;
  
      if (!taskMap[task]) {
        taskMap[task] = {
          task_category: task,
  
          total_minutes: 0,
  
          total_cost: 0,
  
          employees: new Set(),
        };
      }
  
      taskMap[task].total_minutes +=
        record.duration_minutes;
  
      taskMap[task].total_cost +=
        (record.duration_minutes / 60) *
        record.hourly_rate_inr;
  
      taskMap[task].employees.add(
        record.employee_id
      );
    });
  
    const rankedTasks = Object.values(
      taskMap
    ).map((task) => {
      const employeeCount =
        task.employees.size;
  
      const score =
        task.total_minutes * 0.4 +
        employeeCount * 0.3 +
        task.total_cost * 0.3;
  
      return {
        task_category:
          task.task_category,
  
        total_minutes:
          Number(
            task.total_minutes.toFixed(2)
          ),
  
        total_cost: Number(
          task.total_cost.toFixed(2)
        ),
  
        employee_count:
          employeeCount,
  
        automation_score:
          Number(score.toFixed(2)),
      };
    });
  
    rankedTasks.sort(
      (a, b) =>
        b.automation_score -
        a.automation_score
    );
  
    return rankedTasks;
  };
  
  module.exports =
    rankAutomationOpportunities;