const SkeletonTable = () => {
    return (
      <div className="animate-pulse rounded-3xl border border-white/10 bg-white/5 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-5 w-48 rounded-full bg-white/10 mb-3" />
  
            <div className="h-4 w-64 rounded-full bg-white/10" />
          </div>
  
          <div className="h-10 w-32 rounded-2xl bg-white/10" />
        </div>
  
        {/* Table Rows */}
        <div className="space-y-4">
          {[...Array(6)].map(
            (_, index) => (
              <div
                key={index}
                className="h-14 rounded-2xl bg-white/10"
              />
            )
          )}
        </div>
      </div>
    );
  };
  
  export default SkeletonTable;