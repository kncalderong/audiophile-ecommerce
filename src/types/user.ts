import { Order, User } from "@prisma/client";

export type UserWithOrders = User & { Order: Order[] };
