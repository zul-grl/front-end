"use client";
import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";
import { FoodItem } from "../_util/type";
const foodContext = createContext<foodContextType>({} as foodContextType);
export const useFood = () => {
  return useContext(foodContext);
};
type foodContextType = {
  foods: FoodItem[];
  fetchFoodData: () => void;
  setFoods: (_foods: FoodItem[]) => void;
};
const FoodProvider = ({ children }: { children: ReactNode }) => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const fetchFoodData = async () => {
    try {
      const response = await axios.get<{ allFood: FoodItem[] }>(
        "https://food-delivery-back-end-r6wt.onrender.com/food"
      );
      setFoods(response.data.allFood);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <foodContext.Provider value={{ foods, fetchFoodData, setFoods }}>
      {children}
    </foodContext.Provider>
  );
};
export default FoodProvider;
