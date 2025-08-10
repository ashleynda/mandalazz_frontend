// export default function AddressCardSkeleton() {
//   return (
//     <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md space-y-4 animate-pulse">
//       <div className="h-5 bg-gray-200 rounded w-1/2" /> {/* Name */}
//       <div className="h-4 bg-gray-200 rounded w-4/5" /> {/* Address */}
//       <div className="h-4 bg-gray-200 rounded w-3/5" /> {/* Phone */}
//       <div className="h-8 bg-gray-200 rounded w-2/5" /> {/* Set as default */}
//       <div className="flex gap-3">
//         <div className="h-9 bg-gray-200 rounded w-20" /> {/* Edit */}
//         <div className="h-9 bg-gray-200 rounded w-20" /> {/* Delete */}
//       </div>
//     </div>
//   );
// }

import React from "react";

export default function AddressCardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Title + Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 bg-gray-200 rounded w-32"></div>
        <div className="h-10 bg-gray-200 rounded w-28"></div>
      </div>

      {/* Grid of Skeleton Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-lg p-4 space-y-4"
          >
            {/* Name */}
            <div className="h-4 bg-gray-200 rounded w-40"></div>

            {/* Address line */}
            <div className="h-3 bg-gray-200 rounded w-56"></div>
            <div className="h-3 bg-gray-200 rounded w-48"></div>

            {/* Phone */}
            <div className="h-3 bg-gray-200 rounded w-32"></div>

            {/* Checkbox placeholder */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-28"></div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <div className="h-8 bg-gray-200 rounded w-16"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
