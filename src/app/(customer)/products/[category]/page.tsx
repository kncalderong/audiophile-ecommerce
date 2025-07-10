import { CustomButton } from "@/components/global/CustomButton";
import PictureComponent from "@/components/global/PictureComponent";
import Categories from "@/components/home/Categories";
import Footer from "@/components/home/Footer";
import HeroFooter from "@/components/home/HeroFooter";
import { getProductsByCategory } from "@/helpers/CRUD/product";
import { cn } from "@/lib/utils";
import { ProductWithImages } from "@/types/product";
import Link from "next/link";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const products = (await getProductsByCategory({
    category,
    resultColumns:
      "id, new, name, description, ProductImage(imageUrl, order, deviceType, id)",
  })) as ProductWithImages[];

  return (
    <div className="w-full">
      <div className="bg-primary text-primary-foreground  relative">
        <h4 className="container custom-box  flex px-4 py-8 items-center justify-center marker:uppercase font-medium md:py-16 lg:text-h2 lg:font-medium ">
          {category}
        </h4>
      </div>
      {products.map((product, idx) => (
        <ProductItem
          key={product.id}
          product={product}
          category={category}
          idx={idx}
        />
      ))}
      <Categories />
      <HeroFooter />
      <Footer />
    </div>
  );
}

function ProductItem({
  product,
  category,
  idx,
}: {
  product: ProductWithImages;
  category: string;
  idx: number;
}) {
  const image = product.ProductImage.filter(
    (image) => image.order === 0 && image.deviceType === "MOBILE"
  );

  return (
    <section
      className={cn(
        "container custom-box flex flex-col gap-6 text-center pt-16 pb-8  lg:gap-16",
        idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
      )}
    >
      {image.length > 0 && (
        <div className="w-full aspect-square rounded-lg bg-store-gray-mid grid place-content-center md:aspect-video lg:aspect-square">
          <div className="w-[320px] block relative aspect-square md:w-[400px] xl:w-[500px] 2xl:w-[600px]">
            <PictureComponent
              alt="ZX9-Speaker"
              mobile={image[0].imageUrl || ""}
              tablet={image[0].imageUrl || ""}
              desktop={image[0].imageUrl || ""}
            />
          </div>
        </div>
      )}
      <div className="w-full flex flex-col items-center gap-6 lg:justify-center">
        {product.new && (
          <p className="text-overline text-store-orange-dark">NEW PRODUCT</p>
        )}
        <h4 className="md:w-1/2 lg:text-h2">{product.name}</h4>
        <p className="text-sm text-subtitle opacity-80 md:w-4/5">
          {product.description}
        </p>
        <CustomButton variant="primary" size="md" className="w-[160px] mx-auto">
          <Link href={`/products/${category}/${product.id}`}>see product</Link>
        </CustomButton>
      </div>
    </section>
  );
}
