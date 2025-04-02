"use client"
import { BriefcaseBusiness, ChevronUp, Home, ScrollText, Settings, Users } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useTheme } from "next-themes"
import { useState } from "react"

// Menu items.
const items = [
    {
        title: "Home",
        url: "/dashboard/",
        icon: Home,
    },
    {
        title: "Cases",
        url: "/dashboard/cases",
        icon: BriefcaseBusiness,
    },
    {
        title: "Team",
        url: "/dashboard/team",
        icon: Users,
    },
    {
        title: "Billing",
        url: "/dashboard/billing",
        icon: ScrollText,
    },
]

export function AppSidebar() {
    const { setTheme } = useTheme()
    const [isDrak, setIsDrak] = useState(false)

    const toggleTheme = () => {
        if (isDrak) {
            setTheme("light")
        } else {
            setTheme("dark")
        }
        setIsDrak(!isDrak)
    }

    return (
        <Sidebar collapsible="icon" className="bg-sidebar">
            <SidebarHeader>
                <Image src={"/AJ_logo.png"} className="w-24" alt="" width={200} height={200} />
            </SidebarHeader>
            <SidebarContent className="mt-6">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-4">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url} className="space-x-2">
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem className="w-full">
                        <DropdownMenu >
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <Settings /> Settings
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[15rem] shadow-none"
                            >
                                {/* <DropdownMenuItem>
                                    <span>Account</span>
                                </DropdownMenuItem> */}
                                <DropdownMenuItem onClick={toggleTheme}>
                                    {isDrak ?
                                        <span>Light mode</span>
                                        :
                                        <span>Dark mode</span>
                                    }
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar >
    )
}
