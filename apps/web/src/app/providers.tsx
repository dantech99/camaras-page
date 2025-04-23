"use client";

import type React from "react";
import type { ReactNode } from "react";
import { Toaster } from "@camaras/ui/src/components/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Providers = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        {children}
        <Toaster />
      </QueryClientProvider>
    </>
  );
};
