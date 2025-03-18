"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function OrderSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex items-center justify-center p-2 bg-white rounded-full cursor-pointer">
          <ShoppingCart />
        </div>
      </SheetTrigger>
      <SheetContent className="w-full max-w-lg bg-[#404040] border-none rounded-l-3xl flex flex-col gap-5">
        <VisuallyHidden>
          <SheetHeader></SheetHeader>
        </VisuallyHidden>
        <div className="flex gap-2 text-[#fafafa] text-[20px] mt-5 font-semibold">
          <ShoppingCart />
          <p>Order details</p>
        </div>

        <Tabs defaultValue="cart" className="w-full mt-5">
          <TabsList className="grid w-full h-[44px] grid-cols-2 rounded-full">
            <TabsTrigger
              value="cart"
              className="rounded-full h-full text-[18px] font-normal text-black"
            >
              Cart
            </TabsTrigger>
            <TabsTrigger
              value="order"
              className="rounded-full text-[18px] h-full text-black"
            >
              Order
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cart" className="mt-7">
            <div className="bg-white rounded-xl h-[540px] p-4 flex flex-col gap-4">
              <h1 className="text-[20px] font-semibold">My cart</h1>
              <div className="h-full overflow-scroll"></div>
            </div>
            <div className="w-full bg-white rounded-xl flex flex-col justify-between h-[276px] mt-8 p-4">
              <h1 className="font-semibold text-[20px]">Payment info</h1>
              <div className="flex justify-between">
                <p className="text-[16px]">Items</p>
                <p className="font-bold text-[16px]">$25.98</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p className="font-bold">$0.99</p>
              </div>
              <div>
                - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                - - - - - - - - -
              </div>
              <div className="flex justify-between">
                <p>Total</p>
                <p className="font-bold">$26.97</p>
              </div>
              <button className="w-full bg-[#ef4444] rounded-full py-2">
                Checkout
              </button>
            </div>
          </TabsContent>
          <TabsContent value="order" className="mt-7">
            <div className="bg-white rounded-xl h-[540px] p-4">
              <h1 className="text-[20px] font-semibold">My Orders</h1>
              <p className="text-sm text-gray-500">No orders placed yet.</p>
            </div>
          </TabsContent>
        </Tabs>
        <VisuallyHidden>
          <SheetFooter></SheetFooter>
        </VisuallyHidden>
      </SheetContent>
    </Sheet>
  );
}
