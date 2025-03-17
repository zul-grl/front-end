"use client";

import { FoodItem } from "@/app/_util/type";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "./Card";

const MenuContainer = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ allFood: FoodItem[] }>(
          "http://localhost:4000/food"
        );
        setFoods(response.data.allFood);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const filteredFoods =
    selectedCategory === "all" || !selectedCategory
      ? foods
      : foods.filter((food) => food.category._id === selectedCategory);

  return (
    <div className="max-w-[1340px] m-auto flex flex-wrap justify-center gap-4 p-4">
      {filteredFoods.map((food) => (
        <Card
          key={food._id}
          id={food._id}
          image={food.image}
          ingredients={food.ingredients}
          name={food.foodName}
          category={food.category.categoryName}
          price={food.price}
        />
      ))}
    </div>
  );
};

export default MenuContainer;
