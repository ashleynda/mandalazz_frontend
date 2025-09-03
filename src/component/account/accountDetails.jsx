"use client"

import { Divider } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { useUserProfile } from "../../lib/hooks/account/useAccountDetails";
import { useUpdateUserProfile } from "../../lib/hooks/account/useUpdateProfile";
import { Pencil } from "lucide-react";
import AccountDetailsSkeleton from "../skeletons/AcountDetailsSkeleton";
import AccountDetailsEmptyState from "../skeletons/AccountDetailsEmptyState";

export default function AccountDetails() {
   const { data, isLoading, error } = useUserProfile();
  const { mutate: updateUserProfile, isPending } = useUpdateUserProfile();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    alternateNumber: "",
    email: "",
  });


  const [initialData, setInitialData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);



   useEffect(() => {
    if (data?.message?.user) {
      const user = data.message.user;
      console.log("User data:", user);
      const normalized = {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumber || "",
        alternateNumber: user.alternateNumber || "",
        email: user.email || "",
      };
      console.log("Normalized data:", normalized);
      setFormData(normalized);
      setInitialData(normalized); // Save initial snapshot
    } else {
      console.error("No user data found", data);
    }
  }, [data]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // const handleInputChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   })
  const handleSaveChanges = () => {
    updateUserProfile(formData, {
      onSuccess: () => {
        setInitialData(formData);
        setIsEditing(false);
      },
    });
    console.log("Saving changes:", formData);
  };

  const isEdited = useMemo(() => {
    if (!initialData) return false;
    return Object.keys(formData).some(
      (key) => formData[key] !== initialData[key]
    );
  }, [formData, initialData]);
  // const handleInputChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   })
  // }

    if (isLoading) {
    return (
      <AccountDetailsSkeleton />
    );
  }

  if (error) {
    return (
      <AccountDetailsEmptyState message="Failed to load account details. Please try again later." />
    );
  }

  if (!data?.message?.user) {
    return (
      <EmptyState  />
    );
  }

  return (
    <div className="md:p-8 w-full pt-16">
      <div className=" bg-white rounded-lg shadow-sm min-h-full w-full pb-8 overflow-y-auto">
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <h1 className="text-lg font-bold text-[#3E3C3C] ">
           {isEditing ? "Edit Account Details" : "Account Details"}
        </h1>
          {!isEditing ? (
            <button
              className="flex items-center gap-1 text-md font-normal italic text-[#26735B] hover:underline cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              <Pencil size={14} /> Edit
            </button>
          ) : (
            <button
              className="text-sm text-red-500 hover:underline"
              onClick={() => {
                setFormData(initialData);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          )}
        </div>
        <Divider className="mb-8 w-full" />
        <div className="">
          <div className="space-y-6 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8 mt-4">
              <div>
                <label className="block text-xs font-medium text-[#101828] mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                   className={`w-full px-4 py-2 border rounded-lg text-sm font-normal transition-colors ${
                  isEditing ? "border-gray-300 text-[#131735]" : "bg-gray-100 text-gray-500"
                }`}
                  // className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#131735] text-sm font-normal transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#101828] mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                   className={`w-full px-4 py-2 border rounded-lg text-sm font-normal transition-colors ${
                  isEditing ? "border-gray-300 text-[#131735]" : "bg-gray-100 text-gray-500"
                }`}
                  // className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#131735] text-sm font-normal transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8">
              <div>
                <label className="block text-xs font-medium text-[#101828] mb-2">Phone Number</label>
                <div className="flex">
                  <div className="flex items-center px-3 py-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg">
                    <span className="w-4 h-3 bg-[#26735B] rounded-sm mr-2"></span>
                    <span className="text-sm text-gray-600">+234</span>
                  </div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    disabled={!isEditing} 
                     className={`flex-1 px-4 py-2 border rounded-r-lg text-sm font-normal transition-colors ${
                    isEditing ? "border-gray-300 text-[#131735]" : "bg-gray-100 text-gray-500"
                  }`}                   
                    // className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg text-[#131735] text-sm font-normal transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#101828] mb-2">
                  Alternate Phone Number (Optional)
                </label>
                <div className="flex">
                  <div className="flex items-center px-3 py-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg">
                    <span className="w-4 h-3 bg-[#26735B] rounded-sm mr-2"></span>
                    <span className="text-sm text-gray-600">+234</span>
                  </div>
                  <input
                    type="tel"
                    name="alternateNumber"
                    value={formData.alternateNumber}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`flex-1 px-4 py-2 border rounded-r-lg text-sm font-normal transition-colors ${
                    isEditing ? "border-gray-300 text-[#131735]" : "bg-gray-100 text-gray-500"
                  }`}
                    // className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg text-[#131735] text-sm font-normal transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="px-8">
              <label className="block text-xs font-medium text-[#101828] mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                 className={`w-full md:w-6/12 px-4 py-2 border rounded-lg text-sm font-normal transition-colors ${
                isEditing ? "border-gray-300 text-[#131735]" : "bg-gray-100 text-gray-500"
              }`}
                // className="w-full md:w-6/12 px-4 py-2 border border-gray-300 rounded-lg text-[#131735] text-sm font-normal transition-colors"
              />
            </div>
            <Divider className=" w-full" />
            <div className=" px-8 mt-4">
              <button
                type="button"
                disabled={!isEdited || isPending}
                onClick={handleSaveChanges}
                // className="w-full md:w-auto bg-[#26735B] hover:bg-emerald-700 text-white font-medium px-8 py-3 rounded-lg transition-colors"
 className={`w-full md:w-auto font-medium px-8 py-3 rounded-lg transition-colors ${
                !isEdited || isPending
                  ? "bg-[#26735B] opacity-80 text-gray-400 cursor-not-allowed"
                  : "bg-[#26735B] hover:bg-emerald-700 text-white"
              }`}
                // className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 py-3 rounded-lg transition-colors"
                // className={`font-medium px-8 py-3 rounded-lg transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                //   isEdited 
                //     ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                //     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                // }`}
              >
                 {isPending ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
