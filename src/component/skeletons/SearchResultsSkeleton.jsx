import React from 'react';
import { Skeleton } from '@mui/material';

const SearchResultsSkeleton = ({ count = 5 }) => {
  return (
    <div className="absolute mt-1 w-full bg-white border border-gray-200 shadow-lg rounded-md max-h-[300px] overflow-y-auto z-[10000] p-2">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50">
          <Skeleton variant="rectangular" width={40} height={40} sx={{ borderRadius: 1 }} />
          <div className="flex-1">
            <Skeleton variant="text" width="80%" height={16} />
            <Skeleton variant="text" width="40%" height={14} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsSkeleton;
