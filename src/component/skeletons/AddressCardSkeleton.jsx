export default function AddressCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md space-y-4 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-1/2" /> {/* Name */}
      <div className="h-4 bg-gray-200 rounded w-4/5" /> {/* Address */}
      <div className="h-4 bg-gray-200 rounded w-3/5" /> {/* Phone */}
      <div className="h-8 bg-gray-200 rounded w-2/5" /> {/* Set as default */}
      <div className="flex gap-3">
        <div className="h-9 bg-gray-200 rounded w-20" /> {/* Edit */}
        <div className="h-9 bg-gray-200 rounded w-20" /> {/* Delete */}
      </div>
    </div>
  );
}
