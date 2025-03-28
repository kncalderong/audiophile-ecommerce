"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useActionState, useState } from "react";
import { addProduct, updateProductAction } from "../../_actions/products";
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

export function ProductForm({
  product,
  categories,
}: {
  product?: Product | null;
  categories: Category[] | null;
}) {
  const [error, action] = useActionState<
    { fieldErrors?: Record<string, string[]>; serverError?: string },
    FormData
  >(
    product == null ? addProduct : updateProductAction.bind(null, product.id),
    {}
  );

  const [priceInCents, setPriceInCents] = useState<string | number>(
    product?.priceInCents?.toString() || ""
  );

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={product?.name || ""}
        />
        {error?.fieldErrors?.name && (
          <div className="text-destructive">{error?.fieldErrors?.name}</div>
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
        {error?.fieldErrors?.priceInCents && (
          <div className="text-destructive">
            {error?.fieldErrors?.priceInCents}
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
        {error?.fieldErrors?.category && (
          <div className="text-destructive">{error?.fieldErrors?.category}</div>
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
        {error?.fieldErrors?.description && (
          <div className="text-destructive">
            {error?.fieldErrors?.description}
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
        {error?.fieldErrors?.features && (
          <div className="text-destructive">{error?.fieldErrors?.features}</div>
        )}
      </div>
      {!product && (
        <div className="space-y-2">
          <Label htmlFor="image">Image</Label>
          <Input
            type="file"
            id="image"
            name="image"
            required={product == null}
          />
          {error?.fieldErrors?.image && (
            <div className="text-destructive">{error?.fieldErrors?.image}</div>
          )}
        </div>
      )}
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
