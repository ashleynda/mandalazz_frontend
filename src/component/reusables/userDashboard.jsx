// "use client"

// import { useState } from "react"
// import { User, BookOpen, ShoppingBag, FileText, Heart, Settings } from "lucide-react"
// import AccountDetails from "../accountDetails";
// import { cn } from "../../lib/utils";

// export default function UserDashboard() {
//   const [activeTab, setActiveTab] = useState("Account")

//   const menuItems = [
//     { name: "Account", icon: User },
//     { name: "Address Book", icon: BookOpen },
//     { name: "My Orders", icon: ShoppingBag },
//     { name: "Reviews", icon: FileText },
//     { name: "Favourites", icon: Heart },
//     { name: "Settings", icon: Settings },
//   ]

//   // Render the appropriate content based on the active tab
//   const renderContent = () => {
//     switch (activeTab) {
//       case "Account":
//         return <AccountDetails />
//       case "Address Book":
//         return <div className="p-8">Address Book content will go here</div>
//       case "My Orders":
//         return <div className="p-8">My Orders content will go here</div>
//       case "Reviews":
//         return <div className="p-8">Reviews content will go here</div>
//       case "Favourites":
//         return <div className="p-8">Favourites content will go here</div>
//       case "Settings":
//         return <div className="p-8">Settings content will go here</div>
//       default:
//         return <AccountDetails />
//     }
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-64 bg-white border-r h-screen">
//         <nav className="py-4">
//           <ul className="space-y-1">
//             {menuItems.map((item) => {
//               const isActive = activeTab === item.name
//               return (
//                 <li key={item.name}>
//                   <button
//                     onClick={() => setActiveTab(item.name)}
//                     className={cn(                        
//                       "flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 relative",
//                       isActive && "text-emerald-600",
//                     )}
//                   >
//                     <item.icon className={cn("h-5 w-5 mr-3", isActive ? "text-emerald-600" : "text-gray-500")} />
//                     <span>{item.name}</span>
//                     {isActive && <div className="absolute right-0 top-0 h-full w-1 bg-emerald-600" />}
//                   </button>
//                 </li>
//               )
//             })}
//           </ul>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1">{renderContent()}</div>
//     </div>
//   )
// }
"use client"

import React from "react"
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineIntegrationInstructions,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md"
import { FaUsers } from "react-icons/fa"
import { BiSupport } from "react-icons/bi"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const UserDashboard = () => {
  const router = useRouter()
  const menuItems = [
    {
      id: 1,
      label: "Account",
      icon: <AccountCircleIcon className="h-5 w-5 mr-3" />,
      path: "/account/accountDetails",
    },
    {
      id: 2,
      label: "My Orders",
      icon: <ListAltIcon className="h-5 w-5 mr-3" />,
      path: "/analytics",
    },
    {
      id: 3,
      label: "Favourites",
      icon: <FavoriteBorderIcon className="h-5 w-5 mr-3" />,
      path: "/users",
    },
    {
      id: 4,
      label: "Settings",
      icon: <SettingsIcon className="h-5 w-5 mr-3" />,
      path: "/integration",
    },
    {
      id: 5,
      label: "Log Out",
      icon: <LogoutIcon className="h-5 w-5 mr-3" />,
      path: "/support",
    },
    {
      id: 6,
      label: "Settings",
      icon: <MdOutlineSettings className="h-5 w-5 mr-3" />,
      path: "/settings",
    },
  ]

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/login")
  }

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200">
      {/* <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <span className="text-lg font-semibold">User Dashboard</span>
      </div> */}
      <div className="py-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <NavItem item={item} />
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-0 w-full border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
        >
          <MdOutlineLogout className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  )
}

const NavItem = ({ item }) => {
  const router = useRouter()
  const [currentPath, setCurrentPath] = useState("")

  // Use useEffect to get current path on client side
  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const isActive = currentPath === item.path

  return (
    <li
      onClick={() => router.push(item.path)}
      className={`flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 relative cursor-pointer ${
        isActive ? "text-emerald-600" : ""
      }`}
    >
      {React.cloneElement(item.icon, {
        className: `h-5 w-5 mr-3 ${isActive ? "text-emerald-600" : "text-gray-500"}`,
      })}
      {item.label}
      {isActive && <span className="absolute left-0 top-1/2 h-8 w-1 bg-emerald-600 -translate-y-1/2"></span>}
    </li>
  )
}

export default UserDashboard
