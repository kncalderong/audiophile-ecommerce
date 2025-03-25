"use server";

import { createClient } from "@/lib/supabase/server";
import { User } from "@prisma/client";
import { PostgrestError } from "@supabase/supabase-js";

export const deleteUser = async (id: string) => {
  const supabase = await createClient();
  const { error } = await supabase.from("User").delete().match({ id });

  if (error) throw new Error(error.message);
};

export const getAllUsers = async ({
  selectedColumns = "*",
}: {
  selectedColumns: string;
}): Promise<User[] | null> => {
  const supabase = await createClient();
  const { data, error } = (await supabase
    .from("User")
    .select(selectedColumns)) as {
    data: User[] | null;
    error: PostgrestError | null;
  };

  if (error) throw new Error(error?.message || "An error occurred");

  return data;
};
