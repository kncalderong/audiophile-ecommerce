import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/formatters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { DeleteOrderDropdown } from "./_components/DeleteOrderDropdown";
import { getAllOrders } from "@/helpers/CRUD/order";
import { OrderWithUserAndProduct } from "@/types/order";

export default function OrdersPage() {
  return (
    <>
      <h1>Sales</h1>
      <OrdersTable />
    </>
  );
}

async function OrdersTable() {
  const orders = (await getAllOrders({
    selectedColumns: "id, pricePaidInCents, Product (name), User (email)",
  })) as OrderWithUserAndProduct[];

  if (orders.length === 0 || !orders) return <p>No sales found</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Price Paid</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.Product.name}</TableCell>
            <TableCell>{order.User.email}</TableCell>
            <TableCell>
              {formatCurrency(order.pricePaidInCents / 100)}
            </TableCell>
            <TableCell className="text-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DeleteOrderDropdown id={order.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
