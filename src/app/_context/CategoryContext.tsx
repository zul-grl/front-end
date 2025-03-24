"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { FoodCategory } from "../_util/type";
import axios from "axios";
const categoryContext = createContext<categoryContextType>(
  {} as categoryContextType
);
export const useCategory = () => {
  return useContext(categoryContext);
};
type categoryContextType = {
  categories: FoodCategory[];
  fetchCategories: () => void;
};
const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const fetchCategories = async () => {
    try {
      const response = await axios.get<{ categories: FoodCategory[] }>(
        "https://food-delivery-back-end-r6wt.onrender.com/food-category"
      );
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  return (
    <categoryContext.Provider value={{ categories, fetchCategories }}>
      {children}
    </categoryContext.Provider>
  );
};
export default CategoryProvider;
