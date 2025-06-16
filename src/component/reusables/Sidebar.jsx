"use client"

import { useState } from "react"
import { User, BookOpen, ShoppingBag, FileText, Heart, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SidebarNavigation() {
  const [activeItem, setActiveItem] = useState("Account")

  const menuItems = [
    { name: "Account", icon: User },
    { name: "Address Book", icon: BookOpen },
    { name: "My Orders", icon: ShoppingBag },
    { name: "Reviews", icon: FileText },
    { name: "Favourites", icon: Heart },
    { name: "Settings", icon: Settings },
  ]

  return (
    <div className="w-64 bg-white border-r h-screen">
      <nav className="py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = activeItem === item.name
            return (
              <li key={item.name}>
                <button
                  onClick={() => setActiveItem(item.name)}
                  className={cn(
                    "flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 relative",
                    isActive && "text-emerald-600",
                  )}
                >
                  <item.icon className={cn("h-5 w-5 mr-3", isActive ? "text-emerald-600" : "text-gray-500")} />
                  <span>{item.name}</span>
                  {isActive && <div className="absolute right-0 top-0 h-full w-1 bg-emerald-600" />}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
