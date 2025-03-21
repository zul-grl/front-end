import { Button } from "@/components/ui/button";
import { LayoutDashboard, Settings, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SideBar = () => {
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
        <Button className="rounded-full">
          <LayoutDashboard /> Food menu
        </Button>
      </Link>
      <Link href={"/orders"}>
        <Button className="rounded-full">
          <Truck /> Orders
        </Button>
      </Link>
      <Link href={"/settings"}>
        <Button className="rounded-full">
          <Settings /> Settings
        </Button>
      </Link>
    </div>
  );
};
export default SideBar;
