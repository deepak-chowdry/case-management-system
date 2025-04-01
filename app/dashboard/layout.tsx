import { AppSidebar } from "@/components/AppSideBar";
import TopBar from "@/components/TopBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

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
                <div className="fixed bottom-4 left-3 md:hidden">
                    <SidebarTrigger />
                </div>

            </main>
        </SidebarProvider>
    );
}
