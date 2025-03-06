"use server";

import { deleteProduct, updateProduct } from "@/helpers/CRUD/product";
import { revalidatePath } from "next/cache";

export async function deleteProductAction(id: string) {
  await deleteProduct(id);
  revalidatePath("/");
  revalidatePath("/products");
}

export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await updateProduct(id, { isAvailableForPurchase });
  revalidatePath("/");
  revalidatePath("/products");
}
