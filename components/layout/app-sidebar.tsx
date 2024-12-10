"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,

  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { navLink } from "@/constants/sideBar";
import { ChevronDown, ChevronUp} from "lucide-react";
import { Collapsible } from "../ui/collapsible";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
export function AppSidebar() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "UserName";
  const handleLogOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <Sidebar className="shadow-xl ">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    Lựa chọn ngôn ngữ
                    <ChevronDown className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                  <DropdownMenuItem>
                    <span>Tiếng Việt</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>English language</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="flex flex-col items-center mt-4 ">
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navLink.map((item) => (
                    <SidebarMenuItem
                      key={item.title}
                      className="flex py-3 text-center"
                    >
                      <SidebarMenuButton
                        asChild
                        className="flex items-center text-left"
                      >
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </Collapsible>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <div className="flex justify-between">
                      <h3 className="font-semibold">Hello:</h3>
                      <span>{userName}</span>
                      
                    </div>

                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <Link href={"/profile"}>
                      <span>Tài Khoản</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <a onClick={handleLogOut}>Đăng Xuất</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={"/register"}>
                      <span>Đăng Kí</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
