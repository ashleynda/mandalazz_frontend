// "use client";

// import React, { useState } from "react"
// import { User, MapPin, ShoppingBag, FileText, Heart, Settings } from "lucide-react"
// import AccountDetails from "../accountDetails";

// const UserDashboard = () => {
//   const [activeTab, setActiveTab] = useState("Account")

//   const menuItems = [
//     {
//       id: 1,
//       label: "Account",
//       icon: User,
//       path: "/accountDetails",
//     },
//     {
//       id: 2,
//       label: "Delivery Addresses",
//       icon: MapPin,
//       path: "/delivery-addresses",
//     },
//     {
//       id: 3,
//       label: "My Orders",
//       icon: ShoppingBag,
//       path: "/my-orders",
//     },
//     {
//       id: 4,
//       label: "Reviews",
//       icon: FileText,
//       path: "/reviews",
//     },
//     {
//       id: 5,
//       label: "Favourites",
//       icon: Heart,
//       path: "/favourites",
//     },
//     {
//       id: 6,
//       label: "Settings",
//       icon: Settings,
//       path: "/settings",
//     },
//   ]

//   const renderContent = () => {
//     switch (activeTab) {
//       case "Account":
//         return <AccountDetails />
//       case "Delivery Addresses":
//         return <div className="p-8 bg-gray-50 min-h-screen"><div className="text-gray-500">Delivery Addresses content will go here</div></div>
//       case "My Orders":
//         return <div className="p-8 bg-gray-50 min-h-screen"><div className="text-gray-500">My Orders content will go here</div></div>
//       case "Reviews":
//         return <div className="p-8 bg-gray-50 min-h-screen"><div className="text-gray-500">Reviews content will go here</div></div>
//       case "Favourites":
//         return <div className="p-8 bg-gray-50 min-h-screen"><div className="text-gray-500">Favourites content will go here</div></div>
//       case "Settings":
//         return <div className="p-8 bg-gray-50 min-h-screen"><div className="text-gray-500">Settings content will go here</div></div>
//       default:
//         return <AccountDetails />
//     }
//   }

//   return (
//     <div className="flex bg-gray-50 px-44 ">
//       <div className=" mx-auto bg-white border border-[#F2F4F7] h-[288px] mt-16 " >
//         <div className="">
//           <ul className="space-y-1">
//             {menuItems.map((item) => {
//               const isActive = activeTab === item.label
//               const IconComponent = item.icon

//               return (
//                 <li key={item.id}>
//                   <button
//                     onClick={() => setActiveTab(item.label)}
//                     className={`flex items-center w-full px-6 py-3 text-sm font-medium transition-colors duration-200 relative group text-nowrap ${isActive
//                         ? "text-[#26735B] bg-[#E0F5EF] w-full"
//                         : "text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
//                       }`}
//                   >
//                     <IconComponent
//                       className={`h-5 w-5 mr-4 transition-colors duration-200 ${isActive ? "text-[#26735B]" : "text-gray-500 group-hover:text-emerald-600"
//                         }`}
//                     />
//                     <span className="font-normal">{item.label}</span>
//                     {isActive && (
//                       <div className="absolute right-0 top-0 h-full w-1 bg-[#26735B] rounded-l-sm" />
//                     )}
//                   </button>
//                 </li>
//               )
//             })}
//           </ul>
//         </div>
//       </div>
//       <div className="flex-1 w-full p-8 bg-gray-50 ">
//         {renderContent()}
//       </div>
//     </div>
//   )
// }

// export default UserDashboard