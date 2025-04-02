import { AppSidebar } from "@/components/AppSideBar";
import TopBar from "@/components/TopBar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <TopBar />
                {children}
            </main>
        </SidebarProvider>
    );
}
