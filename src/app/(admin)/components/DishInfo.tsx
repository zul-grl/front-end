"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { FoodCategory, FoodItem } from "@/app/_util/type";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pen, Plus } from "lucide-react";
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

const formSchema = z.object({
  foodName: z.string().min(1, "Dish name is required"),
  category: z.string().min(1, "Category is required"),
  price: z.string().min(1, "Price is required"),
  ingredients: z.string().min(1, "Ingredients are required"),
  image: z.instanceof(File).optional(),
});

interface AddDishDialogProps {
  category: string;
  categoryId: string;
}

const DishInfo = ({ food }: { food: FoodItem }) => {
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const PRESET_NAME = "food-delivary-app";
  const CLOUDINARY_NAME = "dzb3xzqxv";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get<{
          categories: FoodCategory[];
        }>("http://localhost:4000/food-category");
        setCategories(categoriesResponse.data.categories);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (food) {
      form.setValue("foodName", food.foodName);
    }
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodName: food?.foodName,
      price: food?.price,
      ingredients: food?.ingredients,
      category: food?.category?.categoryName,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      setImagePreview(URL.createObjectURL(file));
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
      return response.data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const imageUrl = values.image ? await uploadImage(values.image) : null;

    const dishData = {
      foodName: values.foodName,
      category: values.category,
      price: values.price,
      ingredients: values.ingredients,
      image: imageUrl,
    };
    try {
      await axios.patch(`http://localhost:4000/food/${food._id}`, dishData);
      form.reset();
      setImagePreview(null);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          className="rounded-full absolute bottom-2 right-2"
          variant={"outline"}
        >
          <Pen color="red" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Dish</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="foodName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dish Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter dish name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.categoryName}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredients</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter ingredients"
                      {...field}
                      className="h-20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <p className="text-sm text-gray-500">
                          Click to upload an image
                        </p>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {imagePreview && (
              <div className="relative h-40 w-full rounded-md overflow-hidden">
                <Image
                  alt="Uploaded"
                  width={1000}
                  height={1000}
                  className="h-[210px] w-full object-cover rounded-2xl"
                  src={imagePreview}
                />
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DishInfo;
