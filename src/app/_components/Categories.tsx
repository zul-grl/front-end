"use client";
import { FoodCategory } from "@/app/_util/type";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useCategory } from "../_context/CategoryContext";

const Categories = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const { categories, fetchCategories } = useCategory();

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/menu?category=${categoryId}`);
  };

  return (
    <ToggleGroup
      type="single"
      className="flex flex-wrap mt-3 gap-2"
      value={selectedCategory || ""}
    >
      {categories?.map((category: FoodCategory) => (
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
