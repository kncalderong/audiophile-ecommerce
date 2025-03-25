import { Order, Product } from "@prisma/client";

export type ProductWithOrders = Product & { Order: Order[] };
