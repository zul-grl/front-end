"use client";

import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageIcon, Plus, X } from "lucide-react";
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
  foodName: z.string().min(1),
  price: z.string().min(1),
  ingredients: z.string().min(1),
  image: z.instanceof(File).optional(),
});

interface AddDishDialogProps {
  category: string;
  categoryId: string;
  fetchData: () => void;
}

const AddDishDialog = ({
  category,
  categoryId,
  fetchData,
}: AddDishDialogProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodName: "",
      price: "",
      ingredients: "",
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
    imageData.append("upload_preset", "food-delivary-app");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dzb3xzqxv/image/upload`,
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
    try {
      const imageUrl = values.image ? await uploadImage(values.image) : null;

      const formData = {
        foodName: values.foodName,
        category: categoryId,
        price: values.price,
        ingredients: values.ingredients,
        image: imageUrl,
      };

      await axios.post(
        "https://food-delivery-back-end-r6wt.onrender.com/food",
        formData
      );
      fetchData();
      form.reset();
      setImagePreview(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
      document.getElementById("close-dialog")?.click();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-[260px] h-[240px] justify-center items-center p-6 border-2 border-dashed border-red-600 rounded-2xl flex flex-col gap-6">
          <Button
            className="rounded-full hover:bg-red-600 bg-red-600"
            variant="default"
            size="icon"
          >
            <Plus />
          </Button>
          <p>
            Add new Dish to <br />
            {category}
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add new Dish to {category}</DialogTitle>
        </DialogHeader>
        <div></div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="foodName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food name</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Type food name"
                        {...field}
                      />
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
                    <FormLabel>Food price</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        type="text"
                        placeholder="Enter price..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredients</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List ingredients..."
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
              render={() => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    {imagePreview ? (
                      <div className="relative h-40 w-full rounded-md overflow-hidden">
                        <Image
                          alt="Uploaded"
                          width={1000}
                          height={1000}
                          className="h-[160px] w-full object-cover rounded-2xl"
                          src={imagePreview}
                        />
                        <Button
                          className="absolute top-1 right-1 rounded-full"
                          size={"icon"}
                          variant={"outline"}
                          onClick={() => setImagePreview("")}
                        >
                          <X />
                        </Button>
                      </div>
                    ) : (
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center justify-center gap-2 border-2 mt-2 border-dashed h-[160px] border-[#2563EB33] bg-[#2564eb25] rounded-2xl p-4 text-center">
                          <div className="flex justify-center rounded-full bg-white p-2 w-10 h-10">
                            <ImageIcon />
                          </div>
                          <input
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                            id="image-upload"
                          />
                          <p className="text-sm text-gray-500">
                            Choose a file or drag & drop it here
                          </p>
                        </div>
                      </label>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button id="close-dialog" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add dish"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDishDialog;
