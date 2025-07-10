import Categories from "@/components/home/Categories";
import Footer from "@/components/home/Footer";
import HeroFooter from "@/components/home/HeroFooter";
import Gallery, { GallerySkeleton } from "@/components/product/Gallery";
import { getProductById } from "@/helpers/CRUD/product";
import { ProductWithImages } from "@/types/product";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = (await getProductById({
    id,
    resultColumns:
      "id, new, name, description, ProductImage(imageUrl, order, deviceType, id)",
  })) as ProductWithImages;

  return (
    <div className="w-full">
      {product ? <Gallery product={product} /> : <GallerySkeleton />}
      <Categories />
      <HeroFooter />
      <Footer />
    </div>
  );
}
