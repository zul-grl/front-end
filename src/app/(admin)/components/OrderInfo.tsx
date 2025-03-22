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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrder } from "@/app/_context/OrderContext";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { FoodOrderType, UserType, foodOrderItemsType } from "@/app/_util/type";
import Image from "next/image";
export function OrderInfo() {
  const { allOrders, fetchAllOrderData, loading, handleStatusChange } =
    useOrder();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<
    "pending" | "delivered" | "cancelled"
  >("pending");
  const [dateFilter, setDateFilter] = React.useState<Date | null>(null);

  React.useEffect(() => {
    fetchAllOrderData();
  }, []);

  const columns: ColumnDef<FoodOrderType>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
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
      accessorKey: "index",
      header: "№",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: "customer",
      header: "Customer",
      cell: ({ row }) => {
        const user: UserType = row.getValue("user");
        return <div>{user?.email}</div>;
      },
    },
    {
      accessorKey: "foodOrderItems",
      header: "Food",
      cell: ({ row }) => {
        const items = row.getValue("foodOrderItems") as foodOrderItemsType[];

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{items?.length} foods</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {items.map((item, index) => (
                <DropdownMenuItem key={index}>
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.food.image}
                      alt={item.food.foodName}
                      className="w-8 h-8 rounded"
                      width={100}
                      height={100}
                    />
                    <span>{item.food.foodName}</span>
                    <span className="ml-auto">x{item.quantity}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      accessorKey: "totalPrice",
      header: "Total",
      cell: ({ row }) => `$${row.getValue("totalPrice")}`,
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) =>
        format(new Date(row.getValue("createdAt")), "yyyy-MM-dd"),
    },
    {
      accessorKey: "user",
      header: "Delivery Address",
      cell: ({ row }) => {
        const user: UserType = row.getValue("user");
        return <div>{user?.address}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{status}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => handleStatusChange("pending", row.original._id)}
              >
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handleStatusChange("delivered", row.original._id)
                }
              >
                Delivered
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handleStatusChange("cancelled", row.original._id)
                }
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
    data: allOrders,
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

  const handleBulkStatusChange = async () => {
    const selectedRows = table.getSelectedRowModel().rows;
    for (const row of selectedRows) {
      await handleStatusChange(selectedStatus, row.original._id);
    }
    setIsDialogOpen(false);
    setRowSelection({});
  };

  return (
    <div className="w-full bg-white rounded-xl p-4">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-xl font-semibold">Orders</h2>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateFilter
                  ? format(new Date(dateFilter), "yyyy-MM-dd")
                  : "Filter by date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
              <input
                type="date"
                className="border rounded px-2 py-1"
                value={
                  dateFilter ? format(new Date(dateFilter), "yyyy-MM-dd") : ""
                }
                onChange={(e) =>
                  setDateFilter(
                    e.target.value ? new Date(e.target.value) : null
                  )
                }
              />
            </PopoverContent>
          </Popover>

          <Button
            onClick={() => setIsDialogOpen(true)}
            disabled={table.getSelectedRowModel().rows.length === 0}
          >
            Change Delivery State
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
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
                <TableRow key={row.id}>
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
                  {loading ? "Loading..." : "No orders found."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Delivery State</DialogTitle>
          </DialogHeader>
          <div className="flex gap-2 justify-center">
            <Button
              variant={selectedStatus === "pending" ? "default" : "outline"}
              onClick={() => setSelectedStatus("pending")}
            >
              Pending
            </Button>
            <Button
              variant={selectedStatus === "delivered" ? "default" : "outline"}
              onClick={() => setSelectedStatus("delivered")}
            >
              Delivered
            </Button>
            <Button
              variant={selectedStatus === "cancelled" ? "default" : "outline"}
              onClick={() => setSelectedStatus("cancelled")}
            >
              Cancelled
            </Button>
          </div>
          <DialogFooter>
            <Button onClick={handleBulkStatusChange}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
