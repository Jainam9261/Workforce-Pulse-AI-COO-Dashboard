import { useEffect, useState } from "react";

import API from "../services/api";

import Header from "../components/dashboard/Header";

import MetricsCards from "../components/dashboard/MetricsCards";

import AutomationTable from "../components/dashboard/AutomationTable";

import AutomationChart from "../components/dashboard/AutomationChart";

import AnomalyCards from "../components/dashboard/AnomalyCards";

import TrendChart from "../components/dashboard/TrendChart";

import EmployeeTable from "../components/dashboard/EmployeeTable";

import FloatingAIButton from "../components/dashboard/FloatingAIButton";

import Sidebar from "../components/layout/Sidebar";

const Dashboard = () => {
  const [metrics, setMetrics] =
    useState(null);

  const [
    automationRanking,
    setAutomationRanking,
  ] = useState([]);

  const [anomalies, setAnomalies] =
    useState([]);

  const [employees, setEmployees] =
    useState([]);

  const [weeklyTrends, setWeeklyTrends] =
    useState([]);

  const [darkMode, setDarkMode] =
    useState(() => {
      const savedTheme =
        localStorage.getItem(
          "darkMode"
        );

      return savedTheme
        ? JSON.parse(savedTheme)
        : true;
    });

  const [
    selectedTask,
    setSelectedTask,
  ] = useState(null);

  // Fetch Dashboard Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Metrics
        const metricsResponse =
          await API.get("/metrics");

        setMetrics(
          metricsResponse.data
        );

        // Automation Ranking
        const rankingResponse =
          await API.get(
            "/automation-ranking"
          );

        setAutomationRanking(
          rankingResponse.data
        );

        // Anomalies
        const anomaliesResponse =
          await API.get(
            "/anomalies"
          );

        setAnomalies(
          anomaliesResponse.data
        );

        // Employees
        const employeesResponse =
          await API.get(
            "/employees"
          );

        setEmployees(
          employeesResponse.data
        );

        // Weekly Trends
        const weeklyTrendsResponse =
          await API.get(
            "/weekly-trends"
          );

        setWeeklyTrends(
          weeklyTrendsResponse.data
        );

        console.log(
          "Weekly Trends:",
          weeklyTrendsResponse.data
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Persist Theme
  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );
  }, [darkMode]);

  // Filter Ranking
  const filteredRanking =
    selectedTask
      ? automationRanking.filter(
          (item) =>
            item.task_category ===
            selectedTask
        )
      : automationRanking;

  // Filter Anomalies
  const filteredAnomalies =
    selectedTask
      ? anomalies.filter((item) =>
          item.anomaly_reason
            ?.toLowerCase()
            .includes(
              selectedTask.toLowerCase()
            )
        )
      : anomalies;

  return (
    <div
      className={`min-h-screen transition-all duration-300 overflow-hidden ${
        darkMode
          ? "bg-[#0B1120] text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-[400px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="flex relative z-10">
        {/* Sidebar */}
        <Sidebar darkMode={darkMode} />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto h-screen">
          <div
            id="dashboard"
            className="max-w-7xl mx-auto p-6"
          >
            {/* Header */}
            <Header
              darkMode={darkMode}
              setDarkMode={
                setDarkMode
              }
              metrics={metrics}
              automationRanking={
                automationRanking
              }
              anomalies={anomalies}
            />

            {/* Metrics */}
            <MetricsCards
              metrics={metrics}
            />

            {/* Main Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
              {/* Automation */}
              <div
                id="automation"
                className="xl:col-span-2"
              >
                <AutomationTable
                  automationRanking={
                    filteredRanking
                  }
                  selectedTask={
                    selectedTask
                  }
                  setSelectedTask={
                    setSelectedTask
                  }
                />
              </div>

              {/* Right Insights */}
              <div className="space-y-6">
                {/* Top Opportunity */}
                <div
                  className={`backdrop-blur-xl rounded-3xl p-6 shadow-2xl border transition-all duration-300 ${
                    darkMode
                      ? "bg-white/5 border-white/10"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <p className="text-gray-400 text-sm">
                    Top Opportunity
                  </p>

                  <h2 className="text-3xl font-bold mt-3">
                    {
                      filteredRanking?.[0]
                        ?.task_category
                    }
                  </h2>

                  <p className="text-blue-400 mt-3 font-medium">
                    Score:{" "}
                    {
                      filteredRanking?.[0]
                        ?.automation_score
                    }
                  </p>
                </div>

                {/* High Severity */}
                <div
                  className={`backdrop-blur-xl rounded-3xl p-6 shadow-2xl border transition-all duration-300 ${
                    darkMode
                      ? "bg-white/5 border-white/10"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <p className="text-gray-400 text-sm">
                    High Severity
                    Anomalies
                  </p>

                  <h2 className="text-4xl font-bold mt-3 text-red-400">
                    {
                      filteredAnomalies.filter(
                        (item) =>
                          item.severity ===
                          "high"
                      ).length
                    }
                  </h2>

                  <p className="text-gray-400 mt-3">
                    Employees with
                    excessive repetitive
                    workload
                  </p>
                </div>

                {/* AI Summary */}
                <div
                  className={`rounded-3xl p-6 shadow-2xl border backdrop-blur-xl transition-all duration-300 ${
                    darkMode
                      ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-white/10"
                      : "bg-gradient-to-br from-blue-100 to-purple-100 border-gray-200"
                  }`}
                >
                  <h2 className="text-2xl font-bold">
                    AI Summary
                  </h2>

                  <p
                    className={`mt-4 leading-relaxed ${
                      darkMode
                        ? "text-gray-300"
                        : "text-gray-700"
                    }`}
                  >
                    Email Triage and
                    Internal Communication
                    remain the strongest
                    automation
                    opportunities across
                    departments.
                  </p>
                </div>
              </div>
            </div>

            {/* Analytics */}
            <div
              id="analytics"
              className="space-y-8"
            >
              <TrendChart
                weeklyTrends={
                  weeklyTrends
                }
                darkMode={darkMode}
              />

              <AutomationChart
                automationRanking={
                  filteredRanking
                }
              />
            </div>

            {/* Anomalies */}
            <div
              id="anomalies"
              className="mt-8"
            >
              <AnomalyCards
                anomalies={
                  filteredAnomalies
                }
                darkMode={darkMode}
              />
            </div>

            {/* Employees */}
            <div
              id="employees"
              className="mt-8 mb-8"
            >
              <EmployeeTable
                employees={employees}
                darkMode={darkMode}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating AI Chatbot */}
      <FloatingAIButton
        metrics={metrics}
        automationRanking={automationRanking}
        anomalies={anomalies}
        darkMode={darkMode}
      />
    </div>
  );
};

export default Dashboard;