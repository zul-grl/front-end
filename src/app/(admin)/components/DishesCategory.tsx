"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FoodCategory } from "@/app/_util/type";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const DishesCategory = ({
  setSelectedCategory,
}: {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const [newCategoryName, setNewCategoryName] = useState<string>("");

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

  const handleAddCategory = async () => {
    try {
      if (!newCategoryName.trim()) {
        alert("Category name cannot be empty");
        return;
      }
      const response = await axios.post<{ category: FoodCategory }>(
        "http://localhost:4000/food-category",
        {
          categoryName: newCategoryName,
        }
      );
      setCategories([...categories, response.data.category]);
      setNewCategoryName("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="rounded-xl flex flex-col gap-4 bg-white p-6">
        <h4 className="font-semibold">Dishes category</h4>
        <div className="flex flex-wrap gap-2">
          <ToggleGroup
            type="single"
            className="flex justify-start flex-wrap gap-2"
            onValueChange={(value) => setSelectedCategory(value)}
          >
            <ToggleGroupItem
              className="bg-white text-black rounded-full border data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-white"
              value="all"
            >
              All dishes
            </ToggleGroupItem>
            {categories.map((category: FoodCategory, index: number) => (
              <ToggleGroupItem
                key={index}
                className="bg-white text-black rounded-full border data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-white"
                value={category._id}
              >
                {category.categoryName}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="rounded-full hover:bg-red-600 bg-red-600"
                variant="default"
                size="icon"
              >
                <Plus />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <div className="flex justify-between">
                  <AlertDialogTitle>Add New Category</AlertDialogTitle>
                  <AlertDialogCancel className="rounded-full p-2">
                    <X />
                  </AlertDialogCancel>
                </div>
              </AlertDialogHeader>
              <Input
                type="text"
                placeholder="Category Name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />

              <AlertDialogFooter>
                <AlertDialogAction onClick={handleAddCategory}>
                  Add
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default DishesCategory;
