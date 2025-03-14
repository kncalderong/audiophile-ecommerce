"use server";

import { createClient } from "@/lib/supabase/server";
import { Order } from "@prisma/client";
import { PostgrestError } from "@supabase/supabase-js";

export const deleteOrder = async (id: string) => {
  const supabase = await createClient();
  const { error } = await supabase.from("Order").delete().match({ id });

  if (error) throw new Error(error.message);
};

export const getAllOrders = async ({
  selectedColumns = "*",
}: {
  selectedColumns: string;
}): Promise<Order[] | null> => {
  const supabase = await createClient();
  const { data, error } = (await supabase
    .from("Order")
    .select(selectedColumns)) as {
    data: Order[] | null;
    error: PostgrestError | null;
  };
  if (error) throw new Error(error?.message || "Error retrieving orders");
  return data;
};
