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
    <section className="w-full bg-white py-14 mt-14 md:mt-16 md:pt-20">
      <div className="container custom-box grid grid-cols-1 gap-20 md:flex-row md:gap-2 md:grid-cols-3 lg:gap-8">
        {Object.entries(CATEGORIES).map(([key, value]) => (
          <Link
            href={`/products/${key}`}
            key={key}
            className="rounded-lg bg-store-gray-mid flex flex-col justify-end items-center h-[165px] relative p-2 w-full lg:h-[205px] group"
          >
            <div className="w-[140px] aspect-square absolute -top-1/3 left-1/2 block translate-x-[-50%] lg:w-[200px] group-hover:-translate-y-3 ease-linear duration-300">
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
              <CustomButton variant="outline">shop</CustomButton>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
