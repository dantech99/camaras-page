import type React from "react";
import type { ReactNode } from "react";
import { Navbar } from "../components/navbar";
import { FuturisticFooter } from "../components/footer/footer";

interface LayoutHomeProps {
  children: ReactNode;
}

export const LayoutHome: React.FC<LayoutHomeProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <FuturisticFooter />
    </>
  );
};
