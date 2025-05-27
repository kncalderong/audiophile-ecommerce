import { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { DeviceType } from "@prisma/client";
import { ImageBlock } from "@/types/product";

const AddImage = ({
  productImages,
  setProductImages,
}: {
  productImages: ImageBlock[];
  setProductImages: Dispatch<SetStateAction<ImageBlock[]>>;
}) => {
  const addImageBlock = () => {
    setProductImages((prev) => {
      return [...prev, { MOBILE: null, TABLET: null, DESKTOP: null }];
    });
  };

  const handleFileChange = (
    file: File,
    blockIndex: number,
    deviceType: DeviceType
  ) => {
    const updatedBlocks = [...productImages];
    updatedBlocks[blockIndex][deviceType] = file;
    setProductImages(updatedBlocks);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <Label>Images</Label>
        <Button type="button" onClick={addImageBlock}>
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>

      {productImages.map((block, blockIndex) => (
        <div key={blockIndex} className="border p-4 rounded-md space-y-4">
          <p className="font-semibold">Image Block {blockIndex + 1}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.values(DeviceType).map((deviceType) => (
              <div key={deviceType} className="space-y-2">
                <Label htmlFor={`image-${blockIndex}-${deviceType}`}>
                  {deviceType}
                </Label>
                <Input
                  id={`image-${blockIndex}-${deviceType}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files &&
                    handleFileChange(e.target.files[0], blockIndex, deviceType)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddImage;
