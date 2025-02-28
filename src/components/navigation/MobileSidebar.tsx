"use client";

import { Menu } from "lucide-react";
import React, { useState } from "react";
import LeftModal from "../global/LeftModal";

const MobileSidebar = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="lg:hidden">
      <button className="flex items-center" onClick={toggleSidebar}>
        <Menu className="w-6 h-6" />
      </button>
      <LeftModal
        isOpen={isSidebarOpen}
        handleClose={() => setIsSidebarOpen(false)}
      >
        {children}
      </LeftModal>
    </div>
  );
};

export default MobileSidebar;
