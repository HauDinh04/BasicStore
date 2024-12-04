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
import { useState } from "react";
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
  image: z.string().url({ message: "Yêu cầu cần hình ảnh" }),
});
interface initialDataProps {
  initialData?: CategoryType | null;
}
const CategoryForm: React.FC<initialDataProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: "",
          description: "",
          image: "",
        },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/categories/${initialData._id}`
        : "/api/categories";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        window.location.href = "/categories";
      }
    } catch (err) {
      console.error("server fail", err);
    }
  }
  const router = useRouter();
  return (
    <div>
      <TitleHeader title="tạo mới danh mục" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu Đề </FormLabel>
                <FormControl>
                  <Input placeholder="Tiêu đề danh mục ..." {...field} />
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
                    placeholder="Mô tả danh mục ..."
                    {...field}
                    rows={5}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Ảnh</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <Button type="submit">{initialData ? "cập nhật" : "Tạo"}</Button>
            <Button type="submit" onClick={() => router.push("/categories")}>
              Hủy
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;
