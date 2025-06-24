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

// import type React from "react"

import { useState } from "react"

export default function AccountDetails() {
  const [formData, setFormData] = useState({
    firstName: "Elizabeth",
    lastName: "Salem",
    phoneNumber: "801 234 5678",
    altPhoneNumber: "801 234 5678",
    email: "johnbull001@hotmail.com",
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="p-8">
      <div className="w-[748px] bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8 border-b border-gray-200">Account Details</h1>

        <div className="">
          <div className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
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
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alternate Phone Number (Optional)
                </label>
                <div className="flex">
                  <div className="flex items-center px-3 py-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg">
                    <span className="w-4 h-3 bg-green-500 rounded-sm mr-2"></span>
                    <span className="text-sm text-gray-600">+234</span>
                  </div>
                  <input
                    type="tel"
                    name="altPhoneNumber"
                    value={formData.altPhoneNumber}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-6/12 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Save Button */}
            <div className="pt-6">
              <button
                type="button"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 py-3 rounded-lg transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
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
