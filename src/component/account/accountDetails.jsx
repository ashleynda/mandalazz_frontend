// import React, { useState } from 'react';
// import { User, Book, Package, Star, Heart, Settings, Menu, X } from 'lucide-react';

// export default function AccountDetails() {
//   const [formData, setFormData] = useState({
//     firstName: 'Elizabeth',
//     lastName: 'Salem',
//     phoneNumber: '801 234 5678',
//     altPhoneNumber: '801 234 5678',
//     email: 'johnbull001@hotmail.com'
//   });

//   const [activeTab, setActiveTab] = useState('Account');
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const menuItems = [
//     { icon: User, label: 'Account', active: true },
//     { icon: Book, label: 'Address Book' },
//     { icon: Package, label: 'My Orders' },
//     { icon: Star, label: 'Reviews' },
//     { icon: Heart, label: 'Favourites' },
//     { icon: Settings, label: 'Settings' }
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-sm border-r border-gray-200">
//         <div className="p-6">
//           <nav className="space-y-2">
//             {menuItems.map((item, index) => {
//               const Icon = item.icon;
//               return (
//                 <button
//                   key={index}
//                   onClick={() => setActiveTab(item.label)}
//                   className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
//                     item.label === activeTab
//                       ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-500'
//                       : 'text-gray-600 hover:bg-gray-50'
//                   }`}
//                 >
//                   <Icon size={20} />
//                   <span className="font-medium">{item.label}</span>
//                 </button>
//               );
//             })}
//           </nav>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8">
//         <div className="max-w-2xl">
//           <h1 className="text-2xl font-semibold text-gray-900 mb-8">Account Details</h1>
          
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
//             <div className="space-y-6">
//               {/* Name Fields */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     First Name
//                   </label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Last Name
//                   </label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
//                   />
//                 </div>
//               </div>

//               {/* Phone Numbers */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Phone Number
//                   </label>
//                   <div className="flex">
//                     <div className="flex items-center px-3 py-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg">
//                       <span className="w-4 h-3 bg-green-500 rounded-sm mr-2"></span>
//                       <span className="text-sm text-gray-600">+234</span>
//                     </div>
//                     <input
//                       type="tel"
//                       name="phoneNumber"
//                       value={formData.phoneNumber}
//                       onChange={handleInputChange}
//                       className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Alternate Phone Number (Optional)
//                   </label>
//                   <div className="flex">
//                     <div className="flex items-center px-3 py-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg">
//                       <span className="w-4 h-3 bg-green-500 rounded-sm mr-2"></span>
//                       <span className="text-sm text-gray-600">+234</span>
//                     </div>
//                     <input
//                       type="tel"
//                       name="altPhoneNumber"
//                       value={formData.altPhoneNumber}
//                       onChange={handleInputChange}
//                       className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
//                 />
//               </div>

//               {/* Save Button */}
//               <div className="pt-6">
//                 <button
//                   type="button"
//                   className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 py-3 rounded-lg transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client"

import { Divider } from "@mui/material"
// import type React from "react"

import { useEffect, useState } from "react"
import { useUserProfile } from "../../lib/hooks/account/useAccountDetails";

export default function AccountDetails() {
   const { data, isLoading, error } = useUserProfile();
  // const { mutate: updateUserProfile, isPending } = useUpdateUserProfile();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    alternateNumber: "",
    email: "",
  });
  console.log({ isLoading, error, data });


  const [initialData, setInitialData] = useState(null);

  // const [formData, setFormData] = useState({
  //   firstName: "Elizabeth",
  //   lastName: "Salem",
  //   phoneNumber: "801 234 5678",
  //   altPhoneNumber: "801 234 5678",
  //   email: "johnbull001@hotmail.com",
  // })

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
    // updateUserProfile(formData, {
    //   onSuccess: () => {
    //     setInitialData(formData); // update snapshot after saving
    //   },
    // });
    console.log("Saving changes:", formData);
  };

  // 🧠 Check if form is edited
  // const isEdited = useMemo(() => {
  //   if (!initialData) return false;
  //   return Object.keys(formData).some(
  //     (key) => formData[key] !== initialData[key]
  //   );
  // }, [formData, initialData]);
  // const handleInputChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   })
  // }

    if (isLoading) {
    return (
      <div className="p-8">
        <div className="bg-white rounded-lg shadow-sm min-h-screen">
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-500">Loading account details...</div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-8">
        <div className="bg-white rounded-lg shadow-sm min-h-screen">
          <div className="flex items-center justify-center py-20">
            <div className="text-red-500">Error loading account details: {error.message}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 ">
      <div className=" bg-white rounded-lg shadow-sm min-h-full">
        <h1 className="text-lg font-bold text-[#3E3C3C] px-8 py-4 ">Account Details</h1>
        <Divider className="mb-8 w-full" />
        <div className="">
          <div className="space-y-6 ">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8 mt-4">
              <div>
                <label className="block text-xs font-medium text-[#101828] mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#131735] text-sm font-normal transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#101828] mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#131735] text-sm font-normal transition-colors"
                />
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8">
              <div>
                <label className="block text-xs font-medium text-[#101828] mb-2">Phone Number</label>
                <div className="flex">
                  <div className="flex items-center px-3 py-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg">
                    <span className="w-4 h-3 bg-green-500 rounded-sm mr-2"></span>
                    <span className="text-sm text-gray-600">+234</span>
                  </div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg text-[#131735] text-sm font-normal transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#101828] mb-2">
                  Alternate Phone Number (Optional)
                </label>
                <div className="flex">
                  <div className="flex items-center px-3 py-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg">
                    <span className="w-4 h-3 bg-green-500 rounded-sm mr-2"></span>
                    <span className="text-sm text-gray-600">+234</span>
                  </div>
                  <input
                    type="tel"
                    name="alternateNumber"
                    value={formData.alternateNumber}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg text-[#131735] text-sm font-normal transition-colors"
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
                className="w-6/12 px-4 py-2 border border-gray-300 rounded-lg text-[#131735] text-sm font-normal transition-colors"
              />
            </div>
            <Divider className=" w-full" />
            {/* Save Button */}
            <div className=" px-8 mt-4">
              <button
                type="button"
                // disabled={isPending }
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 py-3 rounded-lg transition-colors"
                // className={`font-medium px-8 py-3 rounded-lg transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                //   isEdited 
                //     ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                //     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                // }`}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
