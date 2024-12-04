"use client";
import TitleHeader from "@/components/custom ui/TitleHeader";
import { DataTable } from "@/components/layout/category/data-table";
import { columns } from "@/components/layout/product/column";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const router = useRouter();
  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products", {
        method: "GET",
      });
      const data = await res.json();
      setProducts(data), setLoading(false);
    } catch (err) {
      console.log("[fail to fetch ", err);
    }
  };
  useEffect(()=>{
    getProducts();
  },[])
  return (
    <div>
      <div className="flex gap-2 items-center justify-between">
        <div className="flex-1">
          <TitleHeader title="Danh sách sản phẩm" />
        </div>

        <Button onClick={() => router.push("/products/new")}>Tạo mới</Button>
      </div>
      <DataTable data={products} columns={columns} />
    </div>
  );
};

export default ProductPage;
