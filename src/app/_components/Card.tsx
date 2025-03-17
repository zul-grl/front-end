"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

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
  const [isLoading, setIsLoading] = useState(false);
  const priceAsNumber = parseFloat(price);
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const orderData = {
        user: "USER_ID",
        totalPrice: priceAsNumber * quantity,
        foodOrderItems: [
          {
            food: id,
            quantity,
            price,
          },
        ],
      };

      const response = await axios.post(
        "http://localhost:4000/food-order",
        orderData
      );

      if (response.status === 201) {
        alert("Order added to cart successfully!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add order to cart.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          key={id}
          className="p-4 rounded-3xl flex flex-col gap-2 bg-[#FFFFFF] w-full sm:w-[397px] h-[342px] cursor-pointer"
        >
          <Image
            alt={name}
            width={1000}
            height={1000}
            className="h-[210px] w-full object-cover rounded-2xl"
            src={image}
          />
          <div>
            <div className="flex justify-between">
              <h3 className="text-red-500 font-semibold text-2xl">{name}</h3>
              <h3 className="text-black font-semibold text-xl">${price}</h3>
            </div>
            <p>{ingredients}</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="rounded-3xl w-full sm:w-[550px] h-[320px]">
        <div>
          <DialogHeader hidden>
            <DialogTitle hidden></DialogTitle>
            <DialogDescription hidden></DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 h-[270px]">
            <Image
              alt={`${name} detailed image`}
              width={1000}
              height={1000}
              className="h-[100%] w-full object-cover rounded-xl"
              src={image}
            />
            <div className="relative w-full">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-red-500 font-semibold text-xl">{name}</h3>
                  <p className="text-sm">{ingredients}</p>
                </div>
                <div className="mt-4 flex gap-4 justify-between">
                  <div className="mb-4">
                    <p className="text-xs">Total price</p>
                    <h3 className="text-black font-semibold text-xl">
                      ${(priceAsNumber * quantity).toFixed(2)}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <Button
                      onClick={decrementQuantity}
                      variant="outline"
                      className="h-8 rounded-full w-8 p-0"
                    >
                      -
                    </Button>
                    <span>{quantity}</span>
                    <Button
                      variant="outline"
                      onClick={incrementQuantity}
                      className="h-8 rounded-full w-8 p-0"
                    >
                      +
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={isLoading}
                  >
                    {isLoading ? "Adding..." : "Add to cart"}
                  </Button>
                </DialogFooter>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Card;
