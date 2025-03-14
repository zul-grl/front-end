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
  price: number;
  image: string;
  ingredients: string;
  createdAt: Date;
  updatedAt: Date;
};
