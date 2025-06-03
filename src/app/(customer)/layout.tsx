import { Nav, NavLink } from "@/components/navigation/Nav";
import MobileSidebar from "@/components/navigation/MobileSidebar";
import { ShoppingCart } from "lucide-react";
import { getCategories } from "@/helpers/CRUD/global";
import Image from "next/image";
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
        <div className="flex justify-center items-center md:justify-start md:pl-10 lg:pl-0 grow lg:grow-0">
          <div className="relative w-[145px] h-[25px]">
            <Image
              alt="audiphile-logo"
              src={"/audiophile.svg"}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
        <div className="hidden lg:flex">
          <NavLinks />
        </div>
        <button>
          <ShoppingCart className="w-6 h-6" />
        </button>
      </Nav>
      <main>{children}</main>
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
