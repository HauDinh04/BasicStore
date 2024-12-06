import Categories from "@/lib/models/Category";
import Products from "@/lib/models/Product";
import { ConnectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) => {
  try {
    await ConnectToDB();
    const res = await Categories.findById(params?.categoryId);
    if (!res) {
      return new NextResponse(
        JSON.stringify({ message: "category not found" })
      );
    }
    return NextResponse.json(res, { status: 200 });
  } catch (err) {
    console.log("[GET category with id]", err);
    return new NextResponse("server error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) => {
  try {
    await ConnectToDB();
    await Categories.findByIdAndDelete(params.categoryId);
    console.log("Deleted category from mongoDB with ID:", params.categoryId);

    return new NextResponse("Category is deleted", { status: 200 });
  } catch (err) {
    console.log("[DELETE_categoryId]", err);
    return new NextResponse("server err", { status: 500 });
  }
};
export const POST = async (
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) => {
  try {
    await ConnectToDB();
    const findId = await Categories.findById(params.categoryId);
    if (!findId) {
      console.log("[this id category is not found]");
      return new NextResponse("Not found categories", { status: 404 });
    }
    const { title, description, image} = await req.json();
    if (!title || !image) {
      return new NextResponse("title and image is require", { status: 400 });
    }

    const updateCategory = await Categories.findByIdAndUpdate(
      params.categoryId,
      { title, description, image },
      { new: true }
    );
    
    return NextResponse.json(updateCategory, { status: 200 });
  } catch (err) {
    console.log("[UPDATE fail]", err);
  }
};
