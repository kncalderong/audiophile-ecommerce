import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProductWithImages } from "@/types/product";
import { PencilIcon, SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const EditImages = ({ product }: { product: ProductWithImages }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {product.ProductImage.map((image) => (
        <div key={image.id} className="relative block w-full h-[300px] group">
          {/* overlay */}
          <div className="lg:hidden block group-hover:lg:block absolute w-full h-full top-0 left-0 z-20 bg-gradient-to-t from-black from-10% via-gray-800 via-30% to-gray-200 to-90% opacity-50"></div>
          <div className="lg:hidden flex group-hover:lg:flex absolute top-0 left-0 w-full z-30 justify-between items-center p-4">
            <Link
              href={image.imageUrl}
              target="_blank"
              className=" bg-store-gray-strong text-white rounded-lg cursor-pointer p-1"
            >
              <SquareArrowOutUpRight className="h-6 w-6" />
            </Link>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className=" bg-store-gray-strong text-white rounded-lg cursor-pointer p-1">
                    <PencilIcon className="h-6 w-6" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="lg:hidden flex group-hover:lg:flex flex-col absolute bottom-0 left-0 w-full z-30 justify-between items-left p-4">
            <p className="text-white text-sm font-semibold">
              <span className="font-bold">Device Type: </span>
              {image.deviceType}
            </p>
            <p className="text-white text-xs">
              <span className="font-bold">Order: </span>
              {image.order}
            </p>
          </div>
          <Image
            src={image.imageUrl}
            alt={image.deviceType}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={80}
          />
        </div>
      ))}
    </div>
  );
};

export default EditImages;
