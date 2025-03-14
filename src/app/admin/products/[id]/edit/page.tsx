import { ProductForm } from "../../_components/ProductForm";
import { getProductById } from "@/helpers/CRUD/product";

export default async function EditProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getProductById({ id, resultColumns: "*" });

  return (
    <>
      <h1>Edit Product</h1>
      <ProductForm product={product} />
    </>
  );
}
