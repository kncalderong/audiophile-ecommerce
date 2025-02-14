"use server";

import { createClient } from "@/lib/supabase/server";

export const getCategories = async ({
  resultColumns = "name, label",
}: {
  resultColumns?: string;
}) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("Category").select(resultColumns);

  if (error) throw new Error(error.message);
  return data;
};
