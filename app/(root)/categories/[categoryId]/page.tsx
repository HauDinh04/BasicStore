"use client";
import CategoryForm from "@/components/layout/category/CategoryForm";
import React, { useEffect, useState } from "react";

const EditCategoryId = ({ params }: { params: { categoryId: string } }) => {
  const [categoryId, setCategoryId] = useState<CategoryType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCategoryId = async () => {
    try {
      const res = await fetch(`/api/categories/${params.categoryId}`, {
        method: "GET",
      });
      if (!res.ok) throw new Error("Failed to fetch category data");
      const data = await res.json();
      setCategoryId(data);
    } catch (err) {
      console.error("[Get categoryId]", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategoryId();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <CategoryForm initialData={categoryId} />
    </div>
  );
};

export default EditCategoryId;
