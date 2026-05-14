const dayjs = require("dayjs");

const customParseFormat = require("dayjs/plugin/customParseFormat");

dayjs.extend(customParseFormat);

const normalizeTimestamp = (timestamp) => {
  const formats = [
    "YYYY-MM-DD HH:mm:ss",

    "DD/MM/YYYY HH:mm",

    "YYYY/MM/DD",

    "YYYY-MM-DD",
  ];

  for (const format of formats) {
    const parsedDate = dayjs(timestamp, format, true);

    if (parsedDate.isValid()) {
      return parsedDate.toISOString();
    }
  }

  return null;
};

const normalizeDuration = (value) => {
  let duration = Number(value);

  if (isNaN(duration)) {
    return 0;
  }

  if (duration < 0) {
    return 0;
  }

  if (duration > 480) {
    return 480;
  }

  return duration;
};

const normalizeAppName = (app) => {
  const normalizedApp = app?.toLowerCase().trim();

  const appMappings = {
    gmail: "Gmail",

    "google mail": "Gmail",

    outlook: "Outlook",

    "ms outlook": "Outlook",

    slack: "Slack",

    salesforce: "Salesforce",

    excel: "Excel",

    sheets: "Google Sheets",

    "google sheets": "Google Sheets",
  };

  return appMappings[normalizedApp] || normalizedApp;
};

const normalizeTaskCategory = (category) => {
  const normalizedCategory = category?.toLowerCase().trim();

  const categoryMappings = {
    "email triage": "Email Triage",

    emails: "Email Triage",

    "cal mgmt": "Calendar Management",

    "calendar management": "Calendar Management",

    "calendar mgmt": "Calendar Management",

    "internal comms": "Internal Communication",

    "internal communication": "Internal Communication",

    crm: "CRM Updates",

    "crm update": "CRM Updates",

    "crm updates": "CRM Updates",

    reporting: "Reporting",

    "data entry": "Data Entry",

    "data-entry": "Data Entry",

    "client communication": "Client Communication",

    "client comms": "Client Communication",

    "lead-entry": "Lead Entry",

    "lead entry": "Lead Entry",

    recon: "Reconciliation",

    reconciliation: "Reconciliation",

    "invoice proc": "Invoice Processing",

    "invoice processing": "Invoice Processing",

    "vendor mgmt": "Vendor Management",

    "vendor management": "Vendor Management",

    "doc drafting": "Document Drafting",

    drafting: "Document Drafting",

    documentation: "Document Drafting",

    docs: "Document Drafting",

    "document drafting": "Document Drafting",
  };

  return categoryMappings[normalizedCategory] || normalizedCategory;
};

const normalizeBoolean = (value) => {
  const normalizedValue = String(value).toLowerCase().trim();

  const trueValues = ["true", "1", "yes", "y"];

  return trueValues.includes(normalizedValue);
};

const normalizeActivityLogs = (logs) => {
  return logs.map((log) => {
    return {
      employee_id: log.employee_id?.trim() || null,

      department: log.department?.trim() || "Unknown",

      timestamp: normalizeTimestamp(log.timestamp),

      app_used: normalizeAppName(log.app_used),

      task_category: normalizeTaskCategory(log.task_category),

      duration_minutes: normalizeDuration(log.duration_minutes),

      is_repetitive: normalizeBoolean(log.is_repetitive),
    };
  });
};

module.exports = normalizeActivityLogs;
