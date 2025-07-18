"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

export function Nav({ children }: { children: ReactNode }) {
  return (
    <nav className="bg-primary text-primary-foreground z-50 relative">
      <div className="container custom-box border-b border-gray-500 justify-between flex items-center h-[90px] ">
        {children}
      </div>
    </nav>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "hover:text-store-orange-dark uppercase text-[13px]",
        pathname === props.href &&
          "text-store-orange-dark lg:text-primary-foreground"
      )}
    />
  );
}
