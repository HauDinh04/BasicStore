import { Calendar, Home, Inbox, ListOrdered, Search, Settings, User, UserRoundCog } from "lucide-react";

export const navLink = [
  {
    title: "Bảng Điều Khiển",
    url: "/",
    icon: Home,
  },
  {
    title: "Danh Mục Sản Phẩm",
    url: "/categories",
    icon: Inbox,
  },
  {
    title: "Sản Phẩm",
    url: "/products",
    icon: Calendar,
  },
  {
    title: "Khách Hàng",
    url: "/customers",
    icon: User,
  },
  {
    title: "Đơn Hàng",
    url: "/orders",
    icon: ListOrdered,
  },
  {
    title: "Nhân Viên",
    url: "/staffs",
    icon: UserRoundCog,
  },
];
