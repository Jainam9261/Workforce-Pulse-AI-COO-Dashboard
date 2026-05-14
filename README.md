# Workforce Pulse — AI COO Dashboard

An AI-powered operational analytics platform built to help leadership teams identify repetitive workload, automation opportunities, workforce inefficiencies, and operational anomalies from messy real-world employee activity data.

This project was built as part of the Workforce Pulse engineering challenge.

---

# Live Features

## Dashboard Analytics
- Recoverable hours/month
- Recoverable INR/month
- Automation opportunity ranking
- Department/task-based insights
- Weekly repetitive workload trends
- Workforce anomaly detection

## AI COO Assistant
- Conversational AI assistant using Gemini API
- Multi-turn conversation support
- Grounded in normalized operational dataset
- Operational recommendations and workforce insights

## Employee Drilldowns
- Interactive employee analytics modal
- Department, role, salary, and workload insights
- AI recommendations per employee

## Cross Filters
- Task-category filtering
- Department filtering
- Dashboard-wide interactive filtering

## Export
- Executive summary PDF export
- Includes live filtered dashboard data

## UX & Design
- Floating AI copilot
- Dark/light mode
- Persistent theme using localStorage
- Skeleton loading states
- Responsive modern SaaS dashboard UI

---

# Tech Stack

## Frontend
- React
- Tailwind CSS
- Recharts
- Lucide Icons
- Axios
- jsPDF

## Backend
- Node.js
- Express
- Gemini API
- Day.js

---

# Data Ingestion & Normalization

Both datasets were normalized before analytics generation.

## Activity Logs Cleanup
Handled:
- Mixed timestamp formats
- Inconsistent app names
- Inconsistent task category names
- Boolean normalization
- Negative durations
- Empty/null values
- Duration outliers

### Timestamp Handling
Timestamps were normalized using Day.js with custom parsing support.

### App Normalization
Examples:
- gmail → Gmail
- google mail → Gmail
- ms outlook → Outlook

### Task Category Normalization
Examples:
- crm update → CRM Updates
- cal mgmt → Calendar Management
- internal comms → Internal Communication

### Duration Validation
Rules:
- Negative values → 0
- Extremely large values capped
- Invalid values ignored

### Boolean Normalization
Handled multiple variants:
- TRUE
- true
- yes
- 1
- y
- etc.

---

# HRMS Normalization & Join Strategy

The HRMS dataset contained inconsistent schemas and duplicate records.

## Schema Reconciliation
Handled:
- employee_id vs EmployeeID
- department vs Dept
- nested meta.role structures
- mixed compensation formats

## Compensation Normalization
Compensation values were normalized into annual INR format.

Supported:
- Annual INR
- Hourly INR
- LPA (Lakhs Per Annum)

## Working Hours Normalization
Handled:
- String ranges ("9-18")
- Object structures
- Missing values

## Duplicate Employee Handling
When duplicate employee records existed:
- The most complete record was selected
- Missing fields were merged where possible

## Missing & Extra Employees
Handled:
- Employees in activity logs without HRMS metadata
- Employees in HRMS with no activity logs

Flagged and surfaced during processing.

---

# Methodology

## Recoverable Hours
Calculated using repetitive operational workload identified from activity logs.

The assumption:
highly repetitive operational tasks are the strongest automation candidates.

## Recoverable INR
Calculated using:
- repetitive workload duration
- employee compensation
- operational frequency

The metric estimates potential monthly operational savings through automation.

## Automation Ranking Formula

Automation priority combines:
- repetitive workload volume
- employee concentration
- operational cost impact
- total task duration

Higher repetitive and high-cost workflows rank higher.

## Anomaly Detection

Anomalies are detected using:
- excessive repetitive workload
- unusually high repetitive-task share
- department-level deviations
- workload concentration spikes

Examples:
- employees with excessive repetitive activity
- departments with abnormal workload distribution

---

# AI Assistant

The AI assistant is powered using Gemini API.

## Features
- Multi-turn conversation memory
- Dataset-grounded responses
- Operational recommendations
- Workforce insights
- Automation analysis

## Grounding Strategy
The assistant receives:
- normalized metrics
- automation rankings
- anomaly data
- prior conversation history

The assistant is instructed to:
- avoid hallucination
- answer only from dataset context
- reference operational figures directly

---

# Tradeoffs & Decisions

Due to time constraints, the following were intentionally skipped:
- Authentication
- Persistent database storage
- Real-time streaming responses
- Advanced RBAC
- Complex forecasting models

The focus was placed on:
- data correctness
- operational usefulness
- AI grounding
- dashboard usability
- shipping quality

---

# Future Improvements

With additional time, the following would be added:
- Role-based access control
- Real-time operational monitoring
- Streaming AI responses
- Forecasting & predictive analytics
- Advanced anomaly scoring
- Historical trend persistence
- Department benchmarking
- Workflow simulation engine

---

# Setup Instructions

## Backend

```bash
cd backend
npm install
npm run dev
```

Create:
```env
GEMINI_API_KEY=your_api_key
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# Deployment

Recommended:
- Frontend → Vercel
- Backend → Render

---

# Key Outcomes

This project focuses on:
- operational visibility
- workforce efficiency
- automation prioritization
- explainable analytics
- AI-assisted decision support

The goal was not to create more charts, but to build a product a COO could realistically use for operational decision-making.