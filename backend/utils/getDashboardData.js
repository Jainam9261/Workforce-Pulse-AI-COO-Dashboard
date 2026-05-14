const {
    loadActivityLogs,
    loadEmployees,
  } = require("./loadData");
  
  const normalizeEmployees = require(
    "./normalizeEmployees"
  );
  
  const normalizeActivityLogs = require(
    "./normalizeActivityLogs"
  );
  
  const joinEmployeeActivityData = require(
    "./joinData"
  );
  
  const calculateMetrics = require(
    "./calculateMetrics"
  );
  
  const rankAutomationOpportunities =
    require(
      "./rankAutomationOpportunities"
    );
  
  const detectAnomalies = require(
    "./detectAnomalies"
  );
  
  const getDashboardData =
    async () => {
      // Load raw data
      const activityLogs =
        await loadActivityLogs();
  
      const employeesData =
        loadEmployees();
  
      // Normalize
      const normalizedActivityLogs =
        normalizeActivityLogs(
          activityLogs
        );
  
      const normalizedEmployees =
        normalizeEmployees(
          employeesData.employees
        );
  
      // Join datasets
      const joinedData =
        joinEmployeeActivityData(
          normalizedActivityLogs,
          normalizedEmployees
        );
  
      // Generate analytics
      const metrics =
        calculateMetrics(joinedData);
  
      const automationRanking =
        rankAutomationOpportunities(
          joinedData
        );
  
      const anomalies =
        detectAnomalies(joinedData);
  
      return {
        activityLogs:
          normalizedActivityLogs,
  
        employees:
          normalizedEmployees,
  
        joinedData,
  
        metrics,
  
        automationRanking,
  
        anomalies,
      };
    };
  
  module.exports =
    getDashboardData;