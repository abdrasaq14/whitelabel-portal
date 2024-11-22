"use client"; // Mark this as a client component
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/store/ReduxProvider";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
      <ReduxProvider>
        <Toaster />
        {children}
      </ReduxProvider>
  );
}
