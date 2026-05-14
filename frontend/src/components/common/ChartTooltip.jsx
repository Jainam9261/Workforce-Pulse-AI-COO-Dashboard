const ChartTooltip = ({
  active,
  payload,
  label,
  darkMode,
  formatter,
}) => {
  if (!active || !payload?.length) {
    return null;
  }

  const formatValue = (value) => {
    if (typeof formatter === "function") {
      return formatter(value);
    }
    return value;
  };

  return (
    <div
      className={`rounded-2xl border px-4 py-3 backdrop-blur-xl shadow-xl ${
        darkMode
          ? "bg-slate-900/90 border-white/10 text-slate-100"
          : "bg-white/95 border-slate-200 text-slate-900"
      }`}
    >
      {label !== undefined && label !== null && (
        <p
          className={`text-xs font-semibold mb-2 ${
            darkMode ? "text-slate-400" : "text-slate-500"
          }`}
        >
          {label}
        </p>
      )}

      <div className="space-y-1">
        {payload.map((entry, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 text-sm"
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor:
                  entry.color || entry.fill || "#3B82F6",
              }}
            />
            <span
              className={
                darkMode ? "text-slate-300" : "text-slate-600"
              }
            >
              {entry.name}:
            </span>
            <span className="font-semibold">
              {formatValue(entry.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartTooltip;
