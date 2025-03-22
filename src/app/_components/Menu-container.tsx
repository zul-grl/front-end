"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Card from "./Card";
import { useCategory } from "../_context/CategoryContext";
import { useFood } from "../_context/FoodContext";

const MenuContainer = () => {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const { categories, fetchCategories } = useCategory();
  const { foods, fetchFoodData } = useFood();
  const fetchData = async () => {
    try {
      fetchCategories();
      fetchFoodData();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const filteredFoods =
    selectedCategory === selectedCategory
      ? foods.filter((food) => food.category._id === selectedCategory)
      : foods;
  return (
    <>
      {!selectedCategory ? (
        <div className="max-w-[1340px] flex flex-col m-auto px-2 sm:px-4">
          {categories.map((cat) => (
            <div key={cat._id}>
              <h2 className="text-xl sm:text-2xl font-bold text-white p-3 sm:p-5">
                {cat.categoryName}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-[1340px] gap-3 sm:gap-5 p-2 sm:p-4">
                {foods
                  .filter((food) => food.category._id === cat._id)
                  .map((food) => (
                    <div
                      key={food._id}
                      className="w-full max-w-[397px] mx-auto"
                    >
                      <Card
                        key={food._id}
                        id={food._id}
                        image={food.image}
                        ingredients={food.ingredients}
                        name={food.foodName}
                        category={food.category.categoryName}
                        price={food.price}
                      />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-[1340px] m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 p-2 sm:p-4">
          {filteredFoods.map((food) => (
            <div key={food._id} className="w-full max-w-[397px] mx-auto">
              <Card
                key={food._id}
                id={food._id}
                image={food.image}
                ingredients={food.ingredients}
                name={food.foodName}
                category={food.category.categoryName}
                price={food.price}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MenuContainer;
