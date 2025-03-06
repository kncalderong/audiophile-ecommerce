import { Product } from "@prisma/client";

export type ProductWithOrders = Product & { Order: { id: string }[] };
