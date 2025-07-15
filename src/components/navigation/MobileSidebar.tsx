"use client";

import { Menu } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

const MobileSidebar = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="lg:hidden h-full flex items-center">
      <button className="flex items-center z-30" onClick={toggleSidebar}>
        <Menu className="w-6 h-6" />
      </button>
      <aside
        className={cn(
          "fixed left-0 top-0 w-full h-screen z-20 transition-all duration-500",
          isSidebarOpen
            ? "pointer-events-auto backdrop-blur-[2px] bg-gray-700/10"
            : "pointer-events-none bg-transparent"
        )}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setIsSidebarOpen(false);
          }
        }}
      >
        <section
          className={cn(
            "absolute top-0 z-20 w-screen rounded-b-lg transition-transform duration-200 flex flex-col overflow-hidden bg-white",
            isSidebarOpen ? "max-h-none top-[90px]" : "max-h-0 "
          )}
        >
          {children}
        </section>
      </aside>
    </div>
  );
};

export default MobileSidebar;
