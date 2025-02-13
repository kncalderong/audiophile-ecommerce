import { Product } from "@prisma/client";

export type ReducerAction<T, P> = {
  type: T;
  payload: P;
};

export type GlobalAction =
  | ReducerAction<"ADD_TO_CART", { product: Product; amount: number }>
  | ReducerAction<"REMOVE_FROM_CART", { productId: string }>;
