"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import axios from "axios"
import { FaSpinner } from "react-icons/fa"
import { toast } from "@/components/ui/use-toast"

type Email = {
  _id: string,
  email: string,
  date: string,
}

const page = () => {
  const columns: ColumnDef<Email>[] = [
    {
      accessorKey: "select",
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
      cell:({row})=>(
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value)=>row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      )
    },
    {
      accessorKey: "_id",
      header: "ID",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("_id")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        return(
          <div className="capitalize text-nowrap text-ellipsis overflow-hidden max-w-60">
            {row.getValue("email")}
          </div>
        )
      },
    },
    {
      accessorKey: "date",
      header: () => <div className="text-left">Date</div>,
      cell: ({ row }) => {
        const BlogDate = new Date(row.getValue("date"));
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="text-left font-medium">{BlogDate.toDateString()}</TooltipTrigger>
              <TooltipContent>
                <p>{BlogDate.toTimeString()}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const blog = row.original
  
        const deleteEmail = async () => {
          await axios.delete("/api/email", {
            params:{
              id: row.getValue("_id")
            }
          });
          toast({
            description: "Email deleted successfully",
          })
          fetchEmails();
        }
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(blog._id)}
              >Copy Email ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={deleteEmail}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const [data, setData] = useState<Email[]>([])

  const fetchEmails = async () => {
    const response = await axios.get("/api/email")
    setData(response.data.emails)
  }
  
  useEffect(()=>{
    fetchEmails();
  }, [])

  const [deleteEmailsLoading, setDeleteEmailsLoading] = React.useState(false);
  const deleteEmails = async () => {
    setDeleteEmailsLoading(true);
    const ids = table.getFilteredSelectedRowModel().rows.map(item => item.getValue("_id"));
    const response = await axios.delete("/api/email", {
      params: {ids}
    });
    if (response.data.success){
      table.resetRowSelection();
      fetchEmails();
      toast({
        description: response.data.msg,
      })
      setDeleteEmailsLoading(false);
    }else{
      toast({
        description: response.data.msg,
      });
      setDeleteEmailsLoading(false);
    }
  }

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
  })

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-4">
        <div className="text-center items-center flex font-medium h-10 rounded-md">
          Subscriber List
        </div>
        <Input
          placeholder='Filter email...'
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event)=>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup)=>(
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header)=>{
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                      ? null
                      : flexRender (
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  )
                })}
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
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          {
          table.getFilteredSelectedRowModel().rows.length?
          <Button size="sm" onClick={deleteEmails} disabled={deleteEmailsLoading}>
            {deleteEmailsLoading?
            <FaSpinner className=" animate-spin"></FaSpinner>
            :"Delete"
          }
          </Button>
          :<></>
          }
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
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
    </div>
  )
}

export default page