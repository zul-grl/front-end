"use client";

import { useState } from "react";
import DishesCategory from "../components/DishesCategory";
import FoodList from "../components/FoodList";

const AdminPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "all"
  );
  return (
    <div className="flex flex-col gap-3 p-10 bg-secondary w-full">
      <DishesCategory setSelectedCategory={setSelectedCategory} />
      <FoodList selectedCategory={selectedCategory} />
    </div>
  );
};

export default AdminPage;
