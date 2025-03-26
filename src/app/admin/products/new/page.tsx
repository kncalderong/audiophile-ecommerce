import { getCategories } from "@/helpers/CRUD/global";
import { ProductForm } from "../_components/ProductForm";

export default async function NewProductPage() {
  const categories = await getCategories({ resultColumns: "name, id, label" });

  return (
    <>
      <h3 className="mb-4">Add Product</h3>
      <ProductForm categories={categories || null} />
    </>
  );
}
