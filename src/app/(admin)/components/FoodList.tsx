"use client";

import { useEffect } from "react";
import AddDishDialog from "./DishForm";
import DishInfo from "./DishInfo";
import Image from "next/image";
import { useCategory } from "@/app/_context/CategoryContext";
import { useFood } from "@/app/_context/FoodContext";

interface FoodListProps {
  selectedCategory: string | null;
  setFoodCounts: (counts: { [key: string]: number }) => void;
}

const FoodList = ({ selectedCategory, setFoodCounts }: FoodListProps) => {
  const { categories, fetchCategories } = useCategory();
  const { foods, fetchFoodData, setFoods } = useFood();

  const fetchData = async () => {
    try {
      fetchCategories();
      fetchFoodData();
    } catch (error) {
      console.error(error);
      setFoods([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const counts: { [key: string]: number } = {};
    categories.forEach((cat) => {
      counts[cat._id] = foods.filter(
        (food) => food.category._id === cat._id
      ).length;
    });
    setFoodCounts(counts);
  }, [categories, foods, setFoodCounts]);

  const displayedCategories =
    selectedCategory === "all" || !selectedCategory
      ? categories
      : categories.filter((cat) => cat._id === selectedCategory);

  return (
    <div className="p-4 flex flex-col gap-3 rounded-xl bg-white ">
      {displayedCategories.map((cat) => (
        <div key={cat._id} className="space-y-4">
          <h4 className="text-xl font-bold">
            {cat.categoryName}(
            {foods.filter((food) => food.category._id === cat._id).length})
          </h4>
          <div className="flex flex-wrap gap-4">
            <div className="w-[260px] h-[240px]">
              <AddDishDialog
                category={cat.categoryName}
                categoryId={cat._id}
                fetchData={fetchData}
              />
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
