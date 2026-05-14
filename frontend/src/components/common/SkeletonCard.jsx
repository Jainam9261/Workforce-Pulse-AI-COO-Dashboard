const SkeletonCard = () => {
    return (
      <div className="animate-pulse rounded-3xl border border-white/10 bg-white/5 p-6">
        {/* Title */}
        <div className="h-4 w-32 rounded-full bg-white/10 mb-4" />
  
        {/* Value */}
        <div className="h-10 w-40 rounded-full bg-white/10 mb-6" />
  
        {/* Bottom */}
        <div className="h-12 w-12 rounded-2xl bg-white/10" />
      </div>
    );
  };
  
  export default SkeletonCard;