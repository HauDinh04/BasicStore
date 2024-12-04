"use client";
import ProductForm from "@/components/layout/product/ProductForm";
import { useEffect, useState } from "react";

const ProductDetails = ({ params }: { params: { productId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [productId, setProductId] = useState<ProductType | null>(null);
  const getProductId = async () => {
    try {
      const res = await fetch(`/api/products/${params.productId}`, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Fail to fetch product");
      }
      const data = await res.json();

      setProductId(data);
    } catch (err) {
      console.log("[GET_ProductId]", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProductId();
  }, [params.productId]);
  
  console.log(productId)
  return (
    <div>
      <ProductForm initialData={productId} />
    </div>
  );
};

export default ProductDetails;
