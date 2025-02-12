import { Nav, NavLink } from "@/components/navigation/Nav";
import MobileSidebar from "@/components/navigation/MobileSidebar";
import { ShoppingCart } from "lucide-react";

export const dynamic = "force-dynamic";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <MobileSidebar>
          <NavLinks />
        </MobileSidebar>
        <p>audiophile</p>
        <div className="hidden lg:flex">
          <NavLinks />
        </div>
        <button>
          <ShoppingCart className="w-6 h-6" />
        </button>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
}

function NavLinks() {
  return (
    <>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/products">Headphones</NavLink>
      <NavLink href="/orders">Speakers</NavLink>
      <NavLink href="/orders">Earphones</NavLink>
    </>
  );
}
