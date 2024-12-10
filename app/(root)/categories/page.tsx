"use client";
import TitleHeader from "@/components/custom ui/TitleHeader";
import { columns } from "@/components/layout/category/columns";
import { DataTable } from "@/components/layout/category/data-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import type { Metadata } from "next";

const CategoryPage = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/categories", {
        method: "GET",
      });
      const data = await res.json();
      setCategories(data);
      setLoading(false);
    } catch (err) {
      console.log("server fail", err);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div>
      <div className="flex gap-2 items-center justify-between">
        <div className="flex-1">
          <TitleHeader title="Danh sách danh mục" />
        </div>

        <Button onClick={() => router.push("/categories/new")}>Tạo mới</Button>
      </div>
      <div className=" mx-auto py-10">
        <DataTable columns={columns} data={categories} />
      </div>
    </div>
  );
};

export default CategoryPage;
