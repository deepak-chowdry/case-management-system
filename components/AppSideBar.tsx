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

// Menu items.
const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Cases",
        url: "#",
        icon: BriefcaseBusiness,
    },
    {
        title: "Team",
        url: "#",
        icon: Users,
    },
    {
        title: "Billing",
        url: "#",
        icon: ScrollText,
    },
]

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" className="bg-blue-50/30">
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
                                <DropdownMenuItem>
                                    <span>Dark mode</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                    <SidebarMenuItem className="flex justify-end">
                        <SidebarMenuButton asChild className="w-fit">
                            <SidebarTrigger />

                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
