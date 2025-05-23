"use server";

import {
  addProductImage,
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/helpers/CRUD/product";
import { ImageBlock } from "@/types/product";
import { DeviceType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  features: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  category: z.string().min(1),
  productImages: z.array(
    z.object({
      MOBILE: imageSchema,
      TABLET: imageSchema,
      DESKTOP: imageSchema,
    })
  ),
});

export async function addProduct(
  formData: FormData,
  productImages: ImageBlock[]
) {
  const result = addSchema.safeParse({
    ...Object.fromEntries(formData.entries()),
    productImages,
  });

  if (!result.success) {
    return { fieldErrors: result.error.formErrors.fieldErrors };
  }

  const data = result.data;
  const slug = data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  try {
    const newProduct = await createProduct({
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      slug,
      features: data.features,
      categoryId: data.category,
    });

    if (!newProduct) {
      return { serverError: "Failed to create product." };
    }

    for (let i = 0; i < productImages.length; i++) {
      const imageBlock = productImages[i];
      for (const deviceType of Object.values(DeviceType)) {
        const file = imageBlock[deviceType];
        if (!file) continue;
        await addProductImage(newProduct.id, file, deviceType, i);
      }
    }

    revalidatePath("/");
    revalidatePath("/products");
  } catch (error) {
    console.error("Error creating product:", error);
    return { serverError: `An unexpected error occurred: ${error}` };
  }
  redirect("/admin/products");
}
export async function updateProductAction(
  productId: string,
  prevState:
    | { fieldErrors?: Record<string, string[]>; serverError?: string }
    | undefined,
  formData: FormData
) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return { fieldErrors: result.error.formErrors.fieldErrors };
  }

  const data = result.data;
  const slug = data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  try {
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
  } catch (error) {
    console.error("Error updating product:", error);
    return { serverError: `An unexpected error occurred: ${error}` };
  }
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
