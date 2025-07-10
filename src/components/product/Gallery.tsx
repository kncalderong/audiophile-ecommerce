import { ProductWithImages } from "@/types/product";
import PictureComponent from "../global/PictureComponent";

type CollatedImageBlock = {
  order: number;
  MOBILE?: string;
  TABLET?: string;
  DESKTOP?: string;
};

export default function Gallery({ product }: { product: ProductWithImages }) {
  const collatedImages: CollatedImageBlock[] = [];

  product.ProductImage.forEach((img) => {
    let block = collatedImages.find((b) => b.order === img.order);
    if (!block) {
      block = { order: img.order };
      collatedImages.push(block);
    }
    block[img.deviceType as "MOBILE" | "TABLET" | "DESKTOP"] = img.imageUrl;
  });
  collatedImages.sort((a, b) => a.order - b.order);
  console.log("collatedImages", collatedImages);
  return (
    <div className="container custom-box my-28 lg:my-40">
      <div className="grid grid-cols-1 grid-rows-4 gap-4 md:grid-cols-5 md:grid-rows-2">
        <div className="block relative overflow-hidden aspect-[1.8] w-full bg-store-gray-mid rounded-lg md:col-span-2">
          <PictureComponent
            alt={`${product.name}-${collatedImages[1].order}`}
            mobile={collatedImages[1].MOBILE || ""}
            tablet={collatedImages[1].TABLET || ""}
            desktop={collatedImages[1].DESKTOP || ""}
          />
        </div>
        <div className="block relative overflow-hidden aspect-[1.8] w-full bg-store-gray-mid rounded-lg md:col-span-2 md:row-start-2">
          <PictureComponent
            alt={`${product.name}-${collatedImages[2].order}`}
            mobile={collatedImages[2].MOBILE || ""}
            tablet={collatedImages[2].TABLET || ""}
            desktop={collatedImages[2].DESKTOP || ""}
          />
        </div>
        <div className="block relative overflow-hidden aspect-[0.9] w-full bg-store-gray-mid row-span-2 rounded-lg md:aspect-auto md:col-span-3">
          <PictureComponent
            alt={`${product.name}-${collatedImages[3].order}`}
            mobile={collatedImages[3].MOBILE || ""}
            tablet={collatedImages[3].TABLET || ""}
            desktop={collatedImages[3].DESKTOP || ""}
          />
        </div>
      </div>
    </div>
  );
}

export function GallerySkeleton() {
  return (
    <div className="container custom-box my-16">
      <div className="grid grid-cols-1 grid-rows-4 gap-4 md:grid-cols-5 md:grid-rows-2">
        <div className="aspect-[1.8] w-full bg-store-gray-mid rounded-lg md:col-span-2"></div>
        <div className="aspect-[1.8] w-full bg-store-gray-mid rounded-lg md:col-span-2 md:row-start-2"></div>
        <div className="aspect-[0.9] w-full bg-store-gray-mid row-span-2 rounded-lg md:aspect-auto md:col-span-3"></div>
      </div>
    </div>
  );
}
