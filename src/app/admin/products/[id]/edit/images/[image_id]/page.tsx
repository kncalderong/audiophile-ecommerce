import EditProductImage from "@/app/admin/products/_components/EditProductImage";

export default async function EditPhotoPage({
  params,
}: {
  params: Promise<{ image_id: string }>;
}) {
  const { image_id } = await params;

  return <EditProductImage image_id={image_id} />;
}
