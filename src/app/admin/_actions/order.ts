"use server";

import { deleteOrder } from "@/helpers/CRUD/order";
import { revalidatePath } from "next/cache";

export async function deleteOrderAction(id: string) {
  await deleteOrder(id);
  revalidatePath("/");
}
