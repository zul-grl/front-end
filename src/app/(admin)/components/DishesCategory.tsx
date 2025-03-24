"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, X, Edit, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FoodCategory } from "@/app/_util/type";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCategory } from "@/app/_context/CategoryContext";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

type CategoryFormData = {
  categoryName: string;
};

const DishesCategory = ({
  setSelectedCategory,
  foodCounts,
}: {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
  foodCounts: { [key: string]: number };
}) => {
  const [dialogState, setDialogState] = useState<{
    type: "add" | "edit" | "delete" | null;
    categoryId: string | null;
  }>({ type: null, categoryId: null });
  const { register, handleSubmit, reset, setValue } = useForm<CategoryFormData>(
    {
      defaultValues: {
        categoryName: "",
      },
    }
  );

  const { categories, fetchCategories } = useCategory();
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (dialogState.type === "edit" && dialogState.categoryId) {
      const category = categories.find(
        (cat) => cat._id === dialogState.categoryId
      );
      if (category) {
        setValue("categoryName", category.categoryName);
      }
    } else {
      reset({ categoryName: "" });
    }
  }, [dialogState, categories, setValue, reset]);

  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (!data.categoryName.trim()) {
        alert("Category name cannot be empty");
        return;
      }

      if (dialogState.type === "add") {
        await axios.post<{ category: FoodCategory }>(
          "https://food-delivery-back-end-r6wt.onrender.com/food-category",
          { categoryName: data.categoryName }
        );
      } else if (dialogState.type === "edit" && dialogState.categoryId) {
        await axios.patch<{ category: FoodCategory }>(
          `https://food-delivery-back-end-r6wt.onrender.com/food-category/${dialogState.categoryId}`,
          { categoryName: data.categoryName }
        );
      }
      fetchCategories();
      closeDialog();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (!dialogState.categoryId) return;

      await axios.delete(
        `https://food-delivery-back-end-r6wt.onrender.com/food-category/${dialogState.categoryId}`
      );

      await fetchCategories();
      closeDialog();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const closeDialog = () => {
    setDialogState({ type: null, categoryId: null });
    reset();
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
                <ContextMenu>
                  <ContextMenuTrigger asChild>
                    <ToggleGroupItem
                      className="bg-white text-black rounded-full py-3 px-3 border data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-white"
                      value={category?._id}
                    >
                      {category?.categoryName}{" "}
                      <span className="bg-black text-white rounded-full px-3 py-1 ml-2 text-xs">
                        {foodCounts[category._id] || 0}
                      </span>
                    </ToggleGroupItem>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem
                      onClick={() =>
                        setDialogState({
                          type: "edit",
                          categoryId: category?._id,
                        })
                      }
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </ContextMenuItem>
                    <ContextMenuItem
                      onClick={() =>
                        setDialogState({
                          type: "delete",
                          categoryId: category?._id,
                        })
                      }
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </div>
            ))}
          </ToggleGroup>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="rounded-full hover:bg-red-600 bg-red-600"
                variant="default"
                size="icon"
                onClick={() =>
                  setDialogState({ type: "add", categoryId: null })
                }
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  type="text"
                  placeholder="Category Name"
                  {...register("categoryName")}
                />
                <AlertDialogFooter className="mt-4">
                  <AlertDialogAction type="submit">Add</AlertDialogAction>
                </AlertDialogFooter>
              </form>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <AlertDialog
        open={dialogState.type === "edit"}
        onOpenChange={(open) => {
          if (!open) closeDialog();
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              placeholder="Category Name"
              {...register("categoryName")}
            />
            <AlertDialogFooter className="mt-4">
              <AlertDialogAction type="submit">Save</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={dialogState.type === "delete"}
        onOpenChange={(open) => {
          if (!open) closeDialog();
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
            <AlertDialogCancel onClick={closeDialog}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DishesCategory;
