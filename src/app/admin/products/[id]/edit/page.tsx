import { getCategories } from "@/helpers/CRUD/global";
import { ProductForm } from "../../_components/ProductForm";
import { getProductById } from "@/helpers/CRUD/product";
import { ProductWithImages } from "@/types/product";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById({
    id,
    resultColumns: "*, ProductImage(*)",
  });

  if (!product) throw new Error("Product not found");

  const categories = await getCategories({ resultColumns: "name, id, label" });

  return (
    <>
      <h3 className="mb-4">Edit Product</h3>
      <ProductForm
        product={product as ProductWithImages}
        categories={categories || null}
      />
    </>
  );
}
