"use server";

import { revalidatePath } from "next/cache";

export async function deleteUser(id: string) {
  await deleteUser(id);
  revalidatePath("/");
}
