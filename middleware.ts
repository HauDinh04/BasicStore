import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
const adminRoutes = [
  "/",
  "/products",
  "/product/new",
  "/product/[id]",
  "/categories",
  "/categories/new",
  "/categories/[id]",
  "/customer",
  "/customer/[id]",
  "/order",
  "/order/[id]",
  "/staff",
  "/staff/[id]",
];
const creatorRoutes = ["/products/new", "categories/new"];
const editorRoutes = ["/products/[id]", "/categories/[id]"];
const viewerRoutes = [
  "/",
  "/products",
  "/categories",
  "/customers",
  "/orders",
  "/staffs",
];
export default withAuth(
  async function middleWare(req) {
    const token = req.nextauth?.token;
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    const userRole = token.role;
    const url = req.nextUrl.pathname;
    console.log("Token:", token);
    console.log("User role:", userRole);
    console.log("Requested URL:", url);
    
  },
  {
    pages: {
      signIn: "/login",
      error: "/login",
    },
  }
);
export const config = {
  matcher: [
    "/",
    "/categories/:path*",
    "/products/:path*",
    "/customer",
    "/order/:path*",
    "/staff/:path*",
  ],
};
