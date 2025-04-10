"use server";

import { createClient } from "@/lib/supabase/server";
import { DeviceType, Product } from "@prisma/client";
import { PostgrestError } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

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
  resultColumns: string;
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

export const getNextImageOrder = async (productId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ProductImage")
    .select("order")
    .eq("productId", productId)
    .order("order", { ascending: false }) // Get highest order first
    .limit(1);

  if (error) throw new Error(error.message);

  return data?.length ? data[0].order + 1 : 1; // If no images, start from 1
};

export const addProductImage = async (
  productId: string,
  file: File,
  deviceType: DeviceType
) => {
  const supabase = await createClient();
  const nextOrder = await getNextImageOrder(productId); // Auto-assign order

  const { data, error: storageError } = await supabase.storage
    .from("product-images")
    .upload(`products/${productId}/${file.name}`, file);

  if (storageError || !data) {
    throw new Error(storageError.message || "Failed to upload image");
  }

  const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/product-images/${data.path}`;

  const { error } = await supabase
    .from("ProductImage")
    .insert([
      { productId, imageUrl, order: nextOrder, deviceType, id: uuidv4() },
    ]);

  if (error) {
    throw new Error(error.message || "Failed to add product image");
  }
};
