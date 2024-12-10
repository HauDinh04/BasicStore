import Users from "@/lib/models/User";
import { ConnectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export const POST = async (req: NextRequest) => {
  try {
    const { userName, email, password, role } = await req.json();
    if (!userName || !email || !password) {
      return new NextResponse("chưa đủ điều kiện tạo đăng kí");
    }
    await ConnectToDB();
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      
      return new NextResponse("Email đã tồn tại", { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = await Users.create({
      userName,
      email,
      password: hashedPassword,
      role,
    });
    return NextResponse.json(createUser, { status: 201 });
  } catch (err) {
    
    console.log("[POST_register]", err);
    return new NextResponse("server err", { status: 500 });
  }
};
