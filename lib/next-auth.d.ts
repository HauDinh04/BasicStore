// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    role: string;
    userName: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      name: string;
    };
  }

  interface JWT {
    id: string;
    role: string;
    userName:string;
  }
}
