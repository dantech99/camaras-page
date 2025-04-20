import { Footer } from "@/modules/global/footer";
import { Navbar } from "@/modules/global/navbar";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}