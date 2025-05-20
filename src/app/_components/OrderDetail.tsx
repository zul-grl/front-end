"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Clock, MapPin, Soup, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useOrder } from "../_context/OrderContext";
import { useCart } from "../_context/CartContext";

export function OrderSheet() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const { fetchOrderData, orders } = useOrder();
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchOrderData();
    }
  }, []);

  const handleQuantityChange = (index: number, delta: number) => {
    const newQuantity = cartItems[index].quantity + delta;
    if (newQuantity >= 1) {
      updateQuantity(index, newQuantity);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) =>
        total + parseFloat(item.food.price || "0") * item.quantity,
      0
    );
  };

  const handleCheckout = async () => {
    const userId = localStorage.getItem("userId");
    if (cartItems.length === 0) return alert("Your cart is empty");
    if (!userId) return alert("User not logged in");

    setIsLoading(true);
    try {
      const orderData = {
        user: userId,
        totalPrice: calculateTotalPrice(),
        foodOrderItems: cartItems.map((item) => ({
          food: item.food._id,
          quantity: item.quantity,
        })),
      };

      const response = await axios.post(
        "https://food-delivery-back-end-r6wt.onrender.com/food-order",
        orderData
      );
      if (response.status === 201) {
        setIsAlertDialogOpen(true);
        clearCart();
        fetchOrderData();
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  };

  const getOrderNumber = (orderId: string) => `#${orderId.slice(-5)}`;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex items-center justify-center p-2 bg-white rounded-full cursor-pointer">
          <ShoppingCart />
        </div>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg bg-[#404040] border-none rounded-l-3xl flex flex-col">
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>Order Details</SheetTitle>
          </SheetHeader>
        </VisuallyHidden>
        <div className="flex gap-2 text-[#fafafa] text-[20px] font-bold">
          <ShoppingCart />
          <p>Order details</p>
        </div>

        <Tabs defaultValue="cart" className="w-full mt-5">
          <TabsList className="grid w-full h-[44px] grid-cols-2 rounded-full">
            <TabsTrigger
              value="cart"
              className="rounded-full h-full text-[18px] font-normal text-black data-[state=active]:bg-red-500 data-[state=active]:text-white"
            >
              Cart
            </TabsTrigger>
            <TabsTrigger
              value="order"
              className="rounded-full h-full text-[18px] font-normal text-black data-[state=active]:bg-red-500 data-[state=active]:text-white"
            >
              Order
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cart" className="mt-7 flex flex-col gap-4">
            <div className="rounded-xl h-[50vh] flex flex-col">
              <div className="flex-1 bg-white  overflow-y-auto rounded-2xl p-4">
                <h1 className="text-[20px] font-semibold mb-2">My cart</h1>
                {cartItems.length === 0 ? (
                  <>
                    <div className="rounded-xl bg-[#F4F4F5] flex flex-col gap-2 items-center mb-3 p-8 h-[280px] justify-center">
                      <Image
                        src="/logo.png"
                        width={100}
                        height={100}
                        className="w-[61px]"
                        alt=""
                      />
                      <h3 className="text-base font-bold">
                        Your cart is empthy
                      </h3>
                      <p className="text-[#71717A]">
                        Hungry? 🍔 Add some delicious dishes to your cart and
                        satisfy your cravings!
                      </p>
                    </div>
                  </>
                ) : (
                  cartItems.map((item, index) => (
                    <div
                      key={`cart-item-${index}`}
                      className="flex gap-3 mb-4 border-b-2 border-dashed  pb-4"
                    >
                      <Image
                        alt={`${item.food.foodName} detailed image`}
                        width={100}
                        height={100}
                        className="h-[100px] w-[100px] object-cover rounded-xl"
                        src={item.food.image}
                      />
                      <div className="flex flex-col justify-between flex-1">
                        <div className="flex gap-2">
                          <div className="w-[90%]">
                            <h3 className="text-red-500 font-semibold text-l">
                              {item.food.foodName}
                            </h3>
                            <p className="text-sm text-wrap">
                              {item.food.ingredients}
                            </p>
                          </div>
                          <Button
                            variant={"outline"}
                            size={"icon"}
                            onClick={() => removeFromCart(index)}
                            className="rounded-full border-red-500 border"
                          >
                            <X color="red" />
                          </Button>
                        </div>
                        <div className="mt-4 flex gap-4 justify-between">
                          <div className="flex items-center gap-4">
                            <Button
                              onClick={() => handleQuantityChange(index, -1)}
                              variant="outline"
                              className="h-8 border-none w-8 p-0 rounded-full"
                            >
                              -
                            </Button>
                            <span>{item.quantity}</span>
                            <Button
                              variant="outline"
                              onClick={() => handleQuantityChange(index, 1)}
                              className="h-8 rounded-full w-8 p-0 border-none"
                            >
                              +
                            </Button>{" "}
                            <div>
                              <h3 className="text-black font-semibold text-xl">
                                $
                                {(
                                  parseFloat(item.food.price || "0") *
                                  item.quantity
                                ).toFixed(2)}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {cartItems && (
              <div className="border-t p-4 h-[25vh] rounded-2xl bg-white">
                <div className="flex justify-between mb-2">
                  <p className="text-gray-500">Items :</p>
                  <p className="font-semibold">
                    ${calculateTotalPrice().toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-gray-500">Shipping:</p>
                  <p className="font-semibold">$5.00</p>
                </div>
                <div className="flex justify-between mb-4">
                  <p className="font-bold">Total:</p>
                  <p className="font-bold">
                    ${(calculateTotalPrice() + 5).toFixed(2)}
                  </p>
                </div>

                <AlertDialog
                  open={isAlertDialogOpen}
                  onOpenChange={() => {
                    setIsAlertDialogOpen(false);
                  }}
                >
                  <AlertDialogTrigger asChild>
                    <Button
                      className="w-full rounded-full"
                      onClick={handleCheckout}
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Checkout"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white backdrop-opacity-20 gap-0 rounded-2xl p-4">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-2xl font-bold text-center">
                        Your order has been successfully placed !
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="flex justify-center">
                      <Image
                        src="/cart.png"
                        alt="Cart icon"
                        width={100}
                        height={100}
                        className="w-[156px] h-[265px] object-cover"
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
              </div>
            )}
          </TabsContent>
          <TabsContent value="order">
            <div className="bg-white rounded-xl p-4 ">
              <h1 className="text-[20px] font-semibold mb-4">Order history</h1>
              <div className="overflow-y-auto  h-[70vh]">
                {orders.length === 0 ? (
                  <>
                    <div className="rounded-xl bg-[#F4F4F5] flex flex-col gap-2 items-center p-8 h-[280px] justify-center">
                      <Image
                        src="/logo.png"
                        width={100}
                        height={100}
                        className="w-[61px]"
                        alt=""
                      />
                      <h3 className="text-base font-bold">No Orders Yet?</h3>
                      <p className="text-[#71717A]">
                        🍕
                        {
                          "You haven't placed any orders yet. Start exploring our menu and satisfy your cravings!"
                        }
                      </p>
                    </div>
                  </>
                ) : (
                  orders.map((order) => (
                    <div key={order._id} className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="text-xl font-bold">
                            ${order.totalPrice.toFixed(2)}{" "}
                            {getOrderNumber(order._id)}
                          </h3>
                        </div>
                        <div
                          className={`px-4 py-1 rounded-full text-sm ${
                            order.status === "pending"
                              ? "border border-red-500"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {order.status}
                        </div>
                      </div>

                      {order.foodOrderItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between mb-1"
                        >
                          <span className="text-gray-400 flex gap-2 ml-2">
                            <Soup size={16} />
                            {item.food.foodName}
                          </span>
                          <span className=" w-6">x {item.quantity}</span>
                        </div>
                      ))}

                      <div className="mt-3 flex items-center text-sm text-gray-500">
                        <Clock size={16} className="mr-1" />
                        <span>{formatDate(order.createdAt)}</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin size={16} className="mr-1" />
                        <span>{order.user.address}</span>
                      </div>

                      <div className="border-b border-dashed my-4"></div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <VisuallyHidden>
          <SheetFooter />
        </VisuallyHidden>
      </SheetContent>
    </Sheet>
  );
}
