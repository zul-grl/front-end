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
import { Plus, X, MoreVertical, Edit, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FoodCategory } from "@/app/_util/type";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DishesCategory = ({
  setSelectedCategory,
}: {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState<string>("");
  const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null);

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

  useEffect(() => {
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
      fetchData();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleEditCategory = async () => {
    try {
      if (!editCategoryId || !editCategoryName.trim()) {
        alert("Category name cannot be empty");
        return;
      }
      const response = await axios.patch<{ category: FoodCategory }>(
        `http://localhost:4000/food-category/${editCategoryId}`,
        {
          categoryName: editCategoryName,
        }
      );
      setCategories(
        categories.map((cat) =>
          cat._id === editCategoryId ? response.data.category : cat
        )
      );
      fetchData();
      setEditCategoryId(null);
      setEditCategoryName("");
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      if (!deleteCategoryId) return;
      await axios.delete(
        `http://localhost:4000/food-category/${deleteCategoryId}`
      );
      setCategories(categories.filter((cat) => cat._id !== deleteCategoryId));
      setDeleteCategoryId(null);
      fetchData();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
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
            asChild
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
              <div key={index} className="relative">
                <ToggleGroupItem
                  className="bg-white text-black rounded-full py-3 px-7 border data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-white"
                  value={category?._id}
                >
                  {category?.categoryName}
                </ToggleGroupItem>
                <div className="absolute right-[2px] top-[6px]">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 p-0 ml-2"
                        asChild
                      >
                        <div>
                          <MoreVertical className="h-4 w-4" />
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {
                          setEditCategoryId(category?._id);
                          setEditCategoryName(category?.categoryName);
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeleteCategoryId(category?._id)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
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
      <AlertDialog
        open={!!editCategoryId}
        onOpenChange={(open) => {
          if (!open) {
            setEditCategoryId(null);
            setEditCategoryName("");
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-between">
              <AlertDialogTitle>Edit Category</AlertDialogTitle>
              <AlertDialogCancel className="rounded-full p-2">
                <X />
              </AlertDialogCancel>
            </div>
          </AlertDialogHeader>
          <Input
            type="text"
            placeholder="Category Name"
            value={editCategoryName}
            onChange={(e) => setEditCategoryName(e.target.value)}
          />

          <AlertDialogFooter>
            <AlertDialogAction onClick={handleEditCategory}>
              Save
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        open={!!deleteCategoryId}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteCategoryId(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              category.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCategory}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DishesCategory;
