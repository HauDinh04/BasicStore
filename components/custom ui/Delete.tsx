"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Trash, TrashIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface deleteProps {
  id: string;
  item: string;
}
const Delete: React.FC<deleteProps> = ({ id, item }) => {
  const [loading, setLoading] = useState(false);
  const deleteId = async () => {
    const itemType = item === "product" ? "products" : "categories";
    try {
      setLoading(true);
      const res = await fetch(`/api/${itemType}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        window.location.href = `/${itemType}`;
        toast({
          variant: "default",
          title: "Hành động đã được thực hiện",
        });
        setLoading(false);
      }
    } catch (err) {
      console.log(err),
        toast({
          variant: "destructive",
          title: "Uh oh! Không được rồi",
          description: "Có gì đó sai sai ở yêu cầu của bạn",
        });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-md">
            <TrashIcon className="h-5 w-5" />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">
              Có chắc không dợ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Sau khi thực hiện hành động này thì sẽ không thể quay trở lại !
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={deleteId}>Tiếp tục</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Delete;
