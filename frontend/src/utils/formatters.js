export const formatCurrency = (
    value
  ) => {
    return new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }
    ).format(value);
  };
  
  export const formatNumber = (
    value
  ) => {
    return new Intl.NumberFormat(
      "en-IN"
    ).format(value);
  };
  
  export const formatPercentage = (
    value
  ) => {
    return `${value * 100}%`;
  };