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
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { FoodItem } from "@/app/_util/type";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pen, Trash, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategory } from "@/app/_context/CategoryContext";

const formSchema = z.object({
  foodName: z.string().min(1, "Dish name is required"),
  category: z.string().min(1, "Category is required"),
  price: z.string().min(1, "Price is required"),
  ingredients: z.string().min(1, "Ingredients are required"),
  image: z.union([z.instanceof(File), z.string()]).optional(),
});

const DishInfo = ({
  food,
  fetchData,
}: {
  food: FoodItem;
  fetchData: () => void;
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const PRESET_NAME = "food-delivary-app";
  const CLOUDINARY_NAME = "dzb3xzqxv";
  const { categories, fetchCategories } = useCategory();

  useEffect(() => {
    fetchCategories();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodName: food?.foodName || "",
      price: food?.price || "",
      ingredients: food?.ingredients || "",
      category: food?.category._id || "",
      image: food?.image || "",
    },
  });

  useEffect(() => {
    if (food) {
      form.setValue("foodName", food.foodName);
      form.setValue("ingredients", food.ingredients);
      form.setValue("price", food.price.toString());
      form.setValue("category", food.category._id);
      if (food.image) {
        setImagePreview(food.image);
      }
    }
  }, [food, form]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      const tempImageUrl = URL.createObjectURL(file);
      setImagePreview(tempImageUrl);
    }
  };

  const uploadImage = async (file: File) => {
    const imageData = new FormData();
    imageData.append("file", file);
    imageData.append("upload_preset", PRESET_NAME);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
        imageData
      );
      fetchData();
      return response.data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setOpen(false);
    try {
      const imageUrl =
        values.image instanceof File
          ? await uploadImage(values.image)
          : values.image;
      const dishData = {
        foodName: values.foodName,
        category: values.category,
        price: values.price,
        ingredients: values.ingredients,
        image: imageUrl,
      };
      await axios.patch(
        `https://food-delivery-back-end-r6wt.onrender.com/food/${food._id}`,
        dishData
      );
      form.reset();
      fetchData();
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to update the dish.");
    }
  };

  const handleDeleteFood = async () => {
    try {
      await axios.delete(
        `https://food-delivery-back-end-r6wt.onrender.com/food/${food._id}`
      );
      setOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          className="rounded-full absolute bottom-2 right-2"
          variant={"outline"}
          onClick={() => setOpen(true)}
        >
          <Pen color="red" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Dishes info</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="foodName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel className="text-[#71717A] text-xs">
                      Dish Name
                    </FormLabel>
                    <FormControl className="w-[280px]">
                      <Input placeholder="Enter dish name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel className="text-[#71717A] text-xs">
                      Category
                    </FormLabel>
                    <FormControl className="w-[280px]">
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat._id} value={cat._id}>
                              {cat.categoryName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel className="text-[#71717A] text-xs">
                      Price ($)
                    </FormLabel>
                    <FormControl className="w-[280px] ">
                      <Input
                        type="text"
                        placeholder="Enter price"
                        {...field}
                        className="focus:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel className="text-[#71717A] text-xs">
                      Ingredients
                    </FormLabel>
                    <FormControl className="w-[280px]">
                      <Textarea
                        placeholder="Enter ingredients"
                        {...field}
                        className="h-20"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel className="text-[#71717A] text-xs">
                      Image
                    </FormLabel>
                    {imagePreview ? (
                      <div className="relative w-full h-[160px] rounded-md overflow-hidden">
                        <Image
                          alt="Uploaded"
                          width={1000}
                          height={1000}
                          className="h-[160px] w-[280px] ml-20 object-cover rounded-2xl overflow-hidden"
                          src={imagePreview}
                        />
                        <Button
                          size={"icon"}
                          className="rounded-full absolute top-2 right-2"
                          variant={"outline"}
                          onClick={() => {
                            setImagePreview("");
                          }}
                        >
                          <X />
                        </Button>
                      </div>
                    ) : (
                      <FormControl>
                        <div className="border-2 border-dashed border-gray-300 p-4 text-center w-[280px] h-[160px] rounded-2xl">
                          <input
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                            id="image-upload"
                          />
                          <label
                            htmlFor="image-upload"
                            className="cursor-pointer"
                          >
                            <p className="text-sm text-gray-500">
                              Click to upload an image
                            </p>
                          </label>
                        </div>
                      </FormControl>
                    )}
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-between space-x-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button id="close-dialog" variant="outline" size={"icon"}>
                    <Trash color="red" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the category.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteFood}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button
                type="submit"
                className="bg-black hover:shadow-md text-white"
              >
                Save changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DishInfo;
