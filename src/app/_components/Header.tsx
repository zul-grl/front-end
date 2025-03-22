"use client";
import { ChevronRight, MapPin, User } from "lucide-react";
import { OrderSheet } from "./OrderDetail";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/app/_context/UserContext";
import Image from "next/image";

export default function HeaderHome() {
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState(false);
  const { user, updateAddress, fetchUserData, setUser } = useUser();

  const handleAddressSubmit = async () => {
    await updateAddress(address);
    setOpen(false);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchUserData(userId);
    }
  }, []);

  return (
    <div className="w-full bg-[#18181B] flex flex-col sm:flex-row justify-between items-center px-4 sm:px-[88px] py-3 gap-4">
      {/* Logo Section */}
      <Link href={"/"} className="flex items-center gap-3">
        <Image
          className="w-[46px]"
          width={100}
          height={100}
          src="/logo.png"
          alt=""
        />
        <div>
          <div className="flex">
            <p className="text-[20px] font-semibold text-white">Nom</p>
            <p className="text-[20px] font-semibold text-[#EF4444]">Nom</p>
          </div>
          <p className="text-[12px] text-[#f4f4f5] font-normal font-[Inter]">
            Swift delivery
          </p>
        </div>
      </Link>

      {/* Address, Order, and User Section */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Address Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <div className="flex items-center justify-center rounded-full bg-white w-full h-[39px] px-3 py-2 gap-1">
              <MapPin className="text-red-600" />
              <p className="text-red-600 hidden sm:block">Food delivery</p>
              <span className="font-extrabold text-red-600 hidden sm:block">
                :
              </span>
              <div className="flex justify-between text-[#71717a] gap-3">
                {user?.address ? (
                  <p className="truncate max-w-[100px] sm:max-w-[200px]">
                    {user.address}
                  </p>
                ) : (
                  <p>Add location</p>
                )}
                <ChevronRight />
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delivery address</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <Textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Please provide specific address details such as building number, entrance, and apartment number"
            />
            <DialogFooter className="justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button onClick={handleAddressSubmit} type="submit">
                Deliver here
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Order Sheet */}
        <OrderSheet />

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="p-2 bg-red-500 rounded-full">
              <User color="white" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            {user ? (
              <div className="flex flex-col gap-2 p-4">
                <p className="truncate">{user?.email}</p>
                <Button
                  onClick={() => {
                    localStorage.removeItem("userId");
                    setUser(null);
                    window.location.href = "/auth/login";
                  }}
                >
                  Sign out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 p-4">
                <Link href="/auth/signup">
                  <Button className="w-full">Sign up</Button>
                </Link>
                <Link href="/auth/login">
                  <Button className="w-full bg-[#EF4444]">Log in</Button>
                </Link>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
