import { getCategories } from "@/helpers/CRUD/global";
import { ProductForm } from "../../_components/ProductForm";
import { getProductById } from "@/helpers/CRUD/product";
import { ProductWithImages } from "@/types/product";
import EditImages from "../../_components/EditImages";

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
    <section className="p-4 space-y-4 md:p-6 md:space-y-6 lg:p-0 lg:space-y-8">
      <h3 className="">Edit Product</h3>
      <ProductForm
        product={product as ProductWithImages}
        categories={categories || null}
      />
      <EditImages product={product as ProductWithImages} />
    </section>
  );
}
