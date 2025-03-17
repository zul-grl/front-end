"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import { FoodCategory, FoodItem } from "@/app/_util/type";
import AddDishDialog from "./DishForm";
import DishInfo from "./DishInfo";
import Image from "next/image";

const FoodList = ({
  selectedCategory,
}: {
  selectedCategory: string | null;
}) => {
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const fetchData = async () => {
    try {
      const categoriesResponse = await axios.get<{
        categories: FoodCategory[];
      }>("http://localhost:4000/food-category");
      setCategories(categoriesResponse.data.categories);
      const foodsResponse = await axios.get<{
        message: string;
        allFood: FoodItem[];
      }>("http://localhost:4000/food");
      console.log("Foods Response:", foodsResponse.data);
      setFoods(foodsResponse.data.allFood);
    } catch (error) {
      console.error(error);
      setFoods([]);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const displayedCategories =
    selectedCategory === "all" || !selectedCategory
      ? categories
      : categories.filter((cat) => cat._id === selectedCategory);

  return (
    <div className="p-4 flex flex-col gap-3 rounded-xl bg-white ">
      {displayedCategories.map((cat) => (
        <div key={cat._id} className="space-y-4">
          <h4 className="text-xl font-bold">{cat.categoryName}</h4>
          <div className="flex flex-wrap gap-4">
            <div className="w-[260px] h-[240px]">
              <AddDishDialog category={cat.categoryName} categoryId={cat._id} />
            </div>
            {foods
              .filter((food) => food.category._id === cat._id)
              .map((food) => (
                <div
                  key={food._id}
                  className="p-4 border-2 rounded-3xl bg-[#FFFFFF] w-[260px] h-[240px]"
                >
                  <div className="relative">
                    <Image
                      alt=""
                      width={1000}
                      height={1000}
                      className="h-[130px] w-[100%] mb-2 object-cover rounded-2xl "
                      src={food.image}
                    />
                    <DishInfo food={food} fetchData={fetchData} />
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <p className="text-red-500 font-semibold text-sm">
                        {food.foodName}
                      </p>
                      <p className="text-black text-sm">${food.price}</p>
                    </div>
                    <p className="text-black text-xs">{food.ingredients}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodList;
