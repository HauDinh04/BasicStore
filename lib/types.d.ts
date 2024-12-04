type CategoryType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
  createdAt: Date;
  updatedAt: Date;
};
type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  categories: CategoryType[];
  tags: [string];
  material: [string];
  price: number;
  oldPrice: number;
  salePercentage: number;
  createdAt: Date;
  updatedAt: Date;
};
type UserType = {
  _id: string;
  useName:string,
  email: string;
  password: string;
  role: "admin" | "viewer" | "creator" | "editor";
  createdAt: Date;
};
