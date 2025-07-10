import Categories from "@/components/home/Categories";
import Footer from "@/components/home/Footer";
import HeroFooter from "@/components/home/HeroFooter";
import Gallery, { GallerySkeleton } from "@/components/product/Gallery";
import { getProductById } from "@/helpers/CRUD/product";
import { ProductWithImages } from "@/types/product";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = (await getProductById({
    id,
    resultColumns:
      "id, new, name, description, priceInCents, includes, features, ProductImage(imageUrl, order, deviceType, id)",
  })) as ProductWithImages;

  console.log("product", product);
  const parsedFeatures = product.features.split("\\n\\n");

  return (
    <div className="w-full">
      <div className="container custom-box my-28 lg:my-40 flex flex-col gap-20">
        <div className="flex flex-col gap-6">
          <h4 className="lg:text-h2">FEATURES</h4>
          {parsedFeatures.map((feature, idx) => (
            <p className="text-sm text-subtitle opacity-80" key={idx}>
              {feature}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-6">
          <h4 className="lg:text-h2">IN THE BOX</h4>
          <div className="w-full flex flex-col gap-2">
            {product.includes.map((e) => {
              if (!e) return null;
              const item = e as { item: string; quantity: number };
              return (
                <div
                  key={`${item.quantity}-${item.item}`}
                  className="flex gap-4 items-center"
                >
                  <p className="text-sm text-subtitle text-store-orange-dark font-bold">{`${item.quantity}x`}</p>
                  <p className="text-sm text-subtitle opacity-80">
                    {item.item}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {product ? <Gallery product={product} /> : <GallerySkeleton />}
      <Categories />
      <HeroFooter />
      <Footer />
    </div>
  );
}
