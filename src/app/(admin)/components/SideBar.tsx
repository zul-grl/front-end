"use client";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Settings, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 w-[205px] h-screen flex flex-col gap-10 p-7 items-center bg-white">
      <Link href={"/"}>
        <div className="flex gap-2">
          <Image
            className="w-[36px] h-[29px] object-cover"
            src="/logo.png"
            alt=""
            width={100}
            height={100}
          />
          <div>
            <div className="flex">
              <h4 className="font-semibold text-black">NomNom</h4>
            </div>
            <p className="text-[#71717A] text-[12px]">Swift delivery</p>
          </div>
        </div>
      </Link>
      <Link href={"/food-menu"}>
        <Button
          variant={"outline"}
          className={`rounded-full w-[155px]  ${
            pathname === "/food-menu"
              ? "bg-black text-white hover:bg-black hover:text-white"
              : "bg-white text-black"
          }`}
        >
          <LayoutDashboard /> Food menu
        </Button>
      </Link>
      <Link href={"/orders"}>
        <Button
          variant={"outline"}
          className={`rounded-full w-[155px] ${
            pathname === "/orders"
              ? "bg-black text-white hover:bg-black hover:text-white"
              : "bg-white text-black"
          }`}
        >
          <Truck /> Orders
        </Button>
      </Link>
      <Link href={"/settings"}>
        <Button
          variant={"outline"}
          className={`rounded-full w-[155px]  ${
            pathname === "/settings"
              ? "bg-black text-white hover:bg-black hover:text-white"
              : "bg-white text-black"
          }`}
        >
          <Settings /> Settings
        </Button>
      </Link>
    </div>
  );
};

export default SideBar;
