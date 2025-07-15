import { getSuggestedProducts } from "@/helpers/CRUD/product";
import { ProductWithImages } from "@/types/product";
import Image from "next/image";
import { CustomButton } from "../global/CustomButton";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function MayAlsoLike({
  productId,
}: {
  productId: string;
}) {
  const products = (await getSuggestedProducts({
    currentProductId: productId,
    resultColumns: "id, name, Category(name)",
  })) as (ProductWithImages & {
    Category: {
      name: string;
    };
  })[];
  const extendNameLineHeight = products.some(
    (product) => product.name.length > 12
  );
  return (
    <div className="container custom-box space-y-10">
      <h4 className="w-full text-center lg:text-h2">YOU MAY ALSO LIKE</h4>
      <div className="flex flex-col w-full gap-14 md:gap-4 md:flex-row">
        {products &&
          products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col w-full gap-8 justify-between items-center"
            >
              <div className="w-full flex justify-center items-center bg-store-gray-mid rounded-lg md:h-80 md:overflow-hidden">
                <div className="block relative w-[125px] aspect-square mx-auto md:w-[125%] shrink-0 lg:w-full">
                  <Image
                    alt={product.name}
                    src={product.ProductImage[0].imageUrl}
                    sizes="50vw"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
              <h4
                className={cn(
                  "text-center",
                  extendNameLineHeight &&
                    "md:h-20 md:flex md:items-end 2xl:h-auto"
                )}
              >
                {product.name}
              </h4>
              <CustomButton
                variant="primary"
                size="md"
                className="w-[160px] h-12"
              >
                <Link href={`/products/${product.Category.name}/${product.id}`}>
                  see product
                </Link>
              </CustomButton>
            </div>
          ))}
      </div>
    </div>
  );
}
