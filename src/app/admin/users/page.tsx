import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatCurrency, formatNumber } from "@/lib/formatters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { getAllUsers } from "@/helpers/CRUD/user";
import { UserWithOrders } from "@/types/user";
import { DeleteUserDropDownItem } from "./_components/DeleteUserDropdown";

export default function UsersPage() {
  return (
    <>
      <h1>Customers</h1>
      <UsersTable />
    </>
  );
}

async function UsersTable() {
  const users = (await getAllUsers({
    selectedColumns: "id, email, Order(pricePaidInCents)",
  })) as UserWithOrders[];

  if (users?.length === 0 || !users) return <p>No customers found</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead>Value</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.email}</TableCell>
            <TableCell>{formatNumber(user.Order.length)}</TableCell>
            <TableCell>
              {formatCurrency(
                user.Order.reduce((sum, o) => o.pricePaidInCents + sum, 0) / 100
              )}
            </TableCell>
            <TableCell className="text-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DeleteUserDropDownItem id={user.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
