import Image from "next/image";
import { CustomButton } from "../global/CustomButton";
import Link from "next/link";

const CATEGORIES = {
  headphones: "/categories/desktop/image-category-thumbnail-headphones.png",
  speakers: "/categories/desktop/image-category-thumbnail-speakers.png",
  earphones: "/categories/desktop/image-category-thumbnail-earphones.png",
};

export default function Categories() {
  return (
    <section className="w-full bg-white py-28">
      <div className="container custom-box flex flex-col gap-20">
        {Object.entries(CATEGORIES).map(([key, value]) => (
          <div
            key={key}
            className="rounded-lg bg-store-gray-mid flex flex-col justify-end items-center h-[165px] relative p-2"
          >
            <div className="w-[140px] aspect-square absolute -top-1/3 left-1/2 block translate-x-[-50%]">
              <Image
                src={value}
                alt={key}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <h6 className="uppercase">{key}</h6>
              <CustomButton variant="outline">
                <Link href={`/products/${key}`}>shop</Link>
              </CustomButton>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
