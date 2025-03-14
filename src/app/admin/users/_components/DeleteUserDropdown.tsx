"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteUserAction } from "../../_actions/users";

export function DeleteUserDropDownItem({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await deleteUserAction(id);
          router.refresh();
        })
      }
    >
      Delete
    </DropdownMenuItem>
  );
}
