"use client";

import { useState } from "react";
import DishesCategory from "../components/DishesCategory";
import FoodList from "../components/FoodList";

const AdminPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "all"
  );
  return (
    <div className="container flex flex-col gap-3 p-8 bg-secondary">
      <DishesCategory setSelectedCategory={setSelectedCategory} />
      <FoodList selectedCategory={selectedCategory} />
    </div>
  );
};

export default AdminPage;
