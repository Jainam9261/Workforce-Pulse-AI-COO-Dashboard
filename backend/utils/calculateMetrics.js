const AUTOMATION_FACTOR = 0.6;

const calculateMetrics = (data) => {
  let recoverableMinutes = 0;

  let recoverableCost = 0;

  data.forEach((record) => {
    if (record.is_repetitive) {
      const automatableMinutes =
        record.duration_minutes *
        AUTOMATION_FACTOR;

      recoverableMinutes +=
        automatableMinutes;

      const hourlyRate =
        record.hourly_rate_inr || 0;

      recoverableCost +=
        (automatableMinutes / 60) *
        hourlyRate;
    }
  });

  return {
    recoverable_hours_per_month:
      Number(
        (recoverableMinutes / 60).toFixed(
          2
        )
      ),

    recoverable_inr_per_month:
      Number(
        recoverableCost.toFixed(2)
      ),

    automation_factor:
      AUTOMATION_FACTOR,
  };
};

module.exports = calculateMetrics;