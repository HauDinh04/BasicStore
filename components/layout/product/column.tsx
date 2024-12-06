"use client";

import Delete from "@/components/custom ui/Delete";
import Categories from "@/lib/models/Category";
import { ColumnDef } from "@tanstack/react-table";
import { Span } from "next/dist/trace";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: "Tên Sản Phẩm",
    cell: ({ row }) => {
      const title = row.original.title;
      return (
        <Link
          href={`/products/${row.original._id}`}
          className="hover:text-red-500"
        >
          <span>{title}</span>
        </Link>
      );
    },
  },
  {
    accessorKey: "categories",
    header: "Danh Mục",
    cell: ({ row }) =>  row.original.categories.map((category)=>category.title).join(' / ')
      
    
  },
  {
    accessorKey: "media",
    header: "Ảnh",
    cell: ({ row }) => {
      const image = row.original.media;
      const imageUrl = Array.isArray(image) ? image[0] : image;
      return (
        <Image src={imageUrl} alt="image" width={100} height={100}></Image>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Giá",
    cell: ({ row }) => {
      const Price = row.original.price;
      const formattedPrice = `${Price.toLocaleString("vi-VN")}`;

      return (
        <span>
          {formattedPrice}{" "}
          <sup style={{ fontSize: "0.7em", marginLeft: "2px" }}>vnđ</sup>
        </span>
      );
    },
  },
  {
    accessorKey: "salePercentage",
    header: "Giảm Giá",
    cell: ({ row }) => {
      const sale = row.original.salePercentage;
      return (
        <span>
          {sale} <sup>%</sup>
        </span>
      );
    },
  },
  {
    accessorKey: "oldPrice",
    header: "Giá Cũ",
    cell: ({ row }) => {
      const OldPrice = row.original.oldPrice;
      const formattedPrice = `${OldPrice.toLocaleString("vi-VN")}`;
      return (
        <span>
          {formattedPrice}{" "}
          <sup style={{ fontSize: "0.7em", marginLeft: "2px" }}>vnđ</sup>
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete id={row.original._id} item="product" />,
  },
];
