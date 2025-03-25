"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteOrderAction } from "../../_actions/order";

export function DeleteOrderDropdown({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await deleteOrderAction(id);
          router.refresh();
        })
      }
    >
      Delete
    </DropdownMenuItem>
  );
}
