import { Skeleton } from "@mui/material";
import { AlertCircle } from "lucide-react"; 

export default function AccountDetailsEmptyState({ message }) {
  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow-sm min-h-screen flex flex-col items-center justify-center text-center p-8">
        <AlertCircle className="text-gray-400 mb-4" size={48} />
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          {message || "No account details found"}
        </h2>
        <p className="text-gray-500 max-w-md">
            No account details found. Please try again later.
          {/* We couldn’t find your account details. You can try refreshing or contact support if the issue persists. */}
        </p>
      </div>
    </div>
  );
}