import EditProductImage from "@/app/admin/products/_components/EditProductImage";
import { ParallelModal } from "@/components/global/ParallelModal";

export default async function EditPhotoModal({
  params,
}: {
  params: Promise<{ image_id: string }>;
}) {
  const { image_id } = await params;

  return (
    <ParallelModal>
      <EditProductImage image_id={image_id} />
    </ParallelModal>
  );
}
