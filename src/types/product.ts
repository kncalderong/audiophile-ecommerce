import { DeviceType, Order, Product } from "@prisma/client";

export type ProductWithOrders = Product & { Order: Order[] };

export type ImageBlock = {
  [key in DeviceType]: File | null;
};
