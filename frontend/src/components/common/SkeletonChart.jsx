const SkeletonChart = () => {
    return (
      <div className="animate-pulse rounded-3xl border border-white/10 bg-white/5 p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="h-5 w-52 rounded-full bg-white/10 mb-3" />
  
          <div className="h-4 w-72 rounded-full bg-white/10" />
        </div>
  
        {/* Chart */}
        <div className="h-[350px] rounded-3xl bg-white/10" />
      </div>
    );
  };
  
  export default SkeletonChart;