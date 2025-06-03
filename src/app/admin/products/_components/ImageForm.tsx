"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import { ProductImage } from "@prisma/client";
import { updateImage } from "../../_actions/products";
import { useActionState } from "react";

export function ImageForm({ productImage }: { productImage: ProductImage }) {
  const [error, action] = useActionState<
    { fieldErrors?: Record<string, string[]>; serverError?: string },
    FormData
  >(
    updateImage.bind(
      null,
      productImage.id,
      productImage.productId,
      productImage.deviceType
    ),
    {}
  );

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required />
        {error.fieldErrors?.image && (
          <div className="text-destructive">{error.fieldErrors?.image}</div>
        )}
      </div>
      {error?.serverError && (
        <div className="text-destructive">{error.serverError}</div>
      )}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
