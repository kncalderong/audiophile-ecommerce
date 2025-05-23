"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useRef, useState } from "react";
import { addProduct } from "../../_actions/products";
import { useFormStatus } from "react-dom";
import { Category, Product } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddImage from "./AddImage";
import { ImageBlock } from "@/types/product";

export function ProductForm({
  product,
  categories,
}: {
  product?: Product | null;
  categories: Category[] | null;
}) {
  const [formError, setFormError] = useState<{
    fieldErrors?: Record<string, string[]>;
    serverError?: string;
  }>({});
  const formRef = useRef<HTMLFormElement>(null);

  const [priceInCents, setPriceInCents] = useState<string | number>(
    product?.priceInCents?.toString() || ""
  );
  const [productImages, setProductImages] = useState<ImageBlock[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const formData = new FormData(form);
    const result = await addProduct(formData, productImages);
    if (result) {
      setFormError(result);
      return;
    }
    form.reset();
    setProductImages([]);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={product?.name || ""}
        />
        {formError?.fieldErrors?.name && (
          <div className="text-destructive">{formError?.fieldErrors?.name}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price In Cents</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          required
          value={priceInCents}
          onChange={(e) => setPriceInCents(+e.target.value || "")}
        />
        <div className="text-muted-foreground">
          {formatCurrency((+priceInCents || 0) / 100)}
        </div>
        {formError?.fieldErrors?.priceInCents && (
          <div className="text-destructive">
            {formError?.fieldErrors?.priceInCents}
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Category</Label>
        <Select name="category" required>
          <SelectTrigger className="">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={`${category.id}`}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {formError?.fieldErrors?.category && (
          <div className="text-destructive">
            {formError?.fieldErrors?.category}
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={product?.description}
        />
        {formError?.fieldErrors?.description && (
          <div className="text-destructive">
            {formError?.fieldErrors?.description}
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Features</Label>
        <Textarea
          id="features"
          name="features"
          required
          defaultValue={product?.features}
        />
        {formError?.fieldErrors?.features && (
          <div className="text-destructive">
            {formError?.fieldErrors?.features}
          </div>
        )}
      </div>
      {!product && (
        <AddImage
          productImages={productImages}
          setProductImages={setProductImages}
        />
      )}
      {formError?.serverError && (
        <div className="text-destructive">{formError.serverError}</div>
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
