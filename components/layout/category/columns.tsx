"use client";
import Delete from "@/components/custom ui/Delete";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
const formatDate = (input: string | Date) => {
  const date = typeof input === "string" ? new Date(input) : input;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
export const columns: ColumnDef<CategoryType>[] = [
  {
    accessorKey: "_id",
    header: "Mã Danh Mục",
    cell: ({ row }) => {
      const id = row.original._id;
      return (
        <Link
          href={`/categories/${row.original._id}`}
          className="hover:text-red-500"
        >
          {id}
        </Link>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Tên Danh Mục",
    cell: ({ row }) => {
      const title = row.original.title;
      return <h1 className="">{title}</h1>;
    },
  },
  {
    accessorKey: "image",
    header: "Ảnh Mô Tả",
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.image}
          alt="image"
          width={100}
          height={100}
          className="rounded-sm"
        />
      );
    },
  },
    {
      accessorKey: "products",
      header: "Số Lượng Sản Phẩm",
      cell: ({ row }) => {
        const products = row.original.products;
        const quantity = Array.isArray(products) ? products.length : 0;
        return <span>{quantity}</span>;
      },
    },
  {
    accessorKey: "createdAt",
    header: "Date/time",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return <span>{formatDate(createdAt)}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete id={row.original._id} item="category" />,
  },
];
