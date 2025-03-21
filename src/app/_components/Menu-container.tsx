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
        <div className="max-w-[1340px] flex flex-col m-auto ">
          {categories.map((cat) => (
            <div key={cat._id}>
              <h2 className="text-2xl font-bold text-white p-5">
                {cat.categoryName}
              </h2>
              <div className="flex flex-wrap max-w-[1340px] gap-5 p-4">
                {foods
                  .filter((food) => food.category._id === cat._id)
                  .map((food) => (
                    <div key={food._id}>
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
        <div className="max-w-[1340px] m-auto flex flex-wrap gap-4 p-4">
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
      )}
    </>
  );
};

export default MenuContainer;
