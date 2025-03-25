"use client";

import AppProvider from "@/context/appContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}
