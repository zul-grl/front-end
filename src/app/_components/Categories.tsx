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
    <div>
      <ToggleGroup type="single" className="flex gap-5">
        <ToggleGroupItem
          className="bg-white text-black rounded-full data-[state=on]:bg-red-500 data-[state=on]:text-white"
          value="all"
          onClick={() => handleCategoryClick("all")}
        >
          All dishes
        </ToggleGroupItem>
        {categories.map((category: FoodCategory) => (
          <ToggleGroupItem
            key={category._id}
            className="bg-white text-black rounded-full data-[state=on]:bg-red-500 data-[state=on]:text-white"
            value={category._id}
            onClick={() => handleCategoryClick(category._id)}
          >
            {category.categoryName}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default Categories;
