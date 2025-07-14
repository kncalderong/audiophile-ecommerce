import GoBack from "@/components/global/GoBack";
import PictureComponent from "@/components/global/PictureComponent";
import Categories from "@/components/home/Categories";
import Footer from "@/components/home/Footer";
import HeroFooter from "@/components/home/HeroFooter";
import AddToCart from "@/components/product/AddToCart";
import Gallery, { GallerySkeleton } from "@/components/product/Gallery";
import { getProductById } from "@/helpers/CRUD/product";
import { formatCurrency } from "@/lib/formatters";
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
  const mainImage = product.ProductImage.reduce(
    (acc, cur) => {
      if (cur.order === 0) {
        acc[cur.deviceType as "MOBILE" | "TABLET" | "DESKTOP"] = cur.imageUrl;
        return acc;
      } else {
        return acc;
      }
    },
    {
      MOBILE: "",
      TABLET: "",
      DESKTOP: "",
    }
  );
  return (
    <div className="w-full">
      <div className="container custom-box mt-6 md:mt-8 lg:mt-16">
        <GoBack />
      </div>
      <div className="container custom-box mb-28 mt-6 lg:mb-40 lg:mt-12 flex flex-col gap-20">
        <div className="w-full flex flex-col gap-10 md:flex-row md:gap-16 xl:gap-28">
          <div className="block relative w-full aspect-square overflow-hidden rounded-lg md:w-[280px] md:h-[480px] lg:w-[540px] lg:h-[560px] lg:shrink-0">
            <PictureComponent
              alt={`${product.name}`}
              mobile={mainImage.MOBILE || ""}
              tablet={mainImage.TABLET || ""}
              desktop={mainImage.DESKTOP || ""}
            />
          </div>
          <div className="flex flex-col gap-6 md:w-1/2 md:grow md:justify-center lg:shrink">
            {product.new && (
              <p className="text-overline text-store-orange-dark">
                NEW PRODUCT
              </p>
            )}
            <h4 className="md:w-1/2">{product.name}</h4>
            <p className="text-sm text-subtitle opacity-80 md:w-4/5">
              {product.description}
            </p>
            <h6 className="">{formatCurrency(product.priceInCents / 100)}</h6>
            <AddToCart product={product} />
          </div>
        </div>
        <div className="w-full grid grid-cols-1 gap-20 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
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
      </div>
      {product ? <Gallery product={product} /> : <GallerySkeleton />}
      <Categories />
      <HeroFooter />
      <Footer />
    </div>
  );
}
