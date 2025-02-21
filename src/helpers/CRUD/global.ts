"use server";

import { createClient } from "@/lib/supabase/server";
import { Category } from "@prisma/client";
import { PostgrestError } from "@supabase/supabase-js";

export const getCategories = async ({
  resultColumns = "id, name, label",
}: {
  resultColumns?: string;
}): Promise<Category[]> => {
  const supabase = await createClient();
  const { data, error } = (await supabase
    .from("Category")
    .select(resultColumns)) as {
    data: Category[] | null;
    error: PostgrestError | null;
  };

  if (error || !data)
    throw new Error(error?.message || "Failed to fetch categories");
  return data;
};
