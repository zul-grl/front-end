"use client";
import { FoodCategory } from "@/app/_util/type";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ categories: FoodCategory[] }>(
          "http://localhost:4000/food-category"
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/menu?category=${categoryId}`);
  };

  return (
    <ToggleGroup type="single" className="flex flex-wrap mt-3 gap-2">
      {categories.map((category: FoodCategory) => (
        <ToggleGroupItem
          key={category._id}
          className="bg-white text-black rounded-full data-[state=on]:bg-red-500 px-6 py-3 data-[state=on]:text-white"
          value={category._id}
          onClick={() => handleCategoryClick(category._id)}
        >
          {category.categoryName}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default Categories;
