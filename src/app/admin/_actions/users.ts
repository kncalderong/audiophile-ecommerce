"use server";

import { deleteUser } from "@/helpers/CRUD/user";
import { revalidatePath } from "next/cache";

export async function deleteUserAction(id: string) {
  await deleteUser(id);
  revalidatePath("/");
}
