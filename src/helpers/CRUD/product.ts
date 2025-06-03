"use server";

import { createClient } from "@/lib/supabase/server";
import { DeviceType, Product, ProductImage } from "@prisma/client";
import { PostgrestError } from "@supabase/supabase-js";

export const deleteProduct = async (id: string) => {
  const supabase = await createClient();
  const { error } = await supabase.from("Product").delete().match({ id });

  if (error) throw new Error(error.message);
};

export const updateProduct = async (
  id: string,
  data: { [key: string]: unknown }
) => {
  const supabase = await createClient();
  const { error } = await supabase.from("Product").update(data).match({ id });

  if (error) throw new Error(error.message);
};

export const getProductById = async ({
  id,
  resultColumns = "*",
}: {
  id: string;
  resultColumns?: string;
}): Promise<Product | null> => {
  const supabase = await createClient();
  const { data, error } = (await supabase
    .from("Product")
    .select(resultColumns)
    .eq("id", id)) as {
    data: Product[] | null;
    error: PostgrestError | null;
  };

  if (error) throw new Error(error.message);
  return data?.[0] || null;
};

export const getImageById = async ({
  id,
  resultColumns = "*",
}: {
  id: string;
  resultColumns?: string;
}): Promise<ProductImage | null> => {
  const supabase = await createClient();
  const {
    data,
    error,
  }: { data: ProductImage | null; error: PostgrestError | null } =
    await supabase
      .from("ProductImage")
      .select(resultColumns)
      .eq("id", id)
      .maybeSingle();

  if (error) throw new Error(error.message);
  return data || null;
};

export const createProduct = async (data: {
  [key: string]: unknown;
}): Promise<Product | null> => {
  const supabase = await createClient();
  const { data: newProduct, error } = await supabase
    .from("Product")
    .insert([data])
    .select();

  if (error) throw new Error(error.message);
  return newProduct?.[0] || null;
};

export const getAllProducts = async ({
  resultColumns = "*",
}: {
  resultColumns: string;
}): Promise<Product[]> => {
  const supabase = await createClient();
  const { data, error } = (await supabase
    .from("Product")
    .select(resultColumns)) as {
    data: Product[] | null;
    error: PostgrestError | null;
  };

  if (error || !data)
    throw new Error(error?.message || "Failed to fetch categories");
  return data;
};

export const addProductImage = async (
  productId: string,
  file: File,
  deviceType: DeviceType,
  order: number
) => {
  const supabase = await createClient();

  const imageUrl = await uploadImageToStorage(productId, deviceType, file);

  const { error } = await supabase
    .from("ProductImage")
    .insert([{ productId, imageUrl, order, deviceType }]);

  if (error) {
    throw new Error(error.message || "Failed to add product image");
  }
};

export const editProductImage = async (
  productId: string,
  file: File,
  imageId: string,
  deviceType: DeviceType
) => {
  const supabase = await createClient();
  const imageUrl = await uploadImageToStorage(
    productId,
    deviceType,
    file,
    true
  );

  const { error } = await supabase
    .from("ProductImage")
    .update({ imageUrl })
    .match({ id: imageId });

  if (error) throw new Error(error.message);
};

export const uploadImageToStorage = async (
  productId: string,
  deviceType: DeviceType,
  file: File,
  isEditing: boolean = false
) => {
  const supabase = await createClient();
  const name = isEditing ? `${new Date().getTime()}-${file.name}` : file.name;
  const { data, error: storageError } = await supabase.storage
    .from("product-images")
    .upload(`products/${productId}/${deviceType}/${name}`, file, {
      upsert: true,
    });

  if (storageError || !data) {
    throw new Error(storageError.message || "Failed to upload image");
  }

  const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/product-images/${data.path}`;

  return imageUrl;
};
