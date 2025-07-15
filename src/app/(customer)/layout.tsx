import { Nav, NavLink } from "@/components/navigation/Nav";
import MobileSidebar from "@/components/navigation/MobileSidebar";
import { ShoppingCart } from "lucide-react";
import { getCategories } from "@/helpers/CRUD/global";
import Logo from "@/components/global/Logo";
import Categories from "@/components/home/Categories";
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
          <Categories />
        </MobileSidebar>
        <div className="flex justify-center items-center md:justify-start md:pl-10 lg:pl-0 grow lg:grow-0 z-30">
          <Logo />
        </div>
        <div className="hidden lg:flex lg:gap-8">
          <NavLinks />
        </div>
        <button className="z-30">
          <ShoppingCart className="w-6 h-6" />
        </button>
      </Nav>
      <main>{children}</main>
    </>
  );
}

export async function NavLinks() {
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
