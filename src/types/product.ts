import { DeviceType, Order, Product, ProductImage } from "@prisma/client";

export type ProductWithOrders = Product & { Order: Order[] };
export type ProductWithImages = Product & {
  ProductImage: ProductImage[];
};

export type ImageBlock = {
  [key in DeviceType]: File | null;
};
