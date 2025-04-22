import { Providers } from "@/app/providers"
import { DashboardNavbar } from "@/modules/dashboard/sidebar/dashboard-navbar"
import { AppSidebar } from "@/modules/dashboard/sidebar/dashboard-sidebar"
import { SidebarInset, SidebarProvider } from "@camaras/ui/src/components/sidebar"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard for photographers or users",
}

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <Providers>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <DashboardNavbar />
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </Providers>
    )
}