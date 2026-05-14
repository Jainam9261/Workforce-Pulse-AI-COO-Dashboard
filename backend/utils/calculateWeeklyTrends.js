const calculateWeeklyTrends = (
    joinedData
  ) => {
    const weeklyMap = {};
  
    joinedData.forEach((item) => {
      if (!item.timestamp) return;
  
      const date = new Date(
        item.timestamp
      );
  
      const weekNumber = Math.ceil(
        date.getDate() / 7
      );
  
      const weekKey = `Week ${weekNumber}`;
  
      if (!weeklyMap[weekKey]) {
        weeklyMap[weekKey] = {
          week: weekKey,
          repetitive: 0,
        };
      }
  
      if (item.is_repetitive) {
        weeklyMap[
          weekKey
        ].repetitive +=
          item.duration_minutes || 0;
      }
    });
  
    return Object.values(weeklyMap);
  };
  
  module.exports =
    calculateWeeklyTrends;