import { Providers } from "@/app/providers"
import { DashboardNavbar } from "@/modules/dashboard/dashboard-navbar"
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
            <DashboardNavbar />
            {children}
        </Providers>
    )
}