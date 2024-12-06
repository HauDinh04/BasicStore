"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../../ui/textarea";
import ImageUpload from "../../custom ui/imageUpload";
import { useRouter } from "next/navigation";

import TitleHeader from "../../custom ui/TitleHeader";
import { useEffect, useState } from "react";
import MultiText from "@/components/custom ui/MultiText";
import MultiSelect from "@/components/custom ui/MultiSelect";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Tên Danh Mục Phải Hơn 3 kí tự",
    })
    .max(50),
  description: z
    .string()
    .min(10, {
      message: "Hãy Nhập Thêm Mô Tả Sản Phẩm",
    })
    .max(50),
  media: z.array(z.string().url({ message: "Yêu cầu cần hình ảnh" })),
  categories: z.array(z.string()),
  tags: z.array(z.string()),
  material: z.array(z.string()),
  price: z.coerce
    .number({ message: "Hãy nhập giá trị là số" })
    .nullable()
    .refine((val) => val === null || val >= 10000, {
      message: "giá trị sản phẩm phải lớn hơn 10.000 vnđ",
    }),
  oldPrice: z.coerce
    .number({ message: "giá cũ được tính theo giá mới và sasale" })
    .nullable(),
  salePercentage: z.coerce
    .number({ message: "giá trị là số" })
    .nullable()
    .refine((val) => val === null || (val >= 5 && val <= 80), {
      message: "Giảm giá từ 5 điến 80%",
    })
    .optional(),
});
interface initialDataProps {
  initialData?: ProductType | null;
}
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
};
const ProductForm: React.FC<initialDataProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState<CategoryType[]>([]);

  const getCategories = async () => {
    try {
      const res = await fetch("/api/categories", { method: "GET" });
      console.log("Response status:", res.status);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("[GET_categories]", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          categories: initialData.categories.map((category) => category._id),
        }
      : {
          title: "",
          description: "",
          media: [],
          categories: [],
          tags: [],
          material: [],
          price: null,
          oldPrice: null,
          salePercentage: null,
        },
  });
  useEffect(() => {
    if (initialData) {
      form.reset({
        ...initialData,
        categories: initialData.categories.map((category) => category._id),
      });
    }
  }, [initialData, form]);
  useEffect(() => {
    const price = form.watch("price");
    const salePercentage = form.watch("salePercentage");
    if (price && salePercentage != null) {
      const oldPrice = price / (1 - salePercentage / 100);
      const roundedOldPrice =
        oldPrice > 500
          ? Math.ceil(oldPrice / 1000) * 1000
          : Math.floor(oldPrice / 1000) * 1000;
      form.setValue("oldPrice", roundedOldPrice);
    } else {
      form.setValue("oldPrice", null);
    }
  }, [form.watch("price"), form.watch("salePercentage")]);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/products/${initialData._id}`
        : "/api/products";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        toast.success('Tạo Thành Công')
        window.location.href = "/products";

      }
    } catch (err) {
      console.error("server fail", err);
    } finally {
      setLoading(false);
    }
  }
  const router = useRouter();
  return (
    <div>
      <TitleHeader title="tạo mới sản phẩm" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu Đề </FormLabel>
                <FormControl>
                  <Input placeholder="Tiêu đề sản phẩm ..." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Mô tả sản phẩm ..."
                    {...field}
                    rows={5}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid grid-cols-3 gap-5">
            {categories.length > 0 && (
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Danh mục </FormLabel>
                    <FormControl>
                      <MultiSelect
                        placeholder="Danh mục"
                        categories={categories}
                        value={field.value}
                        onChange={(_id) =>
                          field.onChange([...field.value, _id])
                        }
                        onRemove={(idToRemove) =>
                          field.onChange([
                            ...field.value.filter(
                              (categoryId) => categoryId !== idToRemove
                            ),
                          ])
                        }
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="material"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chất liệu </FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Chất liệu sản phẩm ..."
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Từ Khóa </FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Nhập từ khóa..."
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:grid grid-cols-3 gap-5">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Giá sản phẩm ..."
                      {...field}
                      value={field.value || ""}
                      onKeyDown={handleKeyDown}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salePercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giảm giá (%)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Giảm giá sản phẩm theo % ..."
                      {...field}
                      value={field.value || ""}
                      onKeyDown={handleKeyDown}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="oldPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá cũ </FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      placeholder="Giá cũ được tính tự động"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="media"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Ảnh</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={(url) => field.onChange([...field.value, url])}
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((image) => image !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <Button type="submit">{initialData ? "cập nhật" : "Tạo"}</Button>
            <Button type="button" onClick={() => router.push("/products")}>
              Hủy
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
