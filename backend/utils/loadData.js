const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const loadActivityLogs = () => {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(
      path.join(__dirname, "../data/activity_logs.csv")
    )
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

const loadEmployees = () => {
    const filePath = path.join(__dirname, "../data/employees.json");
  
    const data = fs.readFileSync(filePath, "utf-8");
  
    return JSON.parse(data);
  };

module.exports = {
  loadActivityLogs,
  loadEmployees,
};