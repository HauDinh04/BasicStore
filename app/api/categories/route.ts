import Categories from "@/lib/models/Category";
import { ConnectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await ConnectToDB();
    const { title, description, image, products } = await req.json();
    const category = await Categories.create({
      title,
      description,
      image,
      products,
    });
    const newCategory = category.save();

    return NextResponse.json(newCategory, { status: 200 });
  } catch (err) {
    console.log("[POST_category]:", err);
    return new NextResponse("Fail", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await ConnectToDB();
    const res = await Categories.find().sort({ createdAt: "desc" });
    return NextResponse.json(res, { status: 200 });
  } catch (err) {
    console.log("[GET_categories]", err);
    return new NextResponse("server fail", { status: 500 });
  }
};
