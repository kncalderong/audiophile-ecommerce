import { getImageById } from "@/helpers/CRUD/product";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function EditProductImage({
  image_id,
}: {
  image_id: string;
}) {
  const imageData = await getImageById({ id: image_id });

  if (!imageData) {
    notFound();
  }

  console.log("Image Data:", imageData);

  return (
    <section className="p-4 space-y-4 md:p-6 md:space-y-6 lg:p-0 lg:space-y-8">
      <h4>Edit Product Image</h4>
      <div className="flex w-full flex-col gap-4 lg:flex-row max-w-6xl">
        <div className="space-y-4 w-full lg:w-1/2">
          <h6>Current</h6>
          <div className="w-full aspect-square block relative">
            <Image
              src={imageData.imageUrl}
              alt={imageData.deviceType}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={80}
            />
          </div>
        </div>
        <div className="space-y-4 w-full lg:w-1/2">
          <h6>New</h6>
        </div>
      </div>
    </section>
  );
}
