import Categories from "@/lib/models/Category";
import Products from "@/lib/models/Product";
import { ConnectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await ConnectToDB();
    const res = await Products.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "categories" ,model:Categories});
    return NextResponse.json(res, { status: 200 });
  } catch (err) {
    console.log("[GET_product]", err);
    return new NextResponse("server err", { status: 500 });
  }
};
export const POST = async (req: NextRequest) => {
  try {
    await ConnectToDB();
    const {
      title,
      description,
      media,
      categories,
      tags,
      price,
      oldPrice,
      material,
      salePercentage,
    } = await req.json();
    const createProduct = await Products.create({
      title,
      description,
      media,
      categories,
      tags,
      price,
      oldPrice,
      material,
      salePercentage,
    });
    await Promise.all(
      categories.map(async (categoryId: string) => {
        await Categories.findByIdAndUpdate(
          categoryId,
          { $push: { products: createProduct._id } },
          { new: true }
        );
      })
    );
    await createProduct.save();
    return NextResponse.json(createProduct, { status: 200 });
  } catch (err) {
    console.log("[post_product]", err);
    return new NextResponse("server err", { status: 500 });
  }
};
