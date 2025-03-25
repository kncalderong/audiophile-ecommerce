"use server";

import { createClient } from "@/lib/supabase/server";
import { Category, User } from "@prisma/client";
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

export const getSalesData = async (): Promise<{
  amount: number;
  numberOfSales: number;
  userCount: number;
  averageValuePerUser: number;
}> => {
  const supabase = await createClient();
  const { data, error } = (await supabase
    .from("Order")
    .select("pricePaidInCents, User (id)")) as {
    data: { pricePaidInCents: number; User: User }[];
    error: PostgrestError | null;
  };
  if (error || !data)
    throw new Error(error?.message || "Failed to fetch sales data");
  const sum = data.reduce((acc, order) => acc + order.pricePaidInCents, 0);
  const numberOfSales = data.length;
  const userCount = new Set(data.map((order) => order.User.id)).size;
  const averageValuePerUser = userCount === 0 ? 0 : sum / userCount;

  return {
    amount: (sum || 0) / 100,
    numberOfSales,
    userCount,
    averageValuePerUser,
  };
};

export const getProductData = async (): Promise<{
  activeCount: number;
  inactiveCount: number;
}> => {
  const supabase = await createClient();
  const { count: activeCount, error } = (await supabase
    .from("product")
    .select("*", { count: "exact", head: true })
    .eq("isAvailableForPurchase", true)) as {
    count: number;
    error: PostgrestError | null;
  };
  const { count: inactiveCount, error: error2 } = (await supabase
    .from("product")
    .select("*", { count: "exact", head: true })
    .eq("isAvailableForPurchase", false)) as {
    count: number;
    error: PostgrestError | null;
  };
  if (error || error2)
    throw new Error(
      error?.message || error2?.message || "Failed to fetch product data"
    );
  return { activeCount, inactiveCount };
};
