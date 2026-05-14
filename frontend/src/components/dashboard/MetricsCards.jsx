import {
  Clock3,
  IndianRupee,
  TrendingUp,
} from "lucide-react";

import SkeletonCard from "../common/SkeletonCard";

import {
  formatCurrency,
  formatNumber,
  formatPercentage,
} from "../../utils/formatters";

const MetricsCards = ({
  metrics,
}) => {
  // Loading State
  if (!metrics) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SkeletonCard />

        <SkeletonCard />

        <SkeletonCard />
      </div>
    );
  }

  const cards = [
    {
      title: "Recoverable Hours",
      value: formatNumber(
        metrics?.recoverable_hours_per_month
      ),
      icon: <Clock3 />,
      color:
        "bg-blue-500/20 text-blue-400",
    },

    {
      title: "Recoverable INR",
      value: formatCurrency(
        metrics?.recoverable_inr_per_month
      ),
      icon: <IndianRupee />,
      color:
        "bg-green-500/20 text-green-400",
    },

    {
      title: "Automation Factor",
      value: formatPercentage(
        metrics?.automation_factor
      ),
      icon: <TrendingUp />,
      color:
        "bg-purple-500/20 text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl hover:-translate-y-1 transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">
                {card.title}
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {card.value}
              </h2>
            </div>

            <div
              className={`h-14 w-14 rounded-2xl flex items-center justify-center ${card.color}`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;