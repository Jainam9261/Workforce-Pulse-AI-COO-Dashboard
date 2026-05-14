const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

dotenv.config();

const {
  loadActivityLogs,
  loadEmployees,
} = require("./utils/loadData");

const normalizeEmployees =
  require("./utils/normalizeEmployees");

const normalizeActivityLogs =
  require("./utils/normalizeActivityLogs");

const joinEmployeeActivityData =
  require("./utils/joinData");

const calculateMetrics =
  require("./utils/calculateMetrics");

const rankAutomationOpportunities =
  require("./utils/rankAutomationOpportunities");

const detectAnomalies =
  require("./utils/detectAnomalies");

const calculateWeeklyTrends =
  require("./utils/calculateWeeklyTrends");

const aiRoutes = require(
  "./routes/aiRoutes"
);

const app = express();

app.use(cors());

app.use(express.json());

const PORT = 5000;

const startServer = async () => {
  // Load raw data
  const activityLogs =
    await loadActivityLogs();

  const employeesData =
    loadEmployees();

  // Normalize data
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

  const weeklyTrends =
    calculateWeeklyTrends(
      joinedData
    );

  // AI Routes
  app.use("/ai", aiRoutes);

  // Root
  app.get("/", (req, res) => {
    res.json({
      message:
        "AI COO Dashboard Backend Running",
    });
  });

  // Metrics
  app.get("/metrics", (req, res) => {
    res.json(metrics);
  });

  // Automation Ranking
  app.get(
    "/automation-ranking",
    (req, res) => {
      res.json(
        automationRanking
      );
    }
  );

  // Anomalies
  app.get("/anomalies", (req, res) => {
    res.json(anomalies);
  });

  // Employees
  app.get("/employees", (req, res) => {
    res.json(normalizedEmployees);
  });

  // Joined Data
  app.get(
    "/joined-data",
    (req, res) => {
      res.json(joinedData);
    }
  );

  // Weekly Trends
  app.get(
    "/weekly-trends",
    (req, res) => {
      res.json(weeklyTrends);
    }
  );

  app.listen(PORT, () => {
    console.log(
      `Server running on port ${PORT}`
    );
  });
};

startServer().catch((error) => {
  console.error(
    "Failed to start server:",
    error
  );

  process.exit(1);
});