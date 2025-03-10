"use client";

import * as React from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type FoodOrder = {
  id: string;
  customer: string;
  items: string;
  total: number;
  date: string;
  address: string;
  status: "pending" | "delivered" | "cancelled";
};

const initialData: FoodOrder[] = [
  {
    id: "1",
    customer: "Amgalan",
    items: "2 foods",
    total: 26.97,
    date: "2024/12/20",
    address: "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdse...",
    status: "pending",
  },
];

export function OrderInfo() {
  const [data, setData] = React.useState<FoodOrder[]>(initialData);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const handleStatusChange = (
    newStatus: "pending" | "delivered" | "cancelled",
    orderId: string
  ) => {
    const updatedData = data.map((item) =>
      item.id === orderId ? { ...item, status: newStatus } : item
    );
    setData(updatedData);
  };
  const columns: ColumnDef<FoodOrder>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "№",
      enableHiding: false,
    },
    {
      accessorKey: "customer",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Customer
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "items",
      header: "Food",
      cell: ({ row }) => (
        <div className="flex items-center">
          <span>{row.getValue("items")}</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "total",
      header: () => <div className="text-right">Total</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("total"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "address",
      header: "Delivery Address",
      cell: ({ row }) => (
        <div className="truncate max-w-md" title={row.getValue("address")}>
          {row.getValue("address")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Delivery state",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const order = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="focus:outline-none px-3 py-2 ">
                {status}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() => handleStatusChange("pending", order.id)}
              >
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusChange("delivered", order.id)}
              >
                Delivered
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusChange("cancelled", order.id)}
              >
                Cancelled
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const totalOrders = data.length;
  const totalPrice = data.reduce((acc, order) => acc + order.total, 0);

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Orders</h2>
          <span className="text-gray-500">{totalOrders} items</span>
          <span className="text-gray-500">
            Total Price:{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(totalPrice)}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Filter by customer..."
            value={
              (table.getColumn("customer")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("customer")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                View <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <div className="flex items-center gap-1">
          {Array.from({ length: table.getPageCount() }, (_, i) => (
            <Button
              key={i}
              variant={
                table.getState().pagination.pageIndex === i
                  ? "default"
                  : "outline"
              }
              size="sm"
              onClick={() => table.setPageIndex(i)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
