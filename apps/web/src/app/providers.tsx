"use client";

import type React from "react";
import type { ReactNode } from "react";
import { Toaster } from "@camaras/ui/src/components/sonner";

export const Providers = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};
