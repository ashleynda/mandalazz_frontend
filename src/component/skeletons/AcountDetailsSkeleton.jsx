import { Divider, Skeleton } from "@mui/material";
import { AlertCircle } from "lucide-react"; 

// Skeleton loader for profile fields
export default function AccountDetailsSkeleton() {
  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow-sm min-h-full p-8 space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton variant="text" width={200} height={28} />
          <Skeleton variant="rectangular" width={60} height={24} />
        </div>
        <Divider />
        {[1, 2, 3].map((row) => (
          <div key={row} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton variant="rectangular" height={40} />
            <Skeleton variant="rectangular" height={40} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Empty state

