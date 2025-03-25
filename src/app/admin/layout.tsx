import MobileSidebar from "@/components/navigation/MobileSidebar";
import { Nav, NavLink } from "@/components/navigation/Nav";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <MobileSidebar>
          <AdminNavLinks />
        </MobileSidebar>
        <Link
          href="/"
          className="flex justify-center items-center md:justify-start md:pl-10 lg:pl-0 grow lg:grow-0"
        >
          <div className="relative w-[145px] h-[25px]">
            <Image
              alt="audiphile-logo"
              src={"/audiophile.svg"}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>
        <div className="hidden lg:flex">
          <AdminNavLinks />
        </div>
        <div></div>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
}

function AdminNavLinks() {
  return (
    <>
      <NavLink href="/admin">Dashboard</NavLink>
      <NavLink href="/admin/products">Products</NavLink>
      <NavLink href="/admin/users">Customers</NavLink>
      <NavLink href="/admin/orders">Sales</NavLink>
    </>
  );
}
