import { Order, Product, User } from "@prisma/client";

export type OrderWithUserAndProduct = Order & {
  Product: Product;
  User: User;
};
