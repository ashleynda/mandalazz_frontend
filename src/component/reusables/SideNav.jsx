"use client"

import { User, BookOpen, ShoppingBag, FileText, Heart, Settings } from "lucide-react"

export const sidebarItems = [
    { 
        name: "Account", 
        icon: User, 
        route: "/account" 
    },
    { 
        name: "Address Book", 
        icon: BookOpen 
    },
    { 
        name: "My Orders", 
        icon: ShoppingBag 
    },
    { 
        name: "Reviews", 
        icon: FileText
    },
    { 
        name: "Favourites",
        icon: Heart 
    },
    { 
        name: "Settings", 
        icon: Settings 
    },
  ]

