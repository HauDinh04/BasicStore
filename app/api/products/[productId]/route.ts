import Categories from "@/lib/models/Category";
import Products from "@/lib/models/Product";
import { ConnectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await ConnectToDB();
    const product = await Products.findByIdAndDelete(params.productId);
    if (!product) {
      console.log("[product not found");
      return new NextResponse("server err", { status: 404 });
    }
    await Categories.updateMany(
      { products: params.productId },
      { $pull: { products: params.productId } }
    );
    return new NextResponse("[DELETED_product]", { status: 200 });
  } catch (err) {
    console.log("[DELETE_product]", err);
    return new NextResponse("server err", { status: 500 });
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await ConnectToDB();
    const res = await Products.findById(params.productId).populate({
      path: "categories",
      model: Categories,
    });
    if (!res) {
      return new NextResponse(
        JSON.stringify({ message: "category not found" }),
        { status: 404 }
      );
    }
    return NextResponse.json(res, { status: 200 });
  } catch (err) {
    console.log("[GET_product_error]", err);
    return new NextResponse(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
};
export const POST = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await ConnectToDB();
    const existingProduct = await Products.findById(params.productId);
    if (!existingProduct) {
      console.log("[not found this product");
    }
    const {
      title,
      media,
      description,
      price,
      oldPrice,
      tags,
      salePercentage,
      material,
      categories,
    } = await req.json();
    if (!title || !media || !price || !material || !categories) {
      return new NextResponse("cant not update ", { status: 400 });
    }
    const oldCategories = existingProduct.categories || [];
    await Categories.updateMany(
      { _id: { $in: oldCategories } },
      {
        $pull: { products: params.productId },
      }
    );
    await Categories.updateMany(
      { _id: { $in: categories } },
      { $addToSet: { products: params.productId } }
    );
    const updateProduct = await Products.findByIdAndUpdate(
      params.productId,
      {
        title,
        media,
        description,
        price,
        oldPrice,
        tags,
        salePercentage,
        material,
        categories,
      },
      { new: true }
    );

    return NextResponse.json(updateProduct, { status: 201 });
  } catch (err) {
    console.log("[update_product]", err);
  }
};
