"use client";

import { Product } from "@prisma/client";
import { CustomButton } from "../global/CustomButton";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export default function AddToCart({ product }: { product: Product }) {
  const [amount, setAmount] = useState(1);
  return (
    <div className="w-full flex items-center gap-4 h-[48px]">
      <div className="flex gap-4 h-full px-4 items-center bg-store-gray-mid">
        <div
          className="w-8 aspect-square grid place-content-center"
          onClick={() => setAmount((prev) => (prev - 1 > 0 ? prev - 1 : prev))}
        >
          <Minus size={10} color="gray" />
        </div>
        <p className="font-bold ">{amount}</p>
        <div
          className="w-8 aspect-square grid place-content-center"
          onClick={() => setAmount((prev) => prev + 1)}
        >
          <Plus size={10} color="gray" />
        </div>
      </div>
      <CustomButton
        variant="primary"
        size="md"
        className="w-[160px] h-full"
        onClick={() => console.log(product.id)}
      >
        ADD TO CART
      </CustomButton>
    </div>
  );
}
