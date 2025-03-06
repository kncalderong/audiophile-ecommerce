"use server";

import { createClient } from "@/lib/supabase/server";
import { Product } from "@prisma/client";
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
