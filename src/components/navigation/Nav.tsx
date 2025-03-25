"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

export function Nav({ children }: { children: ReactNode }) {
  return (
    <nav className="bg-primary text-primary-foreground">
      <div className="container border-b border-gray-500 justify-between flex px-4 items-center min-h-[90px] ">
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
        "hover:text-store-orange-dark lg:p-4 uppercase text-[13px]",
        pathname === props.href &&
          "text-store-orange-dark lg:text-primary-foreground"
      )}
    />
  );
}
