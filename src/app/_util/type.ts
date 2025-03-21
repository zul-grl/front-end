export type FoodCategory = {
  _id: string;
  categoryName: string;
  createdAt?: string;
  updatedAt?: string;
};
export type FoodItem = {
  _id: string;
  foodName: string;
  category: FoodCategory;
  price: string;
  image: string;
  ingredients: string;
  createdAt: string;
  updatedAt: string;
};
export type FoodOrderType = {
  _id: string;
  user: UserType;
  totalPrice: number;
  status: string;
  foodOrderItems: foodOrderItemsType[];
  createdAt: string;
  updatedAt: string;
};
export type UserType = {
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
  role: "USER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
};
export type foodOrderItemsType = {
  food: FoodItem;
  quantity: number;
};
