"use server";

import {
  addProductImage,
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/helpers/CRUD/product";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  features: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  image: imageSchema.refine((file) => file.size > 0, "Required"),
  category: z.string().min(1),
});

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const slug = data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const newProduct = await createProduct({
    id: uuidv4(),
    name: data.name,
    description: data.description,
    priceInCents: data.priceInCents,
    slug,
    features: data.features,
    categoryId: data.category,
  });

  if (newProduct) {
    await addProductImage(newProduct.id, data.image, "DESKTOP");
  }

  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function updateProductAction(
  productId: string,
  prevState: unknown,
  formData: FormData
) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const slug = data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  await updateProduct(productId, {
    name: data.name,
    description: data.description,
    priceInCents: data.priceInCents,
    slug,
    features: data.features,
  });

  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
}

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
