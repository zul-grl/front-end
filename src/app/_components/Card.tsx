"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import { useState } from "react";
import { Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useCart } from "@/app/_context/CartContext";
import { useUser } from "@/app/_context/UserContext";

export type CardProps = {
  image: string;
  name: string;
  ingredients: string;
  price: string;
  category: string;
  id: string;
};

const Card = ({ id, image, name, ingredients, price }: CardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const { addToCart } = useCart();
  const { user } = useUser();
  const handleAddToCart = async () => {
    if (!user?.address?.trim()) {
      setIsDialogOpen(false);
      setTimeout(() => setIsAlertDialogOpen(true), 300);
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("User not logged in");
        return;
      }

      const newItem = {
        food: { _id: id, foodName: name, ingredients, price, image },
        quantity,
      };

      addToCart(newItem);
      alert("Food is being added to the cart!");
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart.");
    }
  };

  return (
    <>
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
        }}
      >
        <div className="p-4 rounded-3xl flex flex-col gap-2 bg-[#FFFFFF] w-full h-auto cursor-pointer">
          <div className="relative">
            <Image
              alt={name}
              width={1000}
              height={1000}
              className="h-[150px] sm:h-[180px] md:h-[210px] w-full object-cover rounded-2xl"
              src={image}
            />
            <DialogTrigger
              onClick={() => setIsDialogOpen(true)}
              className="rounded-full absolute bottom-2 right-2 bg-white p-2"
            >
              <Plus size={20} />
            </DialogTrigger>
          </div>

          <div>
            <div className="flex justify-between">
              <h3 className="text-red-500 font-semibold text-lg sm:text-xl md:text-2xl">
                {name}
              </h3>
              <h3 className="text-black font-semibold text-lg sm:text-xl">
                ${price}
              </h3>
            </div>
            <p className="text-sm sm:text-base">{ingredients}</p>
          </div>
        </div>

        <DialogContent className="rounded-3xl w-[95%] sm:w-[550px] h-auto min-h-[320px]">
          <VisuallyHidden>
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
            </DialogHeader>
          </VisuallyHidden>
          <div className="flex flex-col sm:flex-row gap-3 h-auto sm:h-[270px]">
            <Image
              alt={`${name} detailed image`}
              width={1000}
              height={1000}
              className="h-[200px] sm:h-full w-full sm:w-[255px] object-cover rounded-xl"
              src={image}
            />
            <div className="relative w-full">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-red-500 font-semibold text-xl">{name}</h3>
                  <p className="text-sm">{ingredients}</p>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-between">
                  <div className="mb-4">
                    <p className="text-xs">Total price</p>
                    <h3 className="text-black font-semibold text-xl">
                      ${(parseFloat(price) * quantity).toFixed(2)}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <Button
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                      variant="outline"
                      className="h-8 rounded-full w-8 p-0"
                    >
                      -
                    </Button>
                    <span>{quantity}</span>
                    <Button
                      variant="outline"
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="h-8 rounded-full w-8 p-0"
                    >
                      +
                    </Button>
                  </div>
                </div>
                <DialogFooter className="flex justify-end mt-2 sm:mt-0">
                  <Button type="button" onClick={handleAddToCart}>
                    Add to cart
                  </Button>
                </DialogFooter>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogContent className="bg-white backdrop-opacity-20 gap-6 rounded-2xl p-4 sm:p-6 w-[95%] max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl sm:text-2xl font-bold text-center">
              Please select your delivery address!
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="logo icon"
              width={100}
              height={100}
              className="object-cover"
            />
          </div>
          <AlertDialogFooter className="flex m-auto justify-center">
            <AlertDialogCancel
              onClick={() => setIsAlertDialogOpen(false)}
              className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600"
            >
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Card;
