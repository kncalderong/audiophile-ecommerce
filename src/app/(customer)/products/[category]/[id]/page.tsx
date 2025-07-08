import Categories from "@/components/home/Categories";
import Footer from "@/components/home/Footer";
import HeroFooter from "@/components/home/HeroFooter";
import { getProductById } from "@/helpers/CRUD/product";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProductById({
    id,
    resultColumns:
      "id, new, name, description, ProductImage(imageUrl, order, deviceType, id)",
  });

  console.log("product", product);
  return (
    <div className="w-full">
      <Categories />
      <HeroFooter />
      <Footer />
    </div>
  );
}
