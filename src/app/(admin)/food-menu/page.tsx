"use client";

import { useState } from "react";
import DishesCategory from "../components/DishesCategory";
import FoodList from "../components/FoodList";

const AdminPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>("all");
  const [foodCounts, setFoodCounts] = useState<{ [key: string]: number }>({});

  return (
    <div className="flex flex-col gap-3 p-10  w-full">
      <DishesCategory setSelectedCategory={setSelectedCategory} foodCounts={foodCounts} />
      <FoodList selectedCategory={selectedCategory} setFoodCounts={setFoodCounts} />
    </div>
  );
};

export default AdminPage;