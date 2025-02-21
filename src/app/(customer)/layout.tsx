import { Nav, NavLink } from "@/components/navigation/Nav";
import MobileSidebar from "@/components/navigation/MobileSidebar";
import { ShoppingCart } from "lucide-react";
import { getCategories } from "@/helpers/CRUD/global";
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

async function NavLinks() {
  const categories = await getCategories({ resultColumns: "name, id, label" });
  return (
    <>
      <NavLink href="/">Home</NavLink>
      {categories.map((category) => (
        <NavLink href={`/products/${category.name}`} key={category.id}>
          {category.label}
        </NavLink>
      ))}
    </>
  );
}
