import type React from "react";
import type { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

interface LayoutHomeProps {
    children: ReactNode;
}

export const LayoutHome: React.FC<LayoutHomeProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}